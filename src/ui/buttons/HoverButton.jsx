import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import './HoverButton.styles.css'

const HoverButton = ({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'medium',
  disabled = false,
  className = ''
}) => {
  const buttonRef = useRef(null)

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    tap: { 
      scale: 0.95,
      transition: { duration: 0.1 }
    }
  }

  const glowVariants = {
    initial: { opacity: 0 },
    hover: { 
      opacity: 1,
      transition: { duration: 0.3 }
    }
  }

  return (
    <motion.button
      ref={buttonRef}
      className={`hover-button ${variant} ${size} ${className}`}
      onClick={onClick}
      disabled={disabled}
      variants={buttonVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
    >
      <span className="button-content">{children}</span>
      <motion.div 
        className="button-glow"
        variants={glowVariants}
      />
      <div className="button-border" />
    </motion.button>
  )
}

export default HoverButton 