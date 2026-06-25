import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { projects } from '../data/portfolioData'

// ── 3D tilt card ──────────────────────────────────────
function TiltCard({ children, style = {} }) {
  const cardRef  = useRef(null)
  const rawX     = useMotionValue(0)
  const rawY     = useMotionValue(0)
  const x        = useSpring(rawX, { stiffness: 200, damping: 20 })
  const y        = useSpring(rawY, { stiffness: 200, damping: 20 })
  const rotateX  = useTransform(y, [-0.5, 0.5], [6, -6])
  const rotateY  = useTransform(x, [-0.5, 0.5], [-6, 6])

  const handleMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect()
    rawX.set((e.clientX - rect.left) / rect.width  - 0.5)
    rawY.set((e.clientY - rect.top)  / rect.height - 0.5)
  }
  const handleLeave = () => { rawX.set(0); rawY.set(0) }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle:  'preserve-3d',
        transformOrigin: 'center center',
        ...style,
      }}
    >
      {children}
    </motion.div>
  )
}

function ProjectCard({ project, index, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.13 + 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{ height: '100%' }}
    >
      <TiltCard style={{ height: '100%' }}>
        <div
          className="project-card"
          style={{ height: '100%', transform: 'translateZ(0)' }}
        >
          {/* Top */}
          <div style={{
            display:        'flex',
            justifyContent: 'space-between',
            alignItems:     'flex-start',
            gap:            '1rem',
          }}>
            <div>
              {project.highlight && (
                <span style={{
                  fontFamily:    'var(--font-mono)',
                  fontSize:      '0.65rem',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color:         'var(--accent)',
                  display:       'block',
                  marginBottom:  '0.4rem',
                }}>
                  Featured
                </span>
              )}
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize:   'clamp(1.2rem, 2.5vw, 1.5rem)',
                fontWeight: 400,
                color:      'var(--text-primary)',
                lineHeight: 1.2,
              }}>
                {project.name}
              </h3>
            </div>
            <span style={{
              color:      'var(--text-muted)',
              fontSize:   '1.1rem',
              flexShrink: 0,
              marginTop:  '0.2rem',
              transition: 'color 0.2s',
            }}>↗</span>
          </div>

          {/* Tagline */}
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            {project.tagline}
          </p>

          {/* Description */}
          <p style={{ fontSize: '0.83rem', color: 'var(--text-muted)', lineHeight: 1.75, flexGrow: 1 }}>
            {project.description}
          </p>

          {/* Tech */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: 'auto' }}>
            {project.tech.map(t => (
              <span key={t} className="tech-tag">{t}</span>
            ))}
          </div>
        </div>
      </TiltCard>
    </motion.div>
  )
}

export default function Projects() {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <section id="projects" ref={ref} style={{ padding: 'var(--section-gap) 0' }}>
      <div className="container">
        <motion.p
          className="section-label"
          style={{ marginBottom: '2.5rem' }}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          Projects
        </motion.p>

        <div style={{
          display:             'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap:                 '1.25rem',
          alignItems:          'stretch',
          perspective:         '1000px',
        }}>
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}