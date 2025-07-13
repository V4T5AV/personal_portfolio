import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import ProjectCard from './ProjectCard/Card.component.jsx'
import './Projects.styles.css'

const projectsData = [
  {
    id: 1,
    title: "Smart Carpooling System",
    description: "Intelligent ride-sharing platform with real-time matching and route optimization",
    technologies: ["React", "Node.js", "MongoDB", "Socket.io"],
    image: "/assets/media/project1.jpg",
    link: "#",
    github: "https://github.com/NikhilGeorge01/SmartCarPooling",
    live: "#"
  },
  {
    id: 2,
    title: "MediCheck- Counterfeit Medicine Detection",
    description: "AI-powered system for detecting counterfeit medicines using image recognition",
    technologies: ["Python", "TensorFlow", "OpenCV", "Flask"],
    image: "/assets/media/project2.jpg",
    link: "#",
    github: "https://github.com/V4T5AV/medicheck-scroll-detect",
    live: "#"
  },
  {
    id: 3,
    title: "Library Management System",
    description: "Comprehensive library management solution with book tracking and user management",
    technologies: ["Java", "Spring Boot", "MySQL", "Thymeleaf"],
    image: "/assets/media/project3.jpg",
    link: "#",
    github: "https://github.com/NikhilGeorge01/LibraryManager",
    live: "#"
  },
  {
    id: 4,
    title: "React Portfolio",
    description: "Interactive 3D portfolio with Three.js and React Three Fiber",
    technologies: ["Three.js", "React", "Framer Motion", "GSAP"],
    image: "/assets/media/project4.jpg",
    link: "#",
    github: "#",
    live: "#"
  },
  {
    id: 5,
    title: "Data Analysis and Visualization Dashboard",
    description: "Real-time data analytics dashboard with interactive visualizations",
    technologies: ["Vue.js", "D3.js", "Python", "PostgreSQL"],
    image: "/assets/media/project5.jpg",
    link: "#",
    github: "https://github.com/V4T5AV/197DAVASSIGNMENT",
    live: "#"
  }
]

const Projects = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

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
    <section id="projects" ref={ref} className="projects-section">
      <motion.div 
        className="projects-container"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div className="section-header" variants={itemVariants}>
          <h2 className="section-title">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-subtitle">
            A collection of my latest work showcasing creativity and technical expertise
          </p>
        </motion.div>

        <motion.div className="projects-grid" variants={itemVariants}>
          {projectsData.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index}
            />
          ))}
        </motion.div>

        <motion.div className="projects-cta" variants={itemVariants}>
          <button className="view-all-button">
            <span>View All Projects</span>
            <div className="button-arrow">→</div>
          </button>
        </motion.div>
      </motion.div>

      <div className="projects-background">
        <div className="floating-shapes">
          {[...Array(6)].map((_, i) => (
            <div 
              key={i} 
              className="floating-shape"
              style={{
                '--delay': `${i * 0.5}s`,
                '--duration': `${3 + i * 0.5}s`
              }}
            ></div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects 