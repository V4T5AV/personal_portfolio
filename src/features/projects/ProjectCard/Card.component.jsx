import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import { useTilt } from './tilt.hook.js'
import './Card.styles.css'

const ProjectCard = ({ project, index }) => {
  const cardRef = useRef(null)
  const { tiltX, tiltY, handleMouseMove, handleMouseLeave } = useTilt()

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: "easeOut"
      }
    }
  }

  const imageVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  }

  return (
    <motion.div
      ref={cardRef}
      className="project-card"
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      whileHover="hover"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`
      }}
    >
      <div className="card-content">
        <motion.div 
          className="card-image"
          variants={imageVariants}
        >
          <img
            src={project.image}
            alt={project.title}
            className="project-image"
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '15px' }}
          />
          <div className="card-overlay">
            <div className="overlay-buttons">
              {project.live && project.live !== '#' && (
                <a
                  className="overlay-btn live"
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>Live Demo</span>
                </a>
              )}
              {project.github && (
                <a
                  className="overlay-btn github"
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>GitHub</span>
                </a>
              )}
            </div>
          </div>
        </motion.div>

        <div className="card-info">
          <h3 className="card-title">{project.title}</h3>
          <p className="card-description">{project.description}</p>
          
          <div className="card-technologies">
            {project.technologies.map((tech, techIndex) => (
              <span key={techIndex} className="tech-tag">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="card-glow"></div>
      </div>
    </motion.div>
  )
}

export default ProjectCard 