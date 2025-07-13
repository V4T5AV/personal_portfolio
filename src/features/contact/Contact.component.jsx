import React, { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useFormAnimation } from './Form.animation.js'
import './Contact.styles.css'

const Contact = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { formVariants, fieldVariants } = useFormAnimation()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setIsSubmitting(false)
    setFormData({ name: '', email: '', message: '' })
  }

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
    <section id="contact" ref={ref} className="contact-section">
      <motion.div 
        className="contact-container"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div className="section-header" variants={itemVariants}>
          <h2 className="section-title">
            Let&apos;s <span className="gradient-text">Connect</span>
          </h2>
          <p className="section-subtitle">
            Ready to bring your ideas to life? Let&apos;s discuss your next project
          </p>
        </motion.div>

        <div className="contact-content">
          <motion.div className="contact-info" variants={itemVariants}>
            <div className="info-item">
              <div className="info-icon">📧</div>
              <div className="info-content">
                <h3>Email</h3>
                <p>hello@yourportfolio.com</p>
              </div>
            </div>
            
            <div className="info-item">
              <div className="info-icon">📱</div>
              <div className="info-content">
                <h3>Phone</h3>
                <p>+1 (555) 123-4567</p>
              </div>
            </div>
            
            <div className="info-item">
              <div className="info-icon">📍</div>
              <div className="info-content">
                <h3>Location</h3>
                <p>San Francisco, CA</p>
              </div>
            </div>
          </motion.div>

          <motion.form 
            className="contact-form"
            variants={formVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            onSubmit={handleSubmit}
          >
            <motion.div className="form-group" variants={fieldVariants}>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Your name"
              />
            </motion.div>

            <motion.div className="form-group" variants={fieldVariants}>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="your.email@example.com"
              />
            </motion.div>

            <motion.div className="form-group" variants={fieldVariants}>
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                placeholder="Tell me about your project..."
                rows={5}
              />
            </motion.div>

            <motion.button
              type="submit"
              className="submit-button"
              variants={fieldVariants}
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? (
                <div className="loading-spinner">
                  <div className="spinner"></div>
                  <span>Sending...</span>
                </div>
              ) : (
                <span>Send Message</span>
              )}
            </motion.button>
          </motion.form>
        </div>
      </motion.div>

      <div className="contact-background">
        <div className="floating-elements">
          {[...Array(8)].map((_, i) => (
            <div 
              key={i} 
              className="floating-element"
              style={{
                '--delay': `${i * 0.3}s`,
                '--duration': `${4 + i * 0.5}s`
              }}
            ></div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Contact 