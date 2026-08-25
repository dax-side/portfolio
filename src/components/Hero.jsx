import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '../lib/transitions'

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
          </motion.div>

          <motion.div style={styles.bioBlock} variants={fadeUp}>
            <span className="type-label" style={styles.label}>ABOUT</span>
            <p className="type-body-lg" style={styles.bio}>
              4 years building backend systems that run in production. APIs, real-time infrastructure. Open to remote roles.
            </p>
            <p className="type-body-md" style={{ color: '#F0EDE8', fontWeight: 500, marginTop: '8px', marginBottom: '8px' }}>
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
            <span className="type-label" style={{ color: '#E8FF5A' }}>AVAILABLE</span>
          </div>
          <div style={styles.statusItem}>
            <span className="type-label" style={styles.statusLabel}>FOCUS</span>
            <span className="type-label" style={{ color: '#F0EDE8' }}>BACKEND · NODE.JS · DEVOPS</span>
          </div>
          <div style={styles.statusItem}>
            <span className="type-label" style={styles.statusLabel}>PACKAGES</span>
            <span className="type-label" style={{ color: '#F0EDE8' }}>3 ON NPM</span>
          </div>
          <div style={styles.statusItem}>
            <span className="type-label" style={styles.statusLabel}>STACK</span>
            <span className="type-label" style={{ color: '#F0EDE8' }}>REACT · TS · NODE.JS</span>
          </div>
        </motion.div>

      </motion.div>
    </section>
  )
}

const styles = {
  section: {
    paddingTop: 'var(--space-5xl)',    // MOBILE FIX
    paddingBottom: 'var(--space-4xl)', // MOBILE FIX
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  inner: {
    display: 'flex',
    flexDirection: 'column',
    gap: '48px',
  },
  indexRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },
  index: {
    color: '#A0A0A0',
    flexShrink: 0,
  },
  line: {
    height: '1px',
    flex: 1,
    backgroundColor: '#1F1F1F',
  },
  nameBlock: {
    maxWidth: '900px',
  },
  name: {
    color: '#F0EDE8',
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
    color: '#A0A0A0',
  },
  role: {
    color: '#F0EDE8',
    lineHeight: 1.3,
  },
  bio: {
    color: '#808080',
    maxWidth: '480px',
  },
  ctas: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap',
  },
  statusBar: {
    paddingTop: '24px',
    borderTop: '1px solid #1F1F1F',
  },
  statusItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  statusLabel: {
    color: '#A0A0A0',
  },
  statusDot: {
    width: '5px',
    height: '5px',
    borderRadius: '50%',
    backgroundColor: '#E8FF5A',
    flexShrink: 0,
  },
}
