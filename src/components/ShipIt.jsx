import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

const STEPS = [
  { name: 'install', ms: 600 },
  { name: 'lint',    ms: 500 },
  { name: 'test',    ms: 1200, note: '42 passed' },
  { name: 'build',   ms: 800 },
  { name: 'deploy',  ms: 900, note: 'damola.me' },
]
const TOTAL_MS = STEPS.reduce((total, step) => total + step.ms, 0)
const CONFETTI_COLORS = ['#E8FF5A', '#F0EDE8', '#D4E840']

export default function ShipIt() {
  const [phase, setPhase] = useState('idle')
  const [finished, setFinished] = useState(0)
  const [burst, setBurst] = useState(null)
  const timers = useRef([])
  const button = useRef(null)

  useEffect(() => {
    const pending = timers.current
    return () => pending.forEach(clearTimeout)
  }, [])

  const later = (fn, ms) => timers.current.push(setTimeout(fn, ms))

  const ship = () => {
    timers.current.forEach(clearTimeout)
    timers.current.length = 0
    setPhase('running')
    setFinished(0)
    setBurst(null)

    let at = 0
    STEPS.forEach((step, i) => {
      at += step.ms
      later(() => setFinished(i + 1), at)
    })
    later(() => {
      setPhase('done')
      const rect = button.current?.getBoundingClientRect()
      setBurst({
        x: rect ? rect.left + rect.width / 2 : window.innerWidth / 2,
        y: rect ? rect.top : window.innerHeight - 80,
        pieces: Array.from({ length: 40 }, (_, k) => ({
          id: k,
          dx: (Math.random() - 0.5) * 520,
          dy: -140 - Math.random() * 300,
          rotate: (Math.random() - 0.5) * 720,
          size: 6 + Math.random() * 6,
          color: CONFETTI_COLORS[k % CONFETTI_COLORS.length],
        })),
      })
      later(() => setBurst(null), 1800)
    }, at + 150)
  }

  const label = phase === 'running' ? 'SHIPPING…' : phase === 'done' ? 'SHIP AGAIN' : 'SHIP IT'

  return (
    <div style={styles.wrap}>
      <div style={styles.row}>
        <span className="type-label" style={styles.prompt}>Made it to the bottom? Ship it.</span>
        <button
          ref={button}
          id="ship-it"
          type="button"
          className="btn-primary"
          style={{ ...styles.button, opacity: phase === 'running' ? 0.6 : 1 }}
          onClick={ship}
          disabled={phase === 'running'}
        >
          {label}
        </button>
      </div>

      {phase !== 'idle' && (
        <ol style={styles.terminal} aria-live="polite">
          <li className="type-label" style={styles.command}>$ git push origin main</li>
          {STEPS.map((step, i) => {
            if (i > finished) return null
            const done = i < finished
            return (
              <li key={step.name} style={styles.line}>
                <span className="type-label" style={styles.step}>{step.name}</span>
                {done ? (
                  <span className="type-label" style={styles.ok}>
                    ✓ {[step.note, `${(step.ms / 1000).toFixed(1)}s`].filter(Boolean).join(' · ')}
                  </span>
                ) : (
                  <span className="type-label pulse" style={styles.running}>running…</span>
                )}
              </li>
            )
          })}
          {phase === 'done' && (
            <li className="type-label" style={styles.shipped}>
              Shipped to production in {(TOTAL_MS / 1000).toFixed(1)}s
            </li>
          )}
        </ol>
      )}

      {burst && (
        <div style={styles.burstLayer} aria-hidden="true">
          {burst.pieces.map(piece => (
            <motion.span
              key={piece.id}
              style={{
                ...styles.piece,
                left: burst.x,
                top: burst.y,
                width: piece.size,
                height: piece.size,
                backgroundColor: piece.color,
              }}
              initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
              animate={{ x: piece.dx, y: [0, piece.dy, piece.dy + 280], opacity: [1, 1, 0], rotate: piece.rotate }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

const styles = {
  wrap: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    paddingBottom: '24px',
  },
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '16px',
  },
  prompt:   { color: '#A0A0A0' },
  button:   { cursor: 'pointer', border: 'none', fontSize: '0.75rem', padding: '10px 18px' },
  terminal: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    padding: '20px 24px',
    backgroundColor: '#111111',
    border: '1px solid #1F1F1F',
  },
  command:  { color: '#F0EDE8', textTransform: 'none' },
  line:     { display: 'flex', gap: '24px' },
  step:     { color: '#A0A0A0', textTransform: 'none', minWidth: '72px' },
  ok:       { color: '#E8FF5A', textTransform: 'none' },
  running:  { color: '#808080', textTransform: 'none' },
  shipped:  { color: '#F0EDE8', textTransform: 'none', marginTop: '6px' },
  burstLayer: {
    position: 'fixed',
    inset: 0,
    pointerEvents: 'none',
    overflow: 'hidden',
    zIndex: 60,
  },
  piece: {
    position: 'absolute',
    borderRadius: '1px',
  },
}
