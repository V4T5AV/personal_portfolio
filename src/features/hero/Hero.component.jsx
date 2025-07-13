import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import './Hero.styles.css'
import Typewriter from '../skills/Typewriter.jsx'

const Hero = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <section ref={ref} className="hero-section">
      <div className="hero-background">
        {/* Three.js scene is rendered separately in App.jsx */}
        <div className="hero-bg-accent"></div>
      </div>
      
      <motion.div 
        className="hero-content"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div className="hero-text hero-text-main" variants={itemVariants}>
          <div className="hero-name">
            <span className="hero-greeting">Hello !</span>
            <span className="hero-wave" role="img" aria-label="waving hand">👋</span>,
            <span className="hero-intro"> I'm <span className="hero-strong">Nagam Srivatsav Reddy</span></span>
          </div>
          <div className="hero-typewriter-row">
            <span className="hero-typewriter-label">Interested In </span>
            <Typewriter
              phrases={["Machine Learning", "Python", "Full Stack Web Development", "Artificial Intelligence", "Open Source"]}
              typingSpeed={100}
              deletingSpeed={60}
              pause={1000}
              style={{ fontSize: "2rem", fontWeight: 800, color: "#fff", marginLeft: 8 }}
              cursorColor="#67e8f9"
            />
          </div>
        </motion.div>
        {/* Removed hero-actions and hero-scroll-indicator blocks */}
      </motion.div>

      <div className="hero-particles">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="particle" style={{
            '--delay': `${Math.random() * 3}s`,
            '--duration': `${2 + Math.random() * 2}s`
          }}></div>
        ))}
      </div>
    </section>
  )
}

export default Hero 