import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-scroll'
import { personal } from '../data/portfolioData'
import profilePhoto from '../assets/profile.jpg'

// ── 1. Staggered letter reveal ─────────────────────────
const LetterReveal = ({ text, delay = 0 }) => (
  <motion.span
    style={{ display: 'inline-block' }}
    initial="hidden"
    animate="visible"
    variants={{
      visible: { transition: { staggerChildren: 0.035, delayChildren: delay } },
    }}
  >
    {text.split('').map((char, i) => (
      <motion.span
        key={i}
        style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        variants={{
          hidden:  { opacity: 0, y: 40, rotateX: -90 },
          visible: { opacity: 1, y: 0,  rotateX: 0,
            transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
        }}
      >
        {char}
      </motion.span>
    ))}
  </motion.span>
)

// ── 2. Cycling typing eyebrow ──────────────────────────
const cycleTexts = [
  'Computer Engineering Student',
  'Full Stack Developer',
  'Building Real Software',
  'Open to Internships',
]

function TypingEyebrow() {
  const [index, setIndex]       = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting]   = useState(false)
  const timeout = useRef(null)

  useEffect(() => {
    const current = cycleTexts[index]
    if (!deleting && displayed.length < current.length) {
      timeout.current = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 55)
    } else if (!deleting && displayed.length === current.length) {
      timeout.current = setTimeout(() => setDeleting(true), 1800)
    } else if (deleting && displayed.length > 0) {
      timeout.current = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 28)
    } else if (deleting && displayed.length === 0) {
      setDeleting(false)
      setIndex(i => (i + 1) % cycleTexts.length)
    }
    return () => clearTimeout(timeout.current)
  }, [displayed, deleting, index])

  return (
    <p style={{
      fontFamily:    'var(--font-mono)',
      fontSize:      '0.75rem',
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      color:         'var(--accent)',
      marginBottom:  '1.25rem',
      minHeight:     '1.2em',
    }}>
      {displayed}
      <span style={{
        display:       'inline-block',
        width:         '2px',
        height:        '0.85em',
        background:    'var(--accent)',
        marginLeft:    '2px',
        verticalAlign: 'text-bottom',
        animation:     'blink 1s step-end infinite',
      }} />
    </p>
  )
}

export default function Hero() {
  return (
    <>
      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>

      <section
        id="hero"
        className="dot-grid"
        style={{
          minHeight:     '100vh',
          display:       'flex',
          alignItems:    'center',
          paddingTop:    '7rem',
          paddingBottom: '5rem',
          position:      'relative',
        }}
      >
        {/* Dot grid fade */}
        <div style={{
          position:      'absolute',
          inset:          0,
          background:    'linear-gradient(to bottom, transparent 60%, var(--bg-base) 100%)',
          pointerEvents: 'none',
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{
            display:             'grid',
            gridTemplateColumns: 'minmax(0, 1fr) auto',
            gap:                 'clamp(2rem, 6vw, 5rem)',
            alignItems:          'center',
          }}>

            {/* ── Left ── */}
            <div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <TypingEyebrow />
              </motion.div>

              <h1 style={{
                fontFamily:   'var(--font-display)',
                fontSize:     'clamp(3.2rem, 8vw, 6rem)',
                lineHeight:   1.05,
                color:        'var(--text-primary)',
                marginBottom: '1.5rem',
                fontWeight:   400,
                perspective:  '600px',
              }}>
                <LetterReveal text={personal.name.first} delay={0.3} />
                <br />
                <LetterReveal text={personal.name.last} delay={0.55} />
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  fontSize:     'clamp(0.95rem, 2vw, 1.1rem)',
                  color:        'var(--text-secondary)',
                  lineHeight:   1.75,
                  maxWidth:     '44ch',
                  marginBottom: '2.25rem',
                }}
              >
                {personal.tagline}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.1 }}
                style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
              >
                <Link to="projects" smooth duration={600} offset={-72}
                  className="btn-primary" style={{ cursor: 'pointer' }}>
                  See What I've Built
                  <span style={{ fontSize: '1rem', lineHeight: 1 }}>↗</span>
                </Link>
                <Link to="contact" smooth duration={600} offset={-72}
                  className="btn-ghost" style={{ cursor: 'pointer' }}>
                  Contact Me
                </Link>
              </motion.div>
            </div>

            {/* ── Right: Photo ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="hidden sm:block"
              style={{ flexShrink: 0 }}
            >
              {/* Outer offset border */}
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <div style={{
                  position:    'absolute',
                  inset:       '-10px',
                  border:      '1.5px solid var(--accent-dim)',
                  borderRadius: '4px',
                  zIndex:       0,
                  transform:   'translate(8px, 8px)',
                }} />

                {/* Photo container with dark blend overlay */}
                <div style={{
                  position:     'relative',
                  zIndex:        1,
                  borderRadius: '4px',
                  overflow:     'hidden',
                  width:        'clamp(200px, 22vw, 280px)',
                  height:       'clamp(240px, 27vw, 340px)',
                }}>
                  <img
                    src={profilePhoto}
                    alt={personal.photoAlt}
                    style={{
                      width:      '100%',
                      height:     '100%',
                      objectFit:  'cover',
                      objectPosition: 'top center',
                      display:    'block',
                      filter:     'grayscale(20%) contrast(1.08) brightness(0.88)',
                    }}
                  />
                  {/* Subtle dark vignette so edges blend into the dark bg */}
                  <div style={{
                    position:   'absolute',
                    inset:       0,
                    background: `
                      linear-gradient(to bottom, transparent 55%, rgba(15,14,13,0.55) 100%),
                      linear-gradient(to right,  rgba(15,14,13,0.12) 0%, transparent 30%),
                      linear-gradient(to left,   rgba(15,14,13,0.12) 0%, transparent 30%)
                    `,
                    pointerEvents: 'none',
                  }} />
                </div>
              </div>
            </motion.div>

          </div>

          {/* Scroll hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            style={{
              marginTop:     '4rem',
              display:       'flex',
              alignItems:    'center',
              gap:           '0.75rem',
              fontFamily:    'var(--font-mono)',
              fontSize:      '0.7rem',
              letterSpacing: '0.1em',
              color:         'var(--text-muted)',
            }}
          >
            <span style={{
              display:    'block',
              width:      '1.5px',
              height:     '2.5rem',
              background: 'var(--border-soft)',
            }} />
            Scroll
          </motion.div>
        </div>
      </section>
    </>
  )
}