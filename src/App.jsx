import Nav from './components/Nav'
import Hero from './components/Hero'
import Work from './components/Work'
import Skills from './components/Skills'
import Playground from './components/Playground'
import Writing from './components/Writing'
import Contact from './components/Contact'
import ShipIt from './components/ShipIt'
import './index.css'

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Work />
        <Skills />
        <Playground />
        <Writing />
        <Contact />
      </main>
      <footer style={styles.footer}>
        <div className="container">
          <ShipIt />
        </div>
        <div className="container" style={styles.footerInner}>
          <span className="type-label" style={styles.footerLeft}>
            © 2026 DAMOLA ADEGBITE
          </span>
          <span className="type-label" style={styles.footerRight}>
            BACKEND · DEVOPS · AI EVALS
          </span>
        </div>
      </footer>
    </>
  )
}

const styles = {
  footer: {
    borderTop: '1px solid var(--color-border)',
    padding: '24px 0',
  },
  footerInner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerLeft:  { color: 'var(--color-text-muted)' },
  footerRight: { color: 'var(--color-text-muted)' },
}
