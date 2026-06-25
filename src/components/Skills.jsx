import { motion } from 'framer-motion'
import { skills } from '../data/portfolioData'
import { useScrollAnimation } from '../hooks/useScrollAnimation'

export default function Skills() {
  const anim = useScrollAnimation(0.15)

  return (
    <section id="skills" style={{ padding: '4rem 0' }}>
      <div className="container">
        <motion.div {...anim.container}>
          <motion.p
            className="section-label"
            style={{ marginBottom: '2rem' }}
            {...anim.item()}
          >
            Skills
          </motion.p>

          <div style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap:                 '2rem',
          }}>
            {skills.map((group, gi) => (
              <motion.div key={group.category} {...anim.item(gi * 0.08)}>
                <p style={{
                  fontFamily:    'var(--font-mono)',
                  fontSize:      '0.7rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color:         'var(--accent)',
                  marginBottom:  '0.85rem',
                }}>
                  {group.category}
                </p>
                <div style={{
                  width:        '100%',
                  height:       '1px',
                  background:   'var(--border-subtle)',
                  marginBottom: '1rem',
                }} />
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {group.items.map(skill => (
                    <span key={skill} className="skill-pill">{skill}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}