import React from 'react';
import './Skills.styles.css';

const skillsData = [
  {
    category: 'Programming Languages',
    skills: ['Python', 'Java', 'JavaScript', 'HTML', 'CSS'],
  },
  {
    category: 'Frameworks & Libraries',
    skills: ['React.js', 'Node.js', 'Express.js', 'Flask', 'Bootstrap'],
  },
  {
    category: 'Databases',
    skills: ['MySQL', 'MongoDB'],
  },
  {
    category: 'Data Science Tools',
    skills: ['Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'FAISS'],
  },
  {
    category: 'Development Tools',
    skills: ['Git', 'GitHub', 'VS Code', 'REST APIs', 'JWT'],
  },
  {
    category: 'Core Computer Science',
    skills: [
      'Data Structures',
      'Algorithms',
      'Object-Oriented Programming',
      'Operating Systems',
      'Computer Architecture',
      'Computer Networks',
    ],
  },
  {
    category: 'AI & Machine Learning',
    skills: [
      'Large Language Models',
      'Retrieval-Augmented Generation (RAG)',
      'Gemini API',
    ],
  },
  {
    category: 'Soft Skills',
    skills: ['Communication', 'Teamwork', 'Problem Solving', 'Project Management'],
  },
];

const Skills = () => (
  <section className="skills-section">
    <h2 className="skills-title gradient-text">Skills</h2>
    <div className="skills-grid">
      {skillsData.map((group) => (
        <div className="skills-card" key={group.category}>
          <h3 className="skills-category">{group.category}</h3>
          <ul className="skills-list">
            {group.skills.map((skill) => (
              <li className="skills-item" key={skill}>
                <span className="skills-icon">✔</span>
                <span>{skill}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </section>
);

export default Skills; 