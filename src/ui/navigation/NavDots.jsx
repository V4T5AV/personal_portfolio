import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import './NavDots.styles.css'

const NavDots = () => {
  const [activeSection, setActiveSection] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const sectionsRef = useRef([])
  const scrollTimeoutRef = useRef(null)

  const sections = [
    { id: 'hero', label: 'Home' },
    { id: 'projects', label: 'Projects' },
    { id: 'certificates', label: 'Certificates' },
    { id: 'contact', label: 'Contact' }
  ]

  // Throttled scroll handler
  const handleScroll = useCallback(() => {
    if (scrollTimeoutRef.current) return
    
    scrollTimeoutRef.current = setTimeout(() => {
      const scrollPosition = window.scrollY + window.innerHeight / 2
      
      sectionsRef.current.forEach((section, index) => {
        if (section) {
          const sectionTop = section.offsetTop
          const sectionHeight = section.offsetHeight
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActiveSection(index)
          }
        }
      })
      
      setIsVisible(window.scrollY > 100)
      scrollTimeoutRef.current = null
    }, 16) // ~60fps
  }, [])

  useEffect(() => {
    // Cache section elements
    sectionsRef.current = document.querySelectorAll('section')
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [handleScroll])

  const scrollToSection = useCallback((index) => {
    if (sectionsRef.current[index]) {
      sectionsRef.current[index].scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  return (
    <motion.div
      className={`nav-dots ${isVisible ? 'visible' : ''}`}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : 20 }}
      transition={{ duration: 0.3 }}
    >
      {sections.map((section, index) => (
        <motion.button
          key={section.id}
          className={`nav-dot ${activeSection === index ? 'active' : ''}`}
          onClick={() => scrollToSection(index)}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.9 }}
          title={section.label}
        >
          <div className="dot-indicator" />
          <span className="dot-label">{section.label}</span>
        </motion.button>
      ))}
    </motion.div>
  )
}

export default NavDots 