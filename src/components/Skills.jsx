import { useEffect, useRef } from 'react'

const skillGroups = [
  {
    id: 'skills-backend',
    category: 'Backend & APIs',
    items: [
      { name: 'Node.js',     detail: 'Primary runtime for APIs, real-time services, and tooling' },
      { name: 'Express',     detail: 'REST APIs, middleware, routing' },
      { name: 'NestJS',      detail: 'Modular architecture, dependency injection, guards' },
      { name: 'GraphQL',     detail: 'Apollo Server, schema-first, custom resolvers' },
      { name: 'PostgreSQL',  detail: 'Schema design, query tuning, replication' },
      { name: 'MongoDB',     detail: 'Aggregation pipelines, connection pooling, index tuning' },
      { name: 'Redis',       detail: 'Caching, pub/sub, rate limiting' },
    ],
  },
  {
    id: 'skills-devops',
    category: 'Infrastructure & DevOps',
    items: [
      { name: 'Git & GitHub',   detail: 'Version control, PR workflows, code review' },
      { name: 'Docker',      detail: 'Multi-stage builds, composed services' },
      { name: 'GitHub Actions', detail: 'CI/CD pipelines with health checks, rollback on failure' },
      { name: 'AWS EC2',        detail: 'Production hosting, IAM policies, S3 integration' },
      { name: 'PM2',            detail: 'Process management, zero-downtime restarts' },
      { name: 'Railway',        detail: 'Fast deploys, per-environment config' },
    ],
  },
  {
    id: 'skills-frontend',
    category: 'Frontend (light)',
    note: 'Can ship a frontend, but not the primary focus.',
    items: [
      { name: 'React',       detail: 'Component architecture, hooks, state management' },
      { name: 'Next.js',     detail: 'App router, SSR/SSG, API routes' },
      { name: 'TypeScript',  detail: 'Strict mode on every production project' },
      { name: 'Tailwind CSS',detail: 'Utility-first styling, responsive design' },
      { name: 'Vite',        detail: 'Fast bundling, HMR, optimized builds' },
    ],
  },
]

function SkillItem({ item, index }) {
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => ref.current?.classList.add('visible'), index * 50)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [index])

  return (
    <li
      ref={ref}
      className="list-item reveal"
      style={styles.skillItem}
    >
      <span className="type-label-lg" style={styles.skillName}>{item.name}</span>
      <span className="type-body-md" style={styles.skillDetail}>{item.detail}</span>
    </li>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="container">

        <div style={styles.header}>
          <span className="type-label" style={styles.sectionIndex}>03 / SKILLS</span>
          <h2 className="type-h2" style={styles.heading}>Tools & Stack</h2>
        </div>

        <div style={styles.groups}>
          {skillGroups.map(group => (
            <div key={group.id} id={group.id} style={styles.group}>
              <div style={styles.groupHeader}>
                <span className="type-label" style={styles.category}>{group.category}</span>
                {group.note && <p className="type-body-md" style={styles.groupNote}>{group.note}</p>}
              </div>
              <ul>
                {group.items.map((item, i) => (
                  <SkillItem key={item.name} item={item} index={i} />
                ))}
              </ul>
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
    marginBottom: '64px',
  },
  sectionIndex: { color: '#3A3A3A' },
  heading:      { color: '#F0EDE8' },
  groups: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '64px',
  },
  group: {
    display: 'flex',
    flexDirection: 'column',
  },
  groupHeader: {
    paddingBottom: '16px',
    borderBottom: '1px solid #1F1F1F',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  category:    { color: '#E8FF5A' },
  groupNote:   { color: '#808080', fontSize: '0.875rem' },
  skillItem:   { flexDirection: 'column', gap: '4px', cursor: 'default' },
  skillName:   { color: '#F0EDE8' },
  skillDetail: { color: '#808080', fontSize: '0.875rem', lineHeight: 1.5 },
}
