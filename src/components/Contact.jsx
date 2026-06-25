import { motion } from 'framer-motion'
import { personal } from '../data/portfolioData'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

export default function Contact() {
  const anim = useScrollAnimation(0.2)

  return (
    <section id="contact" style={{ padding: 'var(--section-gap) 0' }}>
      <div className="container">
        <motion.div {...anim.container}>
          <motion.p
            className="section-label"
            style={{ marginBottom: '2rem' }}
            {...anim.item()}
          >
            Contact
          </motion.p>

          <div style={{ maxWidth: '560px' }}>
            <motion.h2
              style={{
                fontFamily:   'var(--font-display)',
                fontSize:     'clamp(2rem, 5vw, 3rem)',
                fontWeight:   400,
                color:        'var(--text-primary)',
                lineHeight:   1.15,
                marginBottom: '1.25rem',
              }}
              {...anim.item(0.05)}
            >
              Let's Build Something
              <br />
              <span style={{ color: 'var(--accent)' }}>Together.</span>
            </motion.h2>

            <motion.p
              style={{
                fontSize:     '0.95rem',
                color:        'var(--text-secondary)',
                lineHeight:   1.8,
                marginBottom: '2.25rem',
                maxWidth:     '44ch',
              }}
              {...anim.item(0.1)}
            >
              I'm open to internship opportunities, freelance projects,
              and collaborations. Feel free to reach out — I reply quickly.
            </motion.p>

            <motion.div
              style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}
              {...anim.item(0.15)}
            >
              <a href={`mailto:${personal.email}`} className="btn-primary">
                ✉&nbsp;&nbsp;{personal.email}
              </a>
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                GitHub ↗
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}