import { motion } from 'framer-motion'
import { experience, hackathons } from '../data/portfolioData'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

export default function Experience() {
  const anim = useScrollAnimation(0.2)

  const entries = [
    ...experience.map(e => ({ ...e, isHackathon: false })),
    { isHackathon: true },
  ]

  return (
    <section id="experience" style={{ padding: '4rem 0 3rem' }}>
      <div className="container">
        <motion.div {...anim.container}>
          <motion.p
            className="section-label"
            style={{ marginBottom: '2rem' }}
            {...anim.item()}
          >
            Experience
          </motion.p>

          <div style={{ maxWidth: '640px' }}>
            {entries.map((item, i) => (
              <motion.div
                key={i}
                style={{
                  display:       'flex',
                  gap:           '1.25rem',
                  paddingBottom: i < entries.length - 1 ? '2rem' : '0',
                }}
                {...anim.slideIn('left', i * 0.1)}
              >
                <div
                  className="timeline-dot"
                  style={item.isHackathon ? { background: 'var(--text-muted)' } : {}}
                />
                <div>
                  <p style={{
                    fontFamily:    'var(--font-mono)',
                    fontSize:      '0.7rem',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color:         item.isHackathon ? 'var(--text-muted)' : 'var(--accent)',
                    marginBottom:  '0.3rem',
                  }}>
                    {item.isHackathon ? 'Ongoing' : item.type}
                  </p>

                  <h3 style={{
                    fontFamily:   'var(--font-display)',
                    fontSize:     '1.3rem',
                    fontWeight:   400,
                    color:        'var(--text-primary)',
                    lineHeight:   1.2,
                    marginBottom: '0.25rem',
                  }}>
                    {item.isHackathon ? hackathons.heading : item.role}
                  </h3>

                  {!item.isHackathon && (
                    <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                      {item.company}&nbsp;·&nbsp;
                      <span style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize:   '0.78rem',
                        color:      'var(--text-muted)',
                      }}>
                        {item.duration}
                      </span>
                    </p>
                  )}

                  {item.isHackathon && (
                    <p style={{
                      fontSize:   '0.88rem',
                      color:      'var(--text-secondary)',
                      lineHeight: 1.75,
                      maxWidth:   '46ch',
                      marginTop:  '0.35rem',
                    }}>
                      {hackathons.body}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}