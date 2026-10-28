import { useEffect, useState } from 'react'

const THEME_COLORS = { light: '#F0EDE8', dark: '#1A1918' }

// Light is the default; a dark choice is saved and applied before paint by the script in index.html.
function ThemeToggle() {
  const [theme, setTheme] = useState(() => (document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'))

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    if (next === 'dark') document.documentElement.dataset.theme = 'dark'
    else delete document.documentElement.dataset.theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLORS[next])
    try { localStorage.setItem('theme', next) } catch { /* storage blocked: the choice lasts until reload */ }
  }

  return (
    <button
      id="theme-toggle"
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        {theme === 'dark' ? (
          <>
            <circle cx="12" cy="12" r="4.5" />
            <path d="M12 1.5v2.5M12 20v2.5M4.6 4.6l1.8 1.8M17.6 17.6l1.8 1.8M1.5 12H4M20 12h2.5M4.6 19.4l1.8-1.8M17.6 6.4l1.8-1.8" />
          </>
        ) : (
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        )}
      </svg>
    </button>
  )
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('home')
  const [isOpen, setIsOpen] = useState(false) 

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40)

      const sections = ['home', 'work', 'skills', 'playground', 'writing', 'contact']
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

  useEffect(() => {
    const onResize = () => { if (window.innerWidth > 768) setIsOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const links = [
    { id: 'home',    label: 'Home' },
    { id: 'work',    label: 'Work' },
    { id: 'skills',  label: 'Skills' },
    { id: 'playground', label: 'Playground' },
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

        <ul className="nav-links-desktop" style={styles.links}>
          {links.map(link => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                onClick={e => { handleClick(e, link.id); setIsOpen(false) }}
                className={`nav-link${active === link.id ? ' active' : ''}`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div style={styles.actions}>
          <ThemeToggle />

          <a
            href="#contact"
            onClick={e => handleClick(e, 'contact')}
            id="nav-cta"
            className="btn-ghost"
            style={{ fontSize: '0.75rem', minHeight: '44px' }}
          >
            GET IN TOUCH
          </a>

          <button
            className="nav-hamburger"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setIsOpen(o => !o)}
            style={styles.hamburger}
          >
            {isOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {isOpen && (
        <ul style={styles.mobileMenu}>
          {links.map(link => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                onClick={e => { handleClick(e, link.id); setIsOpen(false) }}
                className={`nav-link${active === link.id ? ' active' : ''}`}
                style={styles.mobileLink}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      )}
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
    borderBottom: `1px solid ${scrolled ? 'var(--color-border)' : 'transparent'}`,
    backgroundColor: scrolled ? 'var(--color-nav)' : 'transparent',
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
    color: 'var(--color-text-primary)',
    textTransform: 'uppercase',
  },
  logoDot: {
    width: '6px',
    height: '6px',
    borderRadius: '50%',
    backgroundColor: 'var(--color-accent)',
    boxShadow: '0 0 0 1px var(--color-accent-edge)',
    display: 'inline-block',
    flexShrink: 0,
  },
  links: {},
  actions: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  hamburger: {
    color: 'var(--color-text-primary)',
    fontSize: '1.25rem',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  },
  mobileMenu: {
    backgroundColor: 'var(--color-nav-menu)',
    borderTop: '1px solid var(--color-border)',
    padding: '8px 0',
  },
  mobileLink: {
    display: 'flex',
    alignItems: 'center',
    minHeight: '44px',
    padding: '0 var(--side-padding)',
    width: '100%',
  },
}
