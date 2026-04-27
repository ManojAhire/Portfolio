import { useEffect, useRef } from 'react';

export default function Skills() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            const bars = entry.target.querySelectorAll('.skill-bar');
            bars.forEach((bar) => bar.classList.add('animate'));
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
    <section id="skills" className="section" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title animate-on-scroll">
          <i className="fa-solid fa-wand-magic-sparkles"></i> Skills &amp; Technologies
        </h2>
        <p className="section-subtitle animate-on-scroll">Technologies I've been learning and working with</p>

        <div className="skills-grid animate-on-scroll" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
          
          {/* React (New) */}
          <div className="skill-card glass-card">
            <div className="skill-icon" style={{ '--accent': '#61DAFB' }}>
              <i className="fa-brands fa-react"></i>
            </div>
            <h3>React</h3>
            <p>Component-based UI</p>
            <div className="skill-level">
              <div className="skill-bar" style={{ '--fill': '65%' }}></div>
            </div>
          </div>

          {/* TailwindCSS (New) */}
          <div className="skill-card glass-card">
            <div className="skill-icon" style={{ '--accent': '#38B2AC' }}>
              <i className="fa-solid fa-wind"></i>
            </div>
            <h3>TailwindCSS</h3>
            <p>Utility-first styling</p>
            <div className="skill-level">
              <div className="skill-bar" style={{ '--fill': '60%' }}></div>
            </div>
          </div>

          {/* Python */}
          <div className="skill-card glass-card">
            <div className="skill-icon" style={{ '--accent': '#3776AB' }}>
              <i className="fa-brands fa-python"></i>
            </div>
            <h3>Python</h3>
            <p>Problem Solving</p>
            <div className="skill-level">
              <div className="skill-bar" style={{ '--fill': '60%' }}></div>
            </div>
          </div>

          {/* DSA (New) */}
          <div className="skill-card glass-card">
            <div className="skill-icon" style={{ '--accent': '#E74C3C' }}>
              <i className="fa-solid fa-network-wired"></i>
            </div>
            <h3>DSA</h3>
            <p>Linked Lists, Trees</p>
            <div className="skill-level">
              <div className="skill-bar" style={{ '--fill': '55%' }}></div>
            </div>
          </div>

          {/* HTML */}
          <div className="skill-card glass-card">
            <div className="skill-icon" style={{ '--accent': '#E34F26' }}>
              <i className="fa-brands fa-html5"></i>
            </div>
            <h3>HTML5</h3>
            <p>Semantic Markup</p>
            <div className="skill-level">
              <div className="skill-bar" style={{ '--fill': '70%' }}></div>
            </div>
          </div>

          {/* CSS */}
          <div className="skill-card glass-card">
            <div className="skill-icon" style={{ '--accent': '#1572B6' }}>
              <i className="fa-brands fa-css3-alt"></i>
            </div>
            <h3>CSS3</h3>
            <p>Styling &amp; Layouts</p>
            <div className="skill-level">
              <div className="skill-bar" style={{ '--fill': '65%' }}></div>
            </div>
          </div>

          {/* JavaScript */}
          <div className="skill-card glass-card">
            <div className="skill-icon" style={{ '--accent': '#F7DF1E' }}>
              <i className="fa-brands fa-js"></i>
            </div>
            <h3>JavaScript</h3>
            <p>DOM &amp; Logic</p>
            <div className="skill-level">
              <div className="skill-bar" style={{ '--fill': '50%' }}></div>
            </div>
          </div>

          {/* Golang */}
          <div className="skill-card glass-card">
            <div className="skill-icon" style={{ '--accent': '#00ADD8' }}>
              <i className="fa-brands fa-golang"></i>
            </div>
            <h3>Golang</h3>
            <p>Systems &amp; Backend</p>
            <div className="skill-level">
              <div className="skill-bar" style={{ '--fill': '40%' }}></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
