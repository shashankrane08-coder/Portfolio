import Navbar      from './components/Navbar'
import Hero        from './components/Hero'
import About       from './components/About'
import Skills      from './components/Skills'
import Projects    from './components/Projects'
import Experience  from './components/Experience'
import Contact     from './components/Contact'

export default function App() {
  return (
    <div className="min-h-screen" style={{ background: 'var(--bg-base)' }}>
      <Navbar />

      <main>
        <Hero />

        <hr className="section-divider" />
        <About />

        <hr className="section-divider" />
        <Skills />

        <hr className="section-divider" />
        <Projects />

        <hr className="section-divider" />
        <Experience />

        <hr className="section-divider" />
        <Contact />
      </main>

      <footer
        style={{
          borderTop:  '1px solid var(--border-subtle)',
          padding:    '2rem 0',
          marginTop:  '0',
          textAlign:  'center',
          fontFamily: 'var(--font-mono)',
          fontSize:   '0.72rem',
          color:      'var(--text-muted)',
          letterSpacing: '0.05em',
        }}
      >
        <div className="container">
          Built by Shashank Rane &nbsp;·&nbsp; {new Date().getFullYear()}
        </div>
      </footer>
    </div>
  )
}