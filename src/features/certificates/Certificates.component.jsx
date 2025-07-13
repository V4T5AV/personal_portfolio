import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import './Certificates.styles.css'

const certificatesData = [
  {
    id: 1,
    title: "Salesforce AI Associate",
    issuer: "Salesforce",
    date: "2025",
    credentialId: "SF-AI-ASSOC-2024",
    image: "/assets/media/cert1.jpg",
    link: "#",
    view: "https://drive.google.com/file/d/1SPwOL9V8DnmqPKsoLa3fe4eWuM4YAs1d/view?usp=sharing",
    skills: ["Salesforce", "AI", "CRM", "Business Intelligence"]
  },
  {
    id: 2,
    title: "Agentforce Specialist",
    issuer: "Salesforce",
    date: "2025",
    credentialId: "SF-AGENT-2024",
    image: "/assets/media/cert2.jpg",
    link: "#",
    view: "https://drive.google.com/file/d/1TkyJPZUP0DKgsrPcO3q0hSaQ5f_2O5Qm/view?usp=sharing",
    skills: ["Salesforce", "Automation", "Workflow", "Process Builder"]
  },
  {
    id: 3,
    title: "Microsoft Azure AI Fundamentals",
    issuer: "Microsoft",
    date: "2025",
    credentialId: "MS-AZURE-AI-2024",
    image: "/assets/media/cert3.jpg",
    link: "#",
    view: "https://learn.microsoft.com/api/credentials/share/en-us/SrivatsavReddy-3632/82E3F4373CFE5A56?sharingId=845EF433E2EC4C78",
    skills: ["Azure", "AI", "Machine Learning", "Cloud Computing"]
  },
  {
    id: 4,
    title: "Generative AI with Large Language Models",
    issuer: "Udemy",
    date: "2025",
    credentialId: "COURSE-GENAI-2024",
    image: "/assets/media/cert4.jpg",
    link: "#",
    view: "https://www.udemy.com/certificate/UC-eeed4528-3bb3-432e-aa9d-95ebde5cbeec/",
    skills: ["Generative AI", "LLMs", "NLP", "Deep Learning"]
  },
  {
    id: 5,
    title: "Web Development Bootcamp",
    issuer: "Udemy",
    date: "2024",
    credentialId: "UDEMY-WEB-2023",
    image: "/assets/media/cert5.jpg",
    link: "#",
    view: "https://drive.google.com/file/d/1C8YxI6hjzmMDD0lMbrxX1RjsFs3kaqIx/view?usp=sharing",
    skills: ["HTML", "CSS", "JavaScript", "React", "Node.js"]
  },
  {
    id: 6,
    title: "Data Science for Engineers",
    issuer: "NPTEL",
    date: "2024",
    credentialId: "COURSE-DS-ENG-2023",
    image: "/assets/media/cert6.jpg",
    link: "#",
    view: "https://drive.google.com/file/d/1C0_YECS6J0AU3ji09oXoHz8pQcQEcgMe/view?usp=sharing",
    skills: ["Python", "Data Science", "Statistics", "Machine Learning"]
  }
]

const CertificateCard = ({ certificate, index }) => {
  const cardRef = useRef(null)
  const isInView = useInView(cardRef, { once: true, margin: "-50px" })

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

  return (
    <motion.div
      ref={cardRef}
      className="certificate-card"
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover={{ 
        y: -5,
        transition: { duration: 0.2 }
      }}
    >
      <div className="certificate-content">
        <div className="certificate-image-wrapper">
          <img
            src={certificate.image}
            alt={certificate.title}
            className="certificate-image"
          />
        </div>
        <div className="certificate-header">
          <div className="certificate-info">
            <h3 className="certificate-title">{certificate.title}</h3>
            <p className="certificate-issuer">{certificate.issuer}</p>
            <p className="certificate-date">{certificate.date}</p>
          </div>
        </div>

        <div className="certificate-skills">
          {certificate.skills.map((skill, skillIndex) => (
            <span key={skillIndex} className="skill-tag">
              {skill}
            </span>
          ))}
        </div>

        <div className="certificate-footer">
          <div className="credential-id">
            ID: {certificate.credentialId}
          </div>
          {certificate.view && (
            <a
              className="view-certificate-btn"
              href={certificate.view}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>View Certificate</span>
              <div className="btn-arrow">→</div>
            </a>
          )}
        </div>

        <div className="certificate-glow"></div>
      </div>
    </motion.div>
  )
}

const Certificates = () => {
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
    <section ref={ref} className="certificates-section">
      <motion.div 
        className="certificates-container"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.div className="section-header" variants={itemVariants}>
          <h2 className="section-title">
            Professional <span className="gradient-text">Certifications</span>
          </h2>
          <p className="section-subtitle">
            Validated expertise and continuous learning in modern technologies
          </p>
        </motion.div>

        <motion.div className="certificates-grid" variants={itemVariants}>
          {certificatesData.map((certificate, index) => (
            <CertificateCard 
              key={certificate.id} 
              certificate={certificate} 
              index={index}
            />
          ))}
        </motion.div>

        <motion.div className="certificates-cta" variants={itemVariants}>
          <button className="view-all-certificates-btn">
            <span>View All Certificates</span>
            <div className="button-arrow">→</div>
          </button>
        </motion.div>
      </motion.div>

      <div className="certificates-background">
        <div className="floating-certificates">
          {[...Array(8)].map((_, i) => (
            <div 
              key={i} 
              className="floating-certificate"
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

export default Certificates 