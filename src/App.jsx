import React, { Suspense } from 'react'
import Hero from './features/hero/Hero.component.jsx'
import Projects from './features/projects/Projects.component.jsx'
import Certificates from './features/certificates/Certificates.component.jsx'
// import Contact from './features/contact/Contact.component.jsx' // Unused, remove this line
import LoadingSystem from './systems/loader/Loading.system.jsx'
import NavDots from './ui/navigation/NavDots.jsx'
import HeroScene from './features/hero/Hero.scene.jsx'
import './App.css'
import { ThreeProvider } from './core/providers/ThreeProvider.jsx'
import Skills from './features/skills/Skills.component.jsx'
import NavBar from './ui/navigation/NavBar.jsx'
import About from './features/skills/About.component.jsx'

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          padding: '20px', 
          textAlign: 'center', 
          color: 'white',
          background: '#121212',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <h2>Something went wrong</h2>
          <p>Please refresh the page to try again.</p>
          <button 
            onClick={() => window.location.reload()}
            style={{
              padding: '10px 20px',
              background: '#667eea',
              border: 'none',
              borderRadius: '5px',
              color: 'white',
              cursor: 'pointer'
            }}
          >
            Refresh Page
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

function App() {
  return (
    <ErrorBoundary>
      <div className="app">
        <NavBar />
        <LoadingSystem />
        
        <main className="main-content">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Certificates />
          <section id="contact" style={{ textAlign: 'center', marginTop: '60px' }}>
            <h1 style={{ fontWeight: 'bold', fontSize: '3rem', marginBottom: '32px', letterSpacing: '1px' }}>
              Contact <span role="img" aria-label="telephone">☎️</span>
            </h1>
            <div
              style={{
                display: 'inline-block',
                background: '#333',
                color: '#ffe066',
                borderRadius: '32px',
                padding: '48px 64px',
                fontFamily: 'monospace',
                fontSize: '1.35rem',
                boxShadow: '0 8px 32px rgba(0,0,0,0.35)',
                minWidth: '420px',
                maxWidth: '90vw'
              }}
            >
              <span style={{ color: '#7fffd4', fontSize: '1.15em' }}>const</span> <span style={{ color: '#ff6b81', fontSize: '1.15em' }}>Srivatsav</span> = <span style={{ color: '#7fffd4', fontSize: '1.15em' }}>new</span> <span style={{ color: '#ffe066', fontSize: '1.15em' }}>Person</span>
              <span style={{ color: '#fff', fontSize: '1.15em' }}>(&#123;</span>
              <br />
              &nbsp;&nbsp;<span style={{ color: '#ff6b81' }}>email</span>: <span style={{ color: '#ffe066' }}>"<a href="mailto:srivatsavreddy456@gmail.com" style={{ color: '#ffe066', textDecoration: 'underline' }}>srivatsavreddy456@gmail.com</a>"</span>,
              <br />
              &nbsp;&nbsp;<span style={{ color: '#ff6b81' }}>github</span>: <span style={{ color: '#ffe066' }}>"<a href="https://github.com/V4T5AV" target="_blank" rel="noopener noreferrer" style={{ color: '#ffe066', textDecoration: 'underline' }}>V4T5AV</a>"</span>,
              <br />
              &nbsp;&nbsp;<span style={{ color: '#ff6b81' }}>linkedin</span>: <span style={{ color: '#ffe066' }}>"<a href="https://linkedin.com/in/srivatsav-reddy-1614a02b8" target="_blank" rel="noopener noreferrer" style={{ color: '#ffe066', textDecoration: 'underline' }}>srivatsav-reddy-1614a02b8</a>"</span>
              <br />
              <span style={{ color: '#fff', fontSize: '1.15em' }}>&#125;);</span>
            </div>
          </section>
        </main>
        
        <NavDots />
        
        <ThreeProvider>
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        </ThreeProvider>
      </div>
    </ErrorBoundary>
  )
}

export default App