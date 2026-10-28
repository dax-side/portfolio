import { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeUp } from '../lib/transitions'
import Wave from './Wave'

const CONTACT_LINKS = [
  {
    id:     'link-github',
    label:  'GitHub',
    handle: 'dax-side',
    href:   'https://github.com/dax-side',
  },
  {
    id:     'link-linkedin',
    label:  'LinkedIn',
    handle: 'damola-adegbite',
    href:   'https://linkedin.com/in/damola-adegbite',
  },
  {
    id:     'link-email',
    label:  'Email',
    handle: 'damolaadegbite77@gmail.com',
    href:   'mailto:damolaadegbite77@gmail.com',
  },
]

export default function Contact() {
  const [status, setStatus] = useState('idle')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('submitting')

    const res = await fetch('https://formspree.io/f/xjgdzoyd', {
      method: 'POST',
      body: new FormData(e.target),
      headers: { Accept: 'application/json' },
    })

    setStatus(res.ok ? 'succeeded' : 'error')
  }

  const isDisabled = status === 'submitting' || status === 'succeeded'

  return (
    <section id="contact" className="section" style={styles.section}>
      <div className="container">
        <div style={styles.layout}>

          {/* Left — header + links */}
          <motion.div
            style={styles.left}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <span className="type-label" style={styles.index}>06 / CONTACT</span>
            <h2 className="type-h2" style={styles.heading}>
              Open to remote roles.<br />
              <span style={styles.accentText}>Say hello.</span>
            </h2>
            <p className="type-body-md" style={styles.body}>
              Happy to talk architecture, tooling,
              or open-source work.
            </p>

            <ul style={styles.links}>
              {CONTACT_LINKS.map(link => (
                <li key={link.id} className="list-item" style={styles.linkItem}>
                  <a
                    id={link.id}
                    href={link.href}
                    target={link.href.startsWith('mailto') ? '_self' : '_blank'}
                    rel="noopener noreferrer"
                    style={styles.linkInner}
                  >
                    <span className="type-label" style={styles.linkLabel}>{link.label}</span>
                    <span className="type-body-md" style={styles.linkHandle}>{link.handle}</span>
                    <span style={styles.arrow}>↗</span>
                  </a>
                </li>
              ))}
            </ul>

            <Wave />
          </motion.div>

          {/* Right — form */}
          <motion.div
            style={styles.right}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <div style={styles.formCard}>
              <span className="type-label" style={styles.formLabel}>SEND A MESSAGE</span>

              <form
                onSubmit={handleSubmit}
                style={styles.form}
                aria-label="Contact form"
              >
                <div style={styles.row}>
                  <div style={styles.field}>
                    <label htmlFor="contact-name" className="type-label" style={styles.fieldLabel}>NAME</label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      placeholder="Your name"
                      className="input"
                      disabled={isDisabled}
                    />
                  </div>
                  <div style={styles.field}>
                    <label htmlFor="contact-email" className="type-label" style={styles.fieldLabel}>EMAIL</label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      placeholder="your@email.com"
                      className="input"
                      disabled={isDisabled}
                    />
                  </div>
                </div>

                <div style={styles.field}>
                  <label htmlFor="contact-subject" className="type-label" style={styles.fieldLabel}>SUBJECT</label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    placeholder="What's it about?"
                    className="input"
                    disabled={isDisabled}
                  />
                </div>

                <div style={styles.field}>
                  <label htmlFor="contact-message" className="type-label" style={styles.fieldLabel}>MESSAGE</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell me what you're building..."
                    className="input"
                    style={styles.textarea}
                    disabled={isDisabled}
                  />
                </div>

                <button
                  id="contact-submit"
                  type="submit"
                  className="btn-primary"
                  disabled={isDisabled}
                  style={styles.submitBtn}
                >
                  {status === 'idle' && 'SEND MESSAGE'}
                  {status === 'submitting' && 'SENDING...'}
                  {status === 'succeeded' && '✓ SENT'}
                  {status === 'error' && 'TRY AGAIN'}
                </button>

                {status === 'succeeded' && (
                  <p className="type-label" style={styles.successMsg}>
                    Message received. I'll get back to you within 48hrs.
                  </p>
                )}

                {status === 'error' && (
                  <p className="type-label" style={styles.errorMsg}>
                    There was an issue sending your message. Please try again.
                  </p>
                )}
              </form>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}

const styles = {
  section: { paddingBottom: 'var(--space-5xl)' },
  layout: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: 'clamp(24px, 5vw, 80px)',
    alignItems: 'start',
  },
  left: {
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
  },
  index:      { color: '#A0A0A0' },
  heading:    { color: '#F0EDE8', lineHeight: 1.1 },
  accentText: { color: '#E8FF5A' },
  body:       { color: '#808080', maxWidth: '360px' },
  links:      { marginTop: '8px' },
  linkItem:   { padding: 0, cursor: 'pointer' },
  linkInner: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    width: '100%',
    padding: '20px 0',
    color: 'inherit',
  },
  linkLabel:  { color: '#A0A0A0', width: '72px', flexShrink: 0 },
  linkHandle: { color: '#F0EDE8', flex: 1, fontSize: '0.9rem' },
  arrow:      { color: '#808080', fontSize: '1rem', fontFamily: "'Space Mono', monospace" },
  right:      {},
  formCard: {
    border: '1px solid #1F1F1F',
    padding: 'clamp(20px, 5vw, 40px)',
    display: 'flex',
    flexDirection: 'column',
    gap: '32px',
    backgroundColor: '#111111',
  },
  formLabel: { color: '#A0A0A0' },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  row: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
    gap: '16px',
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  fieldLabel: { color: '#A0A0A0' },
  textarea: {
    resize: 'vertical',
    minHeight: '120px',
    fontFamily: "'Inter', sans-serif",
  },
  submitBtn: {
    alignSelf: 'flex-start',
    transition: 'background-color 150ms ease-out',
  },
  successMsg: { color: '#E8FF5A', letterSpacing: '0.06em' },
  errorMsg:   { color: '#FF5A5A', letterSpacing: '0.06em' },
}