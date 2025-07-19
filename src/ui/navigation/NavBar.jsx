import React from 'react';
import './NavBar.styles.css';

const RESUME_LINK = 'https://drive.google.com/file/d/1U3UZeyhxUq0UhpsdbvHJ6zU5JdC2vfvN/view?usp=sharing';

const NavBar = () => (
  <nav className="main-navbar">
    <ul className="navbar-list">
      <li><a href="#projects" className="navbar-link">Projects</a></li>
      <li><a href="#experience" className="navbar-link">Experience</a></li>
      <li>
        <a href={RESUME_LINK} className="navbar-link" target="_blank" rel="noopener noreferrer">
          Resume <span className="navbar-ext-icon" aria-label="external link">&#8599;</span>
        </a>
      </li>
      <li><a href="#contact" className="navbar-link">Contact</a></li>
    </ul>
  </nav>
);

export default NavBar;