import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { fadeUp } from '../lib/transitions'

const lagosTime = new Intl.DateTimeFormat('en-GB', { timeZone: 'Africa/Lagos', hour: '2-digit', minute: '2-digit', hourCycle: 'h23' })
const lagosHour = new Intl.DateTimeFormat('en-GB', { timeZone: 'Africa/Lagos', hour: 'numeric', hourCycle: 'h23' })

const moods = [
  [6,  'ASLEEP. OR SHIPPING'],
  [9,  'COFFEE, THEN CODE'],
  [12, 'DEEP IN A CODEBASE'],
  [14, 'LUNCH, THEN REVIEWS'],
  [18, 'PROBABLY DEBUGGING'],
  [21, 'READING OR WRITING'],
  [24, 'LATE-NIGHT DEPLOYS'],
]

function LagosClock() {
  const [now, setNow] = useState(null)

  useEffect(() => {
    const tick = () => setNow(new Date())
    const first = setTimeout(tick, 0)
    const timer = setInterval(tick, 30000)
    return () => { clearTimeout(first); clearInterval(timer) }
  }, [])

  const hour = now ? Number(lagosHour.format(now)) : 0
  const mood = moods.find(([until]) => hour < until)[1]

  return (
    <>
      <span className="type-label" style={{ color: 'var(--color-text-primary)' }}>{now ? lagosTime.format(now) : '--:--'}</span>
      <span className="type-label" style={{ color: 'var(--color-text-muted)' }}>·</span>
      <span className="type-label" style={{ color: 'var(--color-text-primary)' }}>{now ? mood : ''}</span>
    </>
  )
}

export default function Hero() {
  return (
    <section id="home" style={styles.section}>
      <motion.div 
        className="container" 
        style={styles.inner}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } }
        }}
        initial="hidden"
        animate="visible"
      >

        {/* Index label */}
        <div style={styles.indexRow}>
          <span className="type-label" style={styles.index}>01 / INTRO</span>
          <span style={styles.line} />
        </div>

        {/* Display name */}
        <div style={styles.nameBlock}>
          <h1 className="type-display" style={styles.name}>
            Damola<br />Adegbite
          </h1>
        </div>

        {/* Role + bio */}
        <div className="hero-meta" style={styles.meta}>
          <motion.div style={styles.roleBlock} variants={fadeUp}>
            <span className="type-label" style={styles.label}>ROLE</span>
            <p className="type-h3" style={styles.role}>
              Backend/DevOps Engineer
            </p>
            <p className="type-body-md" style={styles.roleSub}>
              + AI agent evaluation
            </p>
          </motion.div>

          <motion.div style={styles.bioBlock} variants={fadeUp}>
            <span className="type-label" style={styles.label}>ABOUT</span>
            <p className="type-body-lg" style={styles.bio}>
              4 years building backend systems that run in production. APIs, real-time infrastructure. Now I also build hard coding tasks that test AI coding agents on large open-source codebases. Open to remote roles.
            </p>
            <p className="type-body-md" style={{ color: 'var(--color-text-primary)', fontWeight: 500, marginTop: '8px', marginBottom: '8px' }}>
              Built a CRDT from scratch. Took a system from 48 to 716 req/sec. Three packages on npm.
            </p>
            <div style={styles.ctas}>
              <a
                href="#work"
                id="hero-cta-primary"
                className="btn-primary"
                onClick={e => {
                  e.preventDefault()
                  document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                VIEW WORK
              </a>
              <a
                href="https://github.com/dax-side"
                id="hero-cta-github"
                className="btn-ghost"
                target="_blank"
                rel="noopener noreferrer"
              >
                GITHUB
              </a>
            </div>
          </motion.div>
        </div>

        {/* Status bar */}
        <motion.div className="hero-stats" style={styles.statusBar} variants={fadeUp}>
          <div style={styles.statusItem}>
            <span className="type-label" style={styles.statusLabel}>STATUS</span>
            <span style={styles.statusDot} />
            <span className="type-label" style={{ color: 'var(--color-accent-text)' }}>AVAILABLE</span>
          </div>
          <div style={styles.statusItem}>
            <span className="type-label" style={styles.statusLabel}>FOCUS</span>
            <span className="type-label" style={{ color: 'var(--color-text-primary)' }}>BACKEND · DEVOPS · AI EVALS</span>
          </div>
          <div style={styles.statusItem}>
            <span className="type-label" style={styles.statusLabel}>LAGOS</span>
            <LagosClock />
          </div>
          <div style={styles.statusItem}>
            <span className="type-label" style={styles.statusLabel}>STACK</span>
            <span className="type-label" style={{ color: 'var(--color-text-primary)' }}>REACT · TS · NODE.JS</span>
          </div>
        </motion.div>

      </motion.div>
    </section>
  )
}

const styles = {
  section: {
    paddingTop: 'calc(64px + clamp(32px, 6vw, 72px))', // clears the fixed nav
    paddingBottom: 'clamp(40px, 5vw, 64px)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  inner: {
    display: 'flex',
    flexDirection: 'column',
    gap: '40px',
  },
  indexRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  index: {
    color: 'var(--color-text-muted)',
    flexShrink: 0,
  },
  line: {
    height: '1px',
    flex: 1,
    backgroundColor: 'var(--color-border)',
  },
  nameBlock: {
    maxWidth: '900px',
  },
  name: {
    color: 'var(--color-text-primary)',
  },
  meta: {
    display: 'grid',
    gap: 'clamp(24px, 5vw, 64px)', // MOBILE FIX
    alignItems: 'start',
    maxWidth: '900px',
  },
  roleBlock: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  bioBlock: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  label: {
    color: 'var(--color-text-muted)',
  },
  role: {
    color: 'var(--color-text-primary)',
    lineHeight: 1.3,
  },
  roleSub: {
    color: 'var(--color-accent-text)',
    marginTop: '-4px',
  },
  bio: {
    color: 'var(--color-text-secondary)',
    maxWidth: '480px',
  },
  ctas: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
  },
  statusBar: {
    paddingTop: '24px',
    borderTop: '1px solid var(--color-border)',
  },
  statusItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  statusLabel: {
    color: 'var(--color-text-muted)',
  },
  statusDot: {
    width: '5px',
    height: '5px',
    borderRadius: '50%',
    backgroundColor: 'var(--color-accent)',
    boxShadow: '0 0 0 1px var(--color-accent-edge)',
    flexShrink: 0,
  },
}
