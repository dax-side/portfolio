import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '../lib/transitions'

const skillGroups = [
  {
    id: 'skills-backend',
    category: 'Backend & APIs',
    items: [
      { name: 'Node.js',     detail: 'Primary runtime' },
      { name: 'Express',     detail: 'REST APIs and routing' },
      { name: 'NestJS',      detail: 'Modular architecture, dependency injection' },
      { name: 'GraphQL',     detail: 'Apollo Server, schema-first' },
      { name: 'PostgreSQL',  detail: 'Schema design, query tuning' },
      { name: 'MongoDB',     detail: 'Aggregation pipelines, index tuning' },
      { name: 'Redis',       detail: 'Caching, pub/sub, rate limiting' },
    ],
  },
  {
    id: 'skills-devops',
    category: 'Infrastructure & DevOps',
    items: [
      { name: 'Git & GitHub',   detail: 'Version control, PR workflows' },
      { name: 'Docker',      detail: 'Multi-stage builds, composed services' },
      { name: 'GitHub Actions', detail: 'CI/CD with health checks and rollback' },
      { name: 'AWS EC2',        detail: 'Production hosting, IAM, S3' },
      { name: 'PM2',            detail: 'Process management, zero-downtime restarts' },
      { name: 'Railway',        detail: 'Fast deploys, per-environment config' },
    ],
  },
  {
    id: 'skills-testing',
    category: 'Testing & Evaluation',
    items: [
      { name: 'Vitest & Jest',      detail: 'Unit and integration suites' },
      { name: 'pytest & Go testing', detail: 'Suites in Python and Go codebases' },
      { name: 'k6',                 detail: 'Load testing at 200 concurrent users' },
      { name: 'Docker test images', detail: 'Suites that run offline as a non-root user' },
      { name: 'Claude Code',        detail: 'Agent-assisted review of specs and tests' },
    ],
  },
  {
    id: 'skills-frontend',
    category: 'Frontend',
    items: [
      { name: 'React',       detail: '' },
      { name: 'Next.js',     detail: '' },
      { name: 'TypeScript',  detail: '' },
      { name: 'Tailwind CSS',detail: '' },
      { name: 'Vite',        detail: '' },
    ],
  },
]

export default function Skills() {
  return (
    <section id="skills" className="section section-band">
      <div className="container">

        <motion.div 
          style={styles.header}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <h2 className="type-h2" style={styles.heading}>Tools I use in production.</h2>
        </motion.div>

        <div className="skills-grid" style={styles.groups}>
          {skillGroups.map(group => (
            <div key={group.id} id={group.id} style={styles.group}>
              <div style={styles.groupHeader}>
                <span className="type-label" style={styles.category}>{group.category}</span>
                {group.note && <p className="type-body-md" style={styles.groupNote}>{group.note}</p>}
              </div>
              <motion.ul
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-80px" }}
              >
                {group.items.map((item) => (
                  <motion.li key={item.name} className="list-item" style={styles.skillItem} variants={fadeUp}>
                    <span className="type-label-lg" style={styles.skillName}>{item.name}</span>
                    {item.detail && <span className="type-body-md" style={styles.skillDetail}>{item.detail}</span>}
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          ))}
        </div>

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
  groups: {
    display: 'grid',
    gap: 'clamp(24px, 5vw, 64px)',
  },
  group: {
    display: 'flex',
    flexDirection: 'column',
  },
  groupHeader: {
    paddingBottom: '16px',
    borderBottom: '1px solid var(--color-border)',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  category:    { color: 'var(--color-accent-text)' },
  groupNote:   { color: 'var(--color-text-secondary)', fontSize: '0.875rem' },
  skillItem:   { flexDirection: 'column', gap: '4px', cursor: 'default' },
  skillName:   { color: 'var(--color-text-primary)' },
  skillDetail: { color: 'var(--color-text-secondary)', fontSize: '0.875rem', lineHeight: 1.5 },
}
