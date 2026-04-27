import { useEffect, useRef } from 'react';

export default function About() {
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
    <section id="about" className="section" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title animate-on-scroll">
          <i className="fa-solid fa-user"></i> About Me
        </h2>
        <div className="about-grid animate-on-scroll">
          <div className="about-card glass-card">
            <div className="about-avatar">
              <img src="/profile.jpg" alt="Manoj Ahire" className="about-photo" />
            </div>
            <div className="about-text">
              <p>
                Hi! I'm <strong>Manoj Ahire</strong>, a passionate and driven first-year
                <strong> BTech CSE (AI &amp; ML)</strong> student at
                <strong> Newton School of Technology</strong>, Pune, Maharashtra.
              </p>
              <p>
                I'm at the very beginning of my coding journey — and I'm excited about every step.
                I've been sharpening my problem-solving skills with <strong>Python</strong> and
                <strong> JavaScript</strong>, crafting web interfaces with <strong>HTML, CSS &amp; React</strong>,
                and exploring <strong>Golang</strong> for systems-level thinking.
              </p>
              <p>
                I believe in learning by building. This portfolio is my launchpad — and it will
                grow as I do. Every project I complete will find its home right here.
              </p>
            </div>
          </div>

          <div className="info-cards">
            <div className="info-card glass-card">
              <i className="fa-solid fa-location-dot"></i>
              <h3>Location</h3>
              <p>Pune, Maharashtra</p>
            </div>
            <div className="info-card glass-card">
              <i className="fa-solid fa-graduation-cap"></i>
              <h3>Studying</h3>
              <p>BTech CSE (AI &amp; ML)</p>
            </div>
            <div className="info-card glass-card">
              <i className="fa-solid fa-calendar-check"></i>
              <h3>Year</h3>
              <p>1st Year (Finishing 2nd Sem)</p>
            </div>
            <div className="info-card glass-card">
              <i className="fa-solid fa-bullseye"></i>
              <h3>Goal</h3>
              <p>Build &amp; Ship Real Projects</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
