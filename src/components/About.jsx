import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { about } from '../data/portfolioData'

// ── Animated counter ──────────────────────────────────
const stats = [
  { value: 3,   suffix: '',  label: 'Projects Built'     },
  { value: 2,   suffix: '+', label: 'Years Learning'     },
  { value: 3,   suffix: '',  label: 'Tech Stacks'        },
  { value: 100, suffix: '%', label: 'Learning by Doing'  },
]

function Counter({ value, suffix, label, inView }) {
  const countRef = useRef(null)
  const frameRef = useRef(null)

  useEffect(() => {
    if (!inView || !countRef.current) return
    const duration = 1400
    const start    = performance.now()

    const step = (now) => {
      const elapsed  = now - start
      const progress = Math.min(elapsed / duration, 1)
      // Ease out expo
      const eased    = 1 - Math.pow(1 - progress, 4)
      countRef.current.textContent = Math.round(eased * value) + suffix
      if (progress < 1) frameRef.current = requestAnimationFrame(step)
    }

    frameRef.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frameRef.current)
  }, [inView, value, suffix])

  return (
    <div style={{ textAlign: 'left' }}>
      <p
        ref={countRef}
        style={{
          fontFamily:  'var(--font-display)',
          fontSize:    'clamp(2rem, 4vw, 2.75rem)',
          fontWeight:  400,
          color:       'var(--text-primary)',
          lineHeight:  1,
          marginBottom: '0.4rem',
        }}
      >
        0{suffix}
      </p>
      <p style={{
        fontFamily:    'var(--font-mono)',
        fontSize:      '0.68rem',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color:         'var(--text-muted)',
      }}>
        {label}
      </p>
    </div>
  )
}

export default function About() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <section id="about" ref={ref} style={{ padding: 'var(--section-gap) 0' }}>
      <div className="container" style={{ maxWidth: '820px' }}>

        {/* Label */}
        <motion.p
          className="section-label"
          style={{ marginBottom: '2rem' }}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          About
        </motion.p>

        {/* Text */}
        <motion.div
          className="about-text"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          style={{ marginBottom: '3.5rem' }}
        >
          {about.paragraphs.map((para, i) => (
            <p key={i} style={{
              fontSize:     'clamp(0.95rem, 2vw, 1.05rem)',
              color:        i === 0 ? 'var(--text-primary)' : 'var(--text-secondary)',
              lineHeight:   1.85,
              marginBottom: i < about.paragraphs.length - 1 ? '1.25rem' : 0,
              fontWeight:   i === 0 ? 400 : 300,
            }}>
              {para}
            </p>
          ))}
        </motion.div>

        {/* Stat counters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.3 }}
          style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap:                 '2rem',
            borderTop:           '1px solid var(--border-subtle)',
            paddingTop:          '2.5rem',
          }}
        >
          {stats.map((stat, i) => (
            <Counter
              key={stat.label}
              {...stat}
              inView={inView}
            />
          ))}
        </motion.div>
      </div>
    </section>
  )
}