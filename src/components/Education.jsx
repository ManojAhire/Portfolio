import { useEffect, useRef } from 'react';

export default function Education() {
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
    <section id="education" className="section" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title animate-on-scroll">
          <i className="fa-solid fa-graduation-cap"></i> Education &amp; Achievements
        </h2>

        <div className="timeline animate-on-scroll">
          <div className="timeline-item">
            <div className="timeline-dot">
              <i className="fa-solid fa-flag-checkered"></i>
            </div>
            <div className="timeline-content glass-card">
              <span className="timeline-date">
                <i className="fa-regular fa-calendar"></i> August 2025
              </span>
              <h3>BTech Journey Begins</h3>
              <p className="timeline-degree">Newton School of Technology</p>
              <p className="timeline-detail">
                Started my BTech journey. Participated in the <strong>Impact India Hackathon</strong> (a college hackathon) and proudly secured a spot in the <strong>Top 10 Teams</strong>!
              </p>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-dot">
              <i className="fa-solid fa-laptop-code"></i>
            </div>
            <div className="timeline-content glass-card">
              <span className="timeline-date">
                <i className="fa-solid fa-code-branch"></i> Next
              </span>
              <h3>Skill Building</h3>
              <p className="timeline-detail">
                Dived deep into learning core technologies. Focused on <strong>Problem Solving with Python</strong>, mastering <strong>HTML &amp; CSS</strong>, and getting comfortable with <strong>CLI commands</strong>.
              </p>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-dot">
              <i className="fa-solid fa-trophy"></i>
            </div>
            <div className="timeline-content glass-card">
              <span className="timeline-date">
                <i className="fa-regular fa-calendar"></i> 2026
              </span>
              <h3>24-Hour Hackathon</h3>
              <p className="timeline-detail">
                Successfully participated in an intensive 24-hour coding hackathon, building real-world solutions under time pressure.
              </p>
              <a href="/CertificateOfParticiation.pdf" target="_blank" rel="noopener noreferrer" className="btn btn-outline" style={{ marginTop: '15px', display: 'inline-block' }}>
                <i className="fa-solid fa-file-pdf"></i> View Certificate
              </a>
            </div>
          </div>

          <div className="timeline-item">
            <div className="timeline-dot">
              <i className="fa-solid fa-brain"></i>
            </div>
            <div className="timeline-content glass-card">
              <span className="timeline-date">
                <i className="fa-solid fa-bolt"></i> Present
              </span>
              <h3>Continuous Learning</h3>
              <p className="timeline-detail">
                Currently building dynamic web apps with <strong>JavaScript</strong>, <strong>React</strong>, and <strong>TailwindCSS</strong>, while diving deep into advanced concepts like <strong>DSA, Linked Lists, and Trees</strong>.
              </p>
            </div>
          </div>

          <div className="timeline-item timeline-future">
            <div className="timeline-dot">
              <i className="fa-solid fa-plus"></i>
            </div>
            <div className="timeline-content glass-card">
              <span className="timeline-date"><i className="fa-regular fa-clock"></i> Future</span>
              <h3>More to Come…</h3>
              <p className="timeline-detail">The journey continues! New certifications, courses, and achievements will appear here.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
