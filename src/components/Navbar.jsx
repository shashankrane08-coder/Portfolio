import { useState, useEffect } from 'react'
import { Link } from 'react-scroll'

const navLinks = [
  { label: 'About',      to: 'about'      },
  { label: 'Skills',     to: 'skills'     },
  { label: 'Projects',   to: 'projects'   },
  { label: 'Experience', to: 'experience' },
  { label: 'Contact',    to: 'contact'    },
]

function useActiveSection() {
  const [active, setActive] = useState('')

  useEffect(() => {
    const ids = navLinks.map(l => l.to)

    const observer = new IntersectionObserver(
      (entries) => {
        // Pick the entry that is most visible
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible.length > 0) setActive(visible[0].target.id)
      },
      {
        rootMargin: '-20% 0px -60% 0px',
        threshold:  [0, 0.25, 0.5, 0.75, 1],
      }
    )

    ids.forEach(id => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return active
}

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)
  const activeSection = useActiveSection()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header style={{
      position:       'fixed',
      top:             0,
      left:            0,
      right:           0,
      zIndex:          100,
      borderBottom:   scrolled ? '1px solid var(--border-subtle)' : '1px solid transparent',
      background:     scrolled ? 'rgba(15, 14, 13, 0.90)' : 'transparent',
      backdropFilter: scrolled ? 'blur(14px)' : 'none',
      transition:     'background 0.3s ease, border-color 0.3s ease',
    }}>
      <div
        className="container"
        style={{
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'space-between',
          paddingBlock:   '1.1rem',
        }}
      >
        {/* Logo */}
        <a
          href="#hero"
          style={{
            fontFamily:     'var(--font-mono)',
            fontSize:       '0.85rem',
            fontWeight:      500,
            color:          'var(--accent)',
            textDecoration: 'none',
            letterSpacing:  '0.08em',
          }}
        >
          SR
        </a>

        {/* Desktop nav */}
        <nav style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}
          className="hidden md:flex"
        >
          {navLinks.map(link => {
            const isActive = activeSection === link.to
            return (
              <Link
                key={link.to}
                to={link.to}
                smooth
                duration={500}
                offset={-72}
                style={{
                  cursor:        'pointer',
                  fontFamily:    'var(--font-mono)',
                  fontSize:      '0.78rem',
                  letterSpacing: '0.06em',
                  textDecoration: 'none',
                  color:         isActive ? 'var(--accent)' : 'var(--text-secondary)',
                  position:      'relative',
                  paddingBottom: '3px',
                  transition:    'color 0.2s',
                }}
              >
                {link.label}
                {/* Active underline */}
                <span style={{
                  position:   'absolute',
                  bottom:      0,
                  left:        0,
                  width:      isActive ? '100%' : '0%',
                  height:     '1.5px',
                  background: 'var(--accent)',
                  transition: 'width 0.3s ease',
                  display:    'block',
                }} />
              </Link>
            )
          })}
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Toggle menu"
          className="flex md:hidden"
          style={{
            background: 'none',
            border:     'none',
            cursor:     'pointer',
            padding:    '0.25rem',
            color:      'var(--text-secondary)',
            flexDirection: 'column',
            gap:         '5px',
          }}
        >
          {[0, 1, 2].map(i => (
            <span key={i} style={{
              display:    'block',
              width:      '20px',
              height:     '1.5px',
              background: 'currentColor',
              transition: 'transform 0.2s, opacity 0.2s',
              transform:
                i === 0 && menuOpen ? 'rotate(45deg) translateY(6.5px)' :
                i === 2 && menuOpen ? 'rotate(-45deg) translateY(-6.5px)' :
                'none',
              opacity: i === 1 && menuOpen ? 0 : 1,
            }} />
          ))}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <nav style={{
          background: 'var(--bg-surface)',
          borderTop:  '1px solid var(--border-subtle)',
          padding:    '1rem 0 1.5rem',
        }}>
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              smooth
              duration={500}
              offset={-72}
              onClick={() => setMenuOpen(false)}
              style={{
                display:        'block',
                padding:        '0.65rem 1.5rem',
                fontFamily:     'var(--font-mono)',
                fontSize:       '0.8rem',
                letterSpacing:  '0.06em',
                color:          activeSection === link.to ? 'var(--accent)' : 'var(--text-secondary)',
                cursor:         'pointer',
                textDecoration: 'none',
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}