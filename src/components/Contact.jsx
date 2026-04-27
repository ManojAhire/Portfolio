import { useEffect, useRef } from 'react';

export default function Contact() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    const animateElements = sectionRef.current.querySelectorAll('.animate-on-scroll');
    animateElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="contact" className="section" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title animate-on-scroll">
          <i className="fa-solid fa-envelope"></i> Get in Touch
        </h2>
        <p className="section-subtitle animate-on-scroll">Let's connect — I'm always open to new opportunities and conversations.</p>

        <div className="contact-grid animate-on-scroll">
          <div className="social-bar glass-card">
            <h3><i className="fa-solid fa-share-nodes"></i> Find Me Online</h3>
            <div className="social-links">
              <a href="https://github.com/ManojAhire" target="_blank" rel="noopener noreferrer" className="social-link-card" title="GitHub">
                <i className="fa-brands fa-github"></i>
                <span>GitHub</span>
                <small>@ManojAhire</small>
              </a>
              <a href="#" className="social-link-card" title="LinkedIn">
                <i className="fa-brands fa-linkedin-in"></i>
                <span>LinkedIn</span>
                <small>Coming soon</small>
              </a>
              <a href="https://www.instagram.com/the_manojahire/" target="_blank" rel="noopener noreferrer" className="social-link-card" title="Instagram">
                <i className="fa-brands fa-instagram"></i>
                <span>Instagram</span>
                <small>@the_manojahire</small>
              </a>
              <a href="#" className="social-link-card" title="Twitter / X">
                <i className="fa-brands fa-x-twitter"></i>
                <span>Twitter / X</span>
                <small>Coming soon</small>
              </a>
            </div>
          </div>

          <div className="contact-info glass-card">
            <h3><i className="fa-solid fa-address-card"></i> Quick Info</h3>
            <ul className="contact-list">
              <li>
                <i className="fa-solid fa-location-dot"></i>
                <span>Pune, Maharashtra, India</span>
              </li>
              <li>
                <i className="fa-solid fa-graduation-cap"></i>
                <span>Newton School of Technology</span>
              </li>
              <li>
                <i className="fa-solid fa-laptop-code"></i>
                <span>Open to internships &amp; collaborations</span>
              </li>
            </ul>
            <a href="mailto:manoj.332211.1@gmail.com" className="btn btn-primary btn-contact">
              <i className="fa-solid fa-paper-plane"></i> Send an Email
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
