import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '../lib/transitions'

const packages = [
  {
    id: 'pkg-jwt',
    name: '@dax-side/jwt-abstraction',
    tagline: 'JWT auth in 3 lines',
    description:
      'JWT auth in three lines. Access and refresh tokens, Express middleware, typed error classes. Running in three production projects.',
    links: {
      docs:   'https://dax-side.github.io/jwt-abstraction-site',
      npm:    'https://www.npmjs.com/package/@dax-side/jwt-abstraction',
      github: 'https://github.com/dax-side/jwt-abstraction',
    },
  },
  {
    id: 'pkg-journey',
    name: 'express-journey-mapper',
    tagline: 'Auto-generate OpenAPI docs',
    description:
      'Point it at your Express routes. It writes the Swagger docs. No YAML files.',
    links: {
      npm: 'https://www.npmjs.com/package/express-journey-mapper',
    },
  },
  {
    id: 'pkg-telex',
    name: 'error-telex',
    tagline: 'TypeScript error tracking SDK',
    description:
      'TypeScript SDK that ships error reports to the Telex backend. Handles retries and filtering automatically.',
    links: {
      npm: 'https://www.npmjs.com/package/error-telex',
    },
  },
]

const projects = [
  {
    id: 'proj-collab',
    index: '01',
    name: 'CollabEdit',
    tagline: 'Real-time collaborative editor',
    description:
      'Custom RGA-based CRDT, built from scratch. No Yjs, no Automerge. Tombstone retention handles late-arriving ops. A per-document operation queue fixes paste scrambling across clients.',
    tags: ['Node.js', 'TypeScript', 'WebSocket', 'PostgreSQL', 'Prisma', 'React'],
    accent: true,
    links: {
      live:   'https://collabeditf.pxxl.click/',
      github: 'https://github.com/dax-side/collab_edit',
    },
  },
  {
    id: 'proj-ecommerce',
    index: '02',
    name: 'E-commerce Microservices API',
    tagline: '48 → 716 req/sec',
    description:
      'Throughput went from 48 to 716 req/sec. Redis caching, MongoDB connection pooling, and targeted index fixes got it there. Load tested with k6 at 200 concurrent users.',
    tags: ['Node.js', 'TypeScript', 'MongoDB', 'Redis', 'Docker', 'Nginx', 'Prometheus'],
    accent: false,
    links: {
      github: 'https://github.com/dax-side/ecommerce-microservices-api',
    },
  },
  {
    id: 'proj-crossPay',
    index: '03',
    name: 'CrossPay',
    tagline: 'Cross-border remittance on-chain',
    description:
      'Personal project. GBP in, USDC out on Polygon. Stripe handles the fiat side. WebSocket keeps transaction state live. Built to understand cross-border payment infrastructure end to end.',
    tags: ['Node.js', 'TypeScript', 'PostgreSQL', 'Stripe', 'Polygon', 'Socket.io'],
    accent: false,
    links: {
      live:   'https://crosspaymentf.pxxl.click/',
      github: 'https://github.com/dax-side/cross_payment',
    },
  },
  {
    id: 'proj-hoh',
    index: '04',
    name: 'Heart of House',
    tagline: 'B2B marketplace',
    description:
      'Backend for a B2B marketplace. Liquor stores, vendors, real-time messaging via Socket.io, inventory management, automated rewards system, and AWS S3 for invoice storage.',
    tags: ['Node.js', 'TypeScript', 'Express', 'MongoDB', 'Socket.io', 'AWS S3'],
    accent: false,
    links: {},
  },
]

export default function Work() {
  return (
    <section id="work" className="section">
      <div className="container">

        {/* ── Published Packages ────────────────────────────────── */}
        <motion.div 
          style={styles.blockHeader}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <span className="type-label" style={styles.sectionIndex}>02 / WORK</span>
          <h2 className="type-h2" style={styles.heading}>Published Packages</h2>
          <p className="type-body-md" style={styles.subtext}>
            Three npm packages. Full test coverage. Solves real problems.
          </p>
        </motion.div>

        <motion.ul 
          style={styles.pkgList}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {packages.map((pkg) => (
            <motion.li key={pkg.id} id={pkg.id} className="list-item" style={styles.pkgItem} variants={fadeUp}>
              <div style={styles.pkgBody}>
                <div style={styles.pkgTop}>
                  <span className="type-label" style={styles.pkgName}>{pkg.name}</span>
                  <span className="type-label" style={styles.pkgTagline}>{pkg.tagline}</span>
                </div>
                <p className="type-body-md" style={styles.pkgDesc}>{pkg.description}</p>
              </div>
              <div style={styles.pkgLinks}>
                {pkg.links.docs && (
                  <a id={`${pkg.id}-docs`} href={pkg.links.docs} className="btn-ghost"
                    style={styles.pkgLinkBtn} target="_blank" rel="noopener noreferrer">DOCS</a>
                )}
                {pkg.links.npm && (
                  <a id={`${pkg.id}-npm`} href={pkg.links.npm} className="btn-ghost"
                    style={styles.pkgLinkBtn} target="_blank" rel="noopener noreferrer">NPM</a>
                )}
                {pkg.links.github && (
                  <a id={`${pkg.id}-gh`} href={pkg.links.github} className="btn-ghost"
                    style={styles.pkgLinkBtn} target="_blank" rel="noopener noreferrer">GH</a>
                )}
              </div>
            </motion.li>
          ))}
        </motion.ul>

        {/* ── Projects ──────────────────────────────────────────── */}
        <motion.div 
          style={{ ...styles.blockHeader, marginTop: '96px' }}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <h2 className="type-h2" style={styles.heading}>Projects</h2>
          <p className="type-body-md" style={styles.subtext}>
            APIs, databases, real-time systems. Deployed and running.
          </p>
        </motion.div>

        <motion.div 
          style={styles.grid}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {projects.map((project) => (
            <motion.article key={project.id} id={project.id} className="card" style={styles.card} variants={fadeUp}>
              <div style={styles.cardHeader}>
                <span className="type-label" style={styles.cardIndex}>{project.index}</span>
                {project.accent && (
                  <span className="tag-accent">FEATURED</span>
                )}
              </div>

              <div style={styles.cardBody}>
                <div>
                  <h3 className="type-h3" style={styles.projectName}>{project.name}</h3>
                  <p className="type-label" style={styles.tagline}>{project.tagline}</p>
                </div>
                <p className="type-body-md" style={styles.description}>{project.description}</p>
              </div>

              <div style={styles.cardFooter}>
                <div style={styles.tags}>
                  {project.tags.map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
                <div style={styles.cardLinks}>
                  {project.links.live && (
                    <a id={`${project.id}-live`} href={project.links.live}
                      className="btn-primary" style={styles.smallBtn}
                      target="_blank" rel="noopener noreferrer">LIVE</a>
                  )}
                  {project.links.github && (
                    <a id={`${project.id}-gh`} href={project.links.github}
                      className="btn-ghost" style={styles.smallBtn}
                      target="_blank" rel="noopener noreferrer">CODE</a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

      </div>
    </section>
  )
}

const styles = {
  blockHeader: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    marginBottom: '48px',
  },
  sectionIndex: { color: '#3A3A3A' },
  heading:      { color: '#F0EDE8' },
  subtext:      { color: '#808080', lineHeight: 1.6 },

  pkgList: { display: 'flex', flexDirection: 'column' },
  pkgItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '40px',
    flexWrap: 'wrap',
    cursor: 'default',
  },
  pkgBody:    { flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' },
  pkgTop:     { display: 'flex', alignItems: 'baseline', gap: '16px', flexWrap: 'wrap' },
  pkgName:    { color: '#F0EDE8', letterSpacing: '0.04em' },
  pkgTagline: { color: '#E8FF5A', letterSpacing: '0.06em' },
  pkgDesc:    { color: '#808080', maxWidth: '540px' },
  pkgLinks:   { display: 'flex', gap: '8px', alignItems: 'center', flexShrink: 0 },
  pkgLinkBtn: { fontSize: '0.7rem', padding: '8px 14px' },

  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '1px',
    backgroundColor: '#1F1F1F',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    backgroundColor: '#111111',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardIndex:   { color: '#3A3A3A' },
  cardBody:    { flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' },
  projectName: { color: '#F0EDE8', marginBottom: '4px' },
  tagline:     { color: '#E8FF5A', letterSpacing: '0.06em' },
  description: { color: '#808080', lineHeight: 1.7 },
  cardFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '12px',
    paddingTop: '16px',
    borderTop: '1px solid #1F1F1F',
  },
  tags:      { display: 'flex', flexWrap: 'wrap', gap: '6px' },
  cardLinks: { display: 'flex', gap: '8px' },
  smallBtn:  { fontSize: '0.7rem', padding: '8px 14px' },
}
