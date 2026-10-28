import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { fadeUp } from '../lib/transitions'

const CAPACITY = 5
const REFILL_PER_SEC = 1
const LOG_LINES = 7

const levelAt = (bucket, now) =>
  Math.min(CAPACITY, bucket.tokens + ((now - bucket.at) / 1000) * REFILL_PER_SEC)

const clock = () =>
  new Date().toLocaleTimeString('en-GB', { hour12: false })

export default function Playground() {
  const bucket = useRef(null)
  const nextId = useRef(0)
  const [tokens, setTokens] = useState(CAPACITY)
  const [log, setLog] = useState([])
  const [stats, setStats] = useState({ sent: 0, allowed: 0, blocked: 0 })

  useEffect(() => {
    const timer = setInterval(() => {
      if (bucket.current) setTokens(levelAt(bucket.current, performance.now()))
    }, 100)
    return () => clearInterval(timer)
  }, [])

  const send = () => {
    const now = performance.now()
    const current = bucket.current ? levelAt(bucket.current, now) : CAPACITY
    const allowed = current >= 1
    bucket.current = { tokens: allowed ? current - 1 : current, at: now }
    setTokens(bucket.current.tokens)

    const entry = allowed
      ? { id: nextId.current++, allowed, time: clock(), status: '200 OK', detail: 'GET /api/hello' }
      : {
          id: nextId.current++,
          allowed,
          time: clock(),
          status: '429 TOO MANY REQUESTS',
          detail: `retry in ${((1 - current) / REFILL_PER_SEC).toFixed(1)}s`,
        }
    setLog(lines => [entry, ...lines].slice(0, LOG_LINES))
    setStats(s => ({
      sent: s.sent + 1,
      allowed: s.allowed + (allowed ? 1 : 0),
      blocked: s.blocked + (allowed ? 0 : 1),
    }))
  }

  const throttled = log.length > 0 && !log[0].allowed

  return (
    <section id="playground" className="section">
      <div className="container">

        <motion.div
          style={styles.header}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <h2 className="type-h2" style={styles.heading}>Try to DDoS me.</h2>
          <p className="type-body-md" style={styles.subtext}>
            This button sits behind a token bucket rate limiter, the kind I put in front of APIs.
            Five requests in the bucket, refilling at one per second. Go on, spam it.
          </p>
        </motion.div>

        <motion.div
          className="playground-grid"
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <div className="card" style={styles.panel}>
            <span className="type-label" style={styles.label}>BUCKET</span>
            <div style={styles.bucket} aria-hidden="true">
              {Array.from({ length: CAPACITY }, (_, i) => (
                <div key={i} style={styles.token}>
                  <div style={{ ...styles.tokenFill, height: `${Math.max(0, Math.min(1, tokens - i)) * 100}%` }} />
                </div>
              ))}
            </div>
            <span className="type-label" style={styles.level}>
              {tokens.toFixed(1)} / {CAPACITY} TOKENS · +{REFILL_PER_SEC}/S
            </span>

            <button id="playground-send" type="button" className="btn-primary" style={styles.send} onClick={send}>
              SEND REQUEST
            </button>

            <span className="type-label" style={{ ...styles.verdict, opacity: throttled ? 1 : 0 }} aria-hidden={!throttled}>
              429 · SLOW DOWN
            </span>

            <div style={styles.stats}>
              <span className="type-label" style={styles.stat}>SENT <b style={styles.statValue}>{stats.sent}</b></span>
              <span className="type-label" style={styles.stat}>ALLOWED <b style={styles.statValue}>{stats.allowed}</b></span>
              <span className="type-label" style={styles.stat}>BLOCKED <b style={{ ...styles.statValue, color: 'var(--color-destructive)' }}>{stats.blocked}</b></span>
            </div>
          </div>

          <div className="card" style={styles.panel}>
            <span className="type-label" style={styles.label}>RESPONSES</span>
            <ol style={styles.log} aria-live="polite">
              {log.length === 0 && (
                <li className="type-label" style={styles.empty}>Waiting for your first request…</li>
              )}
              {log.map(line => (
                <li key={line.id} style={styles.logLine}>
                  <span className="type-label" style={styles.logTime}>{line.time}</span>
                  <span className="type-label" style={{ color: line.allowed ? 'var(--color-accent-text)' : 'var(--color-destructive)' }}>{line.status}</span>
                  <span className="type-label" style={styles.logDetail}>{line.detail}</span>
                </li>
              ))}
            </ol>
          </div>
        </motion.div>

      </div>
    </section>
  )
}

const styles = {
  header: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    marginBottom: 'var(--space-xl)',
  },
  heading:      { color: 'var(--color-text-primary)' },
  subtext:      { color: 'var(--color-text-secondary)', lineHeight: 1.6, maxWidth: '620px' },

  panel: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    minHeight: '340px',
  },
  label: { color: 'var(--color-accent-text)' },
  bucket: {
    display: 'flex',
    gap: '10px',
  },
  token: {
    flex: 1,
    maxWidth: '56px',
    height: '56px',
    border: '1px solid var(--color-border)',
    backgroundColor: 'var(--color-primary)',
    display: 'flex',
    alignItems: 'flex-end',
  },
  tokenFill: {
    width: '100%',
    backgroundColor: 'var(--color-accent)',
    boxShadow: '0 0 0 1px var(--color-accent-edge)',
    transition: 'height 100ms linear',
  },
  level:     { color: 'var(--color-text-muted)' },
  send:      { alignSelf: 'flex-start', cursor: 'pointer' },
  verdict:   { color: 'var(--color-destructive)', transition: 'opacity 150ms ease-out' },
  stats: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '8px 24px',
    marginTop: 'auto',
    paddingTop: '16px',
    borderTop: '1px solid var(--color-border)',
  },
  stat:      { color: 'var(--color-text-muted)' },
  statValue: { color: 'var(--color-text-primary)', fontWeight: 400 },

  log: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
  },
  empty:     { color: 'var(--color-text-secondary)', textTransform: 'none', letterSpacing: '0.02em' },
  logLine: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px 16px',
    paddingBottom: '14px',
    borderBottom: '1px solid var(--color-border-subtle)',
  },
  logTime:   { color: 'var(--color-text-secondary)' },
  logDetail: { color: 'var(--color-text-muted)', textTransform: 'none', letterSpacing: '0.04em' },
}
