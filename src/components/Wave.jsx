import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { fetchWaves, sendWave } from '../lib/waves'

const plural = (n, one, many) => `${n.toLocaleString('en-GB')} ${n === 1 ? one : many}`

export default function Wave() {
  const [counts, setCounts] = useState(null)
  const [waved, setWaved] = useState(false)
  const [shakes, setShakes] = useState(0)

  useEffect(() => {
    let live = true
    fetchWaves()
      .then(c => { if (live && c) setCounts(c) })
      .catch(() => {})
    return () => { live = false }
  }, [])

  const wave = () => {
    setShakes(n => n + 1)
    if (waved) return
    setWaved(true)
    sendWave()
      .then(c => { if (c) setCounts(c) })
      .catch(() => {})
  }

  return (
    <div style={styles.row}>
      <button id="wave" type="button" className="btn-ghost" style={styles.button} onClick={wave}>
        <motion.span
          key={shakes}
          style={styles.hand}
          animate={shakes ? { rotate: [0, 20, -10, 20, -6, 0] } : { rotate: 0 }}
          transition={{ duration: 0.9 }}
          aria-hidden="true"
        >
          👋
        </motion.span>
        {waved ? 'THANKS FOR THE WAVE' : 'WAVE HELLO'}
      </button>
      {counts && (
        <span className="type-label" style={styles.count}>
          {plural(counts.total, 'WAVE', 'WAVES')} FROM {plural(counts.countries, 'COUNTRY', 'COUNTRIES')}
        </span>
      )}
    </div>
  )
}

const styles = {
  row: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '12px 20px',
    marginTop: '24px',
  },
  button: {
    cursor: 'pointer',
    background: 'none',
    color: 'var(--color-text-primary)',
    fontFamily: 'var(--font-mono)',
    padding: '10px 16px',
  },
  hand: { display: 'inline-block', transformOrigin: '70% 70%', fontSize: '1rem' },
  count: { color: 'var(--color-text-muted)' },
}
