import { motion } from 'framer-motion'
import { fadeUp, staggerContainer } from '../lib/transitions'

const posts = [
  {
    id:       'post-build-right-now',
    title:    'How Would I Build For Right Now',
    series:   'How Would I Build',
    desc:     'On premature optimisation. You can only build for the version of your system that your current data supports. Anything else is speculation with a roadmap attached.',
    href:     'https://dev.to/dax-side/how-would-i-build-for-right-now-2fmm',
    date:     '2026',
  },
  {
    id:       'post-payment-system',
    title:    'How Would I Build a Payment System That Doesn\'t Lose Money',
    series:   'How Would I Build',
    desc:     'Correlation IDs, SAGA pattern, SELECT FOR UPDATE, primary/replica splitting. Reasoning through the full design before a line of code gets written.',
    href:     'https://dev.to/dax-side/how-would-i-build-a-payment-system-that-doesnt-lose-money-16ap',
    date:     'May 2026',
  },
  {
    id:       'post-emissions-dashboard',
    title:    'I Built a Tool That Shows Developers What Their Backend Costs the Planet',
    series:   'BUILT',
    desc:     'Cloud emissions dashboard. Input your provider, region, and compute hours. It outputs a CO2e breakdown by service with Gemini-ranked suggestions and estimated monthly savings.',
    href:     'https://dev.to/dax-side/i-built-a-tool-that-shows-developers-what-their-backend-costs-the-planet-jm1',
    date:     'Apr 2026',
  },
  {
    id:       'post-gitnotion',
    title:    'GitNotion — GitHub to Notion Sync with AI Reports',
    series:   'BUILT',
    desc:     'MCP server that syncs GitHub issues, PRs, and commits into Notion databases. Gemini generates the weekly summaries, release notes, and contributor breakdowns. Ships via npx.',
    href:     'https://dev.to/dax-side/i-built-an-mcp-server-that-syncs-github-into-notion-and-generates-ai-reports-5ao6',
    date:     'Mar 2026',
  },
]

export default function Writing() {
  return (
    <section id="writing" className="section section-band">
      <div className="container">

        <motion.div 
          style={styles.header}
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <h2 className="type-h2" style={styles.heading}>Writing</h2>
        </motion.div>

        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          {posts.map((post) => (
            <motion.li key={post.id} className="list-item" style={styles.item} variants={fadeUp}>
              <a
                id={post.id}
                href={post.href}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.link}
              >
                <div style={styles.body}>
                  <div style={styles.top}>
                    <span className="tag-accent" style={styles.series}>{post.series}</span>
                    <span className="type-label" style={styles.date}>{post.date}</span>
                  </div>
                  <h3 className="type-h3" style={styles.title}>{post.title}</h3>
                  <p className="type-body-md" style={styles.desc}>{post.desc}</p>
                </div>

                <span style={styles.arrow}>↗</span>
              </a>
            </motion.li>
          ))}
        </motion.ul>

        <div style={styles.footer}>
          <a
            id="writing-all"
            href="https://dev.to/dax-side"
            className="btn-ghost"
            target="_blank"
            rel="noopener noreferrer"
          >
            ALL POSTS ON DEV.TO
          </a>
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

  item: {
    padding: 0,
    cursor: 'pointer',
  },
  link: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '24px',
    padding: '24px 0',
    width: '100%',
    color: 'inherit',
  },
  body: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  top: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  series: {
    fontSize: '0.7rem',
    padding: '3px 8px',
  },
  date: {
    color: 'var(--color-text-muted)',
  },
  title: {
    color: 'var(--color-text-primary)',
    transition: 'color 150ms ease-out',
  },
  desc: {
    color: 'var(--color-text-secondary)',
    maxWidth: '680px',
  },
  arrow: {
    color: 'var(--color-text-secondary)',
    fontFamily: "'Space Mono', monospace",
    fontSize: '1rem',
    flexShrink: 0,
    paddingTop: '4px',
    transition: 'color 150ms ease-out',
  },
  footer: {
    paddingTop: '40px',
  },
}
