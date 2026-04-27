import { useState, useEffect } from 'react';

export default function Hero() {
  const [text, setText] = useState('');
  
  useEffect(() => {
    const phrases = [
      'Aspiring Developer',
      'Python Problem Solver',
      'Web Dev Learner',
      'Golang Explorer',
      'AI & ML Enthusiast'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 80;
    let timerId;

    function typewrite() {
      const current = phrases[phraseIndex];

      if (isDeleting) {
        setText(current.substring(0, charIndex - 1));
        charIndex--;
        typeSpeed = 40;
      } else {
        setText(current.substring(0, charIndex + 1));
        charIndex++;
        typeSpeed = 80;
      }

      if (!isDeleting && charIndex === current.length) {
        typeSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 400;
      }

      timerId = setTimeout(typewrite, typeSpeed);
    }

    typewrite();

    return () => clearTimeout(timerId);
  }, []);

  return (
    <section id="hero">
      <div className="hero-overlay"></div>
      <div className="hero-bg-grid"></div>
      <div className="hero-glow hero-glow--1"></div>
      <div className="hero-glow hero-glow--2"></div>

      <div className="hero-content">
        <div className="hero-photo-wrapper">
          <div className="hero-photo-ring">
            <img src="/profile.jpg" alt="Manoj Ahire" className="hero-photo" />
          </div>
        </div>

        <p className="hero-greeting">
          <span className="wave">👋</span> Hello, I'm
        </p>
        <h1 className="hero-name">Manoj Ahire</h1>
        <p className="hero-title">
          <i className="fa-solid fa-code"></i>
          <span className="typewriter" id="typewriter">{text}</span><span className="cursor">|</span>
        </p>
        <p className="hero-tagline">
          Completing my first-year as a BTech CSE (AI &amp; ML) student building the future, one line of code at a time.
        </p>
        <div className="hero-cta">
          <a href="#projects" className="btn btn-primary">
            <i className="fa-solid fa-rocket"></i> View My Work
          </a>
          <a href="#contact" className="btn btn-outline">
            <i className="fa-solid fa-paper-plane"></i> Get in Touch
          </a>
        </div>

        <div className="hero-socials">
          <a href="https://github.com/ManojAhire" target="_blank" rel="noopener noreferrer" className="social-icon" title="GitHub" aria-label="GitHub">
            <i className="fa-brands fa-github"></i>
          </a>
          <a href="#" className="social-icon" title="LinkedIn" aria-label="LinkedIn">
            <i className="fa-brands fa-linkedin-in"></i>
          </a>
          <a href="https://www.instagram.com/the_manojahire/" target="_blank" rel="noopener noreferrer" className="social-icon" title="Instagram" aria-label="Instagram">
            <i className="fa-brands fa-instagram"></i>
          </a>
        </div>
      </div>

      <div className="scroll-indicator">
        <div className="mouse">
          <div className="mouse-wheel"></div>
        </div>
        <p>Scroll Down</p>
      </div>
    </section>
  );
}
