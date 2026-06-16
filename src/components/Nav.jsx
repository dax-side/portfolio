import { useEffect, useRef, useState } from 'react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)

      const sections = ['home', 'work', 'skills', 'writing', 'contact']
      for (const id of sections) {
        const el = document.getElementById(id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        if (rect.top <= 120 && rect.bottom > 120) {
          setActive(id)
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { id: 'home',    label: 'Home' },
    { id: 'work',    label: 'Work' },
    { id: 'skills',  label: 'Skills' },
    { id: 'writing', label: 'Writing' },
    { id: 'contact', label: 'Contact' },
  ]

  const handleClick = (e, id) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav style={styles.nav(scrolled)} aria-label="Main navigation">
      <div className="container" style={styles.inner}>
        <a
          href="#home"
          onClick={e => handleClick(e, 'home')}
          style={styles.logo}
          aria-label="Home"
        >
          <span style={styles.logoDot} />
          DA
        </a>

        <ul style={styles.links}>
          {links.map(link => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                onClick={e => handleClick(e, link.id)}
                className={`nav-link${active === link.id ? ' active' : ''}`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          onClick={e => handleClick(e, 'contact')}
          id="nav-cta"
          className="btn-ghost"
          style={{ fontSize: '0.75rem' }}
        >
          GET IN TOUCH
        </a>
      </div>
    </nav>
  )
}

const styles = {
  nav: (scrolled) => ({
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    borderBottom: `1px solid ${scrolled ? '#1F1F1F' : 'transparent'}`,
    backgroundColor: scrolled ? 'rgba(10, 10, 10, 0.95)' : 'transparent',
    backdropFilter: 'none',
    transition: 'border-color 200ms ease-out, background-color 200ms ease-out',
  }),
  inner: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '64px',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontFamily: "'Space Mono', monospace",
    fontSize: '0.875rem',
    fontWeight: 700,
    letterSpacing: '0.06em',
    color: '#F0EDE8',
    textTransform: 'uppercase',
  },
  logoDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    backgroundColor: '#E8FF5A',
    display: 'inline-block',
    flexShrink: 0,
  },
  links: {
    display: 'flex',
    alignItems: 'center',
    gap: '32px',
  },
}
