import { useEffect, useRef } from 'react';

export default function Projects() {
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

  const projectList = [
    {
      title: 'Pustak Notepad',
      icon: 'fa-book-open',
      iconColor: '#cba6f7',
      desc: 'A modern, feature-rich desktop text editor built with Python & Tkinter. Supports multi-tab editing, find & replace, line numbers, and a dark theme.',
      tags: ['Python', 'Tkinter', 'Desktop App'],
      img: '/pustak-notepad-preview.png',
      link: 'https://github.com/ManojAhire/simple-text-editor',
      linkText: 'View Source'
    },
    {
      title: 'Plant Disease Project',
      icon: 'fa-leaf',
      iconColor: '#4ade80',
      desc: 'An intelligent system designed to detect and identify plant diseases efficiently.',
      tags: ['React', 'Web App', 'AI'],
      link: 'https://plant-disease-project.vercel.app/',
      linkText: 'Live Demo'
    },
    {
      title: 'Time Management Tips',
      icon: 'fa-clock',
      iconColor: '#60a5fa',
      desc: 'A productive hub providing valuable tips and techniques for better time management.',
      tags: ['React', 'Productivity'],
      link: 'https://time-management-tips.vercel.app/',
      linkText: 'Live Demo'
    },
    {
      title: 'Bugatti Chiron Website',
      icon: 'fa-car',
      iconColor: '#f87171',
      desc: 'An amazing car website featuring the Bugatti Chiron. Created with vibe coding for the Fundamentals of AI subject.',
      tags: ['React', 'Vibe Coding', 'AI Subject'],
      link: 'https://car-website-blond.vercel.app/',
      linkText: 'Live Demo'
    },
    {
      title: 'AI Trading Browser',
      icon: 'fa-chart-line',
      iconColor: '#fbbf24',
      desc: 'A dummy website concept for an AI-powered trading browser built using vibe coding.',
      tags: ['React', 'Vibe Coding', 'Finance'],
      link: 'https://atb-ai-trading-browser.vercel.app/',
      linkText: 'Live Demo'
    },
    {
      title: 'API Playground',
      icon: 'fa-server',
      iconColor: '#a78bfa',
      desc: 'A public API playground interface for testing and exploring various endpoints.',
      tags: ['React', 'API', 'Tools'],
      link: 'https://api-playground-gamma.vercel.app/',
      linkText: 'Live Demo'
    },
    {
      title: 'Rock Paper Scissors',
      icon: 'fa-hand-scissors',
      iconColor: '#f472b6',
      desc: 'My basic first React project: a fully functional Rock Paper Scissors game.',
      tags: ['React', 'Game', 'First Project'],
      link: 'https://rps-game2-nine.vercel.app/',
      linkText: 'Live Demo'
    },
    {
      title: 'Text-to-Image App',
      icon: 'fa-image',
      iconColor: '#2dd4bf',
      desc: 'A web application that generates images from text prompts using AI models.',
      tags: ['React', 'Generative AI', 'API'],
      link: 'https://text-to-image-app-eight.vercel.app/',
      linkText: 'Live Demo'
    },
    {
      title: 'Meal Master Smart Recipe',
      icon: 'fa-utensils',
      iconColor: '#fb923c',
      desc: 'A smart recipe finder application developed as a school project.',
      tags: ['React', 'School Project', 'API'],
      link: 'https://meal-master-smart-recipe-finder.vercel.app/',
      linkText: 'Live Demo'
    },
    {
      title: 'React Chatbot',
      icon: 'fa-robot',
      iconColor: '#94a3b8',
      desc: 'My first React chatbot. Note: Hugging Face API is no longer valid so it is currently not responding.',
      tags: ['React', 'Chatbot', 'Archived'],
      link: 'https://lec-react-tau.vercel.app/',
      linkText: 'Live Demo'
    }
  ];

  return (
    <section id="projects" className="section" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title animate-on-scroll">
          <i className="fa-solid fa-diagram-project"></i> Projects
        </h2>
        <p className="section-subtitle animate-on-scroll">Real projects I've built — from idea to implementation.</p>

        <div className="projects-grid animate-on-scroll">
          {projectList.map((proj, index) => (
            <div key={index} className="project-card glass-card featured-project">
              <div className="project-thumbnail" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.05)' }}>
                {proj.img ? (
                  <img src={proj.img} alt={proj.title} />
                ) : (
                  <i className={`fa-solid ${proj.icon}`} style={{ fontSize: '4rem', color: proj.iconColor }}></i>
                )}
              </div>
              <div className="project-info">
                <h3><i className={`fa-solid ${proj.icon}`} style={{ marginRight: '6px', color: proj.iconColor }}></i>{proj.title}</h3>
                <p className="project-desc">{proj.desc}</p>
                <div className="project-tags">
                  {proj.tags.map((tag, i) => (
                    <span key={i} className="tag">{tag}</span>
                  ))}
                </div>
                <div className="project-links">
                  <a href={proj.link} target="_blank" rel="noopener noreferrer" className="project-btn">
                    <i className={proj.linkText === 'View Source' ? 'fa-brands fa-github' : 'fa-solid fa-arrow-up-right-from-square'}></i> {proj.linkText}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
