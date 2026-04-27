export default function Footer() {
  return (
    <footer id="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <span className="logo-bracket">&lt;</span>MA<span className="logo-bracket"> /&gt;</span>
          </div>
          <p className="footer-text">
            Designed &amp; Built by <strong>Manoj Ahire</strong> · © 2026
          </p>
          <div className="footer-socials">
            <a href="https://github.com/ManojAhire" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><i className="fa-brands fa-github"></i></a>
            <a href="#" aria-label="LinkedIn"><i className="fa-brands fa-linkedin-in"></i></a>
            <a href="https://www.instagram.com/the_manojahire/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><i className="fa-brands fa-instagram"></i></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
