import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Highlight active nav link
      const sections = document.querySelectorAll('section[id]');
      const scrollY = window.scrollY + 120;

      sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');

        if (scrollY >= top && scrollY < top + height) {
          setActiveSection(id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleNav = () => setIsOpen(!isOpen);
  const closeNav = () => setIsOpen(false);

  return (
    <nav id="navbar" className={isScrolled ? 'scrolled' : ''}>
      <div className="nav-container">
        <a href="#hero" className="nav-logo" onClick={closeNav}>
          <span className="logo-bracket">&lt;</span>MA<span className="logo-bracket"> /&gt;</span>
        </a>
        <ul className={`nav-links ${isOpen ? 'open' : ''}`} id="navLinks">
          <li><a href="#about" className={activeSection === 'about' ? 'active' : ''} onClick={closeNav}>About</a></li>
          <li><a href="#skills" className={activeSection === 'skills' ? 'active' : ''} onClick={closeNav}>Skills</a></li>
          <li><a href="#projects" className={activeSection === 'projects' ? 'active' : ''} onClick={closeNav}>Projects</a></li>
          <li><a href="#education" className={activeSection === 'education' ? 'active' : ''} onClick={closeNav}>Education</a></li>
          <li><a href="#contact" className={activeSection === 'contact' ? 'active' : ''} onClick={closeNav}>Contact</a></li>
        </ul>
        <button 
          className={`hamburger ${isOpen ? 'active' : ''}`} 
          id="hamburger" 
          aria-label="Toggle navigation"
          onClick={toggleNav}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </div>
    </nav>
  );
}
