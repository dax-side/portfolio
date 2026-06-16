export default function Hero() {
  return (
    <section id="home" style={styles.section}>
      <div className="container" style={styles.inner}>

        {/* Index label */}
        <div style={styles.indexRow}>
          <span className="type-label" style={styles.index}>01 / INTRO</span>
          <span style={styles.line} />
        </div>

        {/* Display name */}
        <div style={styles.nameBlock}>
          <h1 className="type-display animate-in" style={styles.name}>
            Damola<br />Adegbite
          </h1>
        </div>

        {/* Role + bio */}
        <div style={styles.meta}>
          <div style={styles.roleBlock} className="animate-in" data-delay="1">
            <span className="type-label" style={styles.label}>ROLE</span>
            <p className="type-h3" style={styles.role}>
              Backend Engineer
            </p>
          </div>

          <div style={styles.bioBlock} className="animate-in" data-delay="2">
            <span className="type-label" style={styles.label}>ABOUT</span>
            <p className="type-body-lg" style={styles.bio}>
              I build the systems behind the product. APIs, real-time infrastructure, distributed systems, and production deployments. Three npm packages in production.
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
          </div>
        </div>

        {/* Status bar */}
        <div style={styles.statusBar} className="animate-in" data-delay="3">
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
        </div>

      </div>
    </section>
  )
}

const styles = {
  section: {
    paddingTop: '160px',
    paddingBottom: '120px',
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
    color: '#3A3A3A',
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
    gridTemplateColumns: '1fr 2fr',
    gap: '64px',
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
    color: '#3A3A3A',
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
    display: 'flex',
    gap: '40px',
    flexWrap: 'wrap',
    paddingTop: '24px',
    borderTop: '1px solid #1F1F1F',
  },
  statusItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  statusLabel: {
    color: '#3A3A3A',
  },
  statusDot: {
    width: '5px',
    height: '5px',
    borderRadius: '50%',
    backgroundColor: '#E8FF5A',
    flexShrink: 0,
  },
}
