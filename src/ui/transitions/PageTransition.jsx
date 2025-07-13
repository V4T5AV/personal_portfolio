import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './PageTransition.styles.css'

const PageTransition = ({ children, isVisible = true }) => {
  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20,
      scale: 0.95
    },
    in: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    },
    out: {
      opacity: 0,
      y: -20,
      scale: 0.95,
      transition: {
        duration: 0.4,
        ease: "easeIn"
      }
    }
  }

  const overlayVariants = {
    initial: { opacity: 0 },
    in: { 
      opacity: 1,
      transition: { duration: 0.3 }
    },
    out: { 
      opacity: 0,
      transition: { duration: 0.3 }
    }
  }

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          className="page-transition"
          variants={pageVariants}
          initial="initial"
          animate="in"
          exit="out"
        >
          <motion.div
            className="transition-overlay"
            variants={overlayVariants}
            initial="initial"
            animate="in"
            exit="out"
          />
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default PageTransition 