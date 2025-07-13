import React, { useEffect, useState, useRef } from 'react'
import { useMagnetic } from './magnetic.hook.js'
import './Cursor.styles.css'

const CursorSystem = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const { magneticRef } = useMagnetic()
  const eventListenersRef = useRef(new Set())

  useEffect(() => {
    const eventListeners = eventListenersRef.current
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    // Add event listeners for interactive elements
    const addEventListeners = () => {
      const interactiveElements = document.querySelectorAll('button, a, .project-card, .info-item')
      
      interactiveElements.forEach(el => {
        // Check if listener already exists
        if (!eventListeners.has(el)) {
          el.addEventListener('mouseenter', handleMouseEnter)
          el.addEventListener('mouseleave', handleMouseLeave)
          eventListeners.add(el)
        }
      })
    }

    // Initial setup
    addEventListeners()

    // Re-setup after a delay to catch dynamically added elements
    const timeoutId = setTimeout(addEventListeners, 1000)

    document.addEventListener('mousemove', handleMouseMove)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      clearTimeout(timeoutId)
      
      // Clean up all tracked event listeners
      eventListeners.forEach(el => {
        el.removeEventListener('mouseenter', handleMouseEnter)
        el.removeEventListener('mouseleave', handleMouseLeave)
      })
      eventListeners.clear()
    }
  }, [])

  return (
    <>
      <div 
        className={`custom-cursor ${isHovering ? 'hover' : ''}`}
        style={{
          left: mousePosition.x,
          top: mousePosition.y
        }}
      />
      <div 
        ref={magneticRef}
        className={`cursor-trail ${isHovering ? 'hover' : ''}`}
        style={{
          left: mousePosition.x,
          top: mousePosition.y
        }}
      />
    </>
  )
}

export default CursorSystem