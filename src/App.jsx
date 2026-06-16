import Nav from './components/Nav'
import Hero from './components/Hero'
import Work from './components/Work'
import Skills from './components/Skills'
import Writing from './components/Writing'
import Contact from './components/Contact'
import './index.css'

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Work />
        <Skills />
        <Writing />
        <Contact />
      </main>
      <footer style={styles.footer}>
        <div className="container" style={styles.footerInner}>
          <span className="type-label" style={styles.footerLeft}>
            © 2026 DAMOLA ADEGBITE
          </span>
          <span className="type-label" style={styles.footerRight}>
            FULLSTACK · NODE.JS · TYPESCRIPT
          </span>
        </div>
      </footer>
    </>
  )
}

const styles = {
  footer: {
    borderTop: '1px solid #1F1F1F',
    padding: '24px 0',
  },
  footerInner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerLeft:  { color: '#3A3A3A' },
  footerRight: { color: '#3A3A3A' },
}
