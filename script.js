/* ═══════════════════════════════════════════════════════
   MANOJ AHIRE — PORTFOLIO JS
   Fluid Background + Snake Trail · Navigation · Typewriter
   ═══════════════════════════════════════════════════════ */

// ─── Unified Dark Fluid + Snake Trail Background ──────
(function () {
  var canvas = document.getElementById('bgCanvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = document.documentElement.scrollHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // ─── Theme colors (3 colors) ───
  var themeColors = [
    { r: 120, g: 50, b: 200 },   // purple
    { r: 6, g: 182, b: 212 },  // cyan
    { r: 80, g: 20, b: 160 }    // deep violet
  ];

  // ─── Fluid Blobs (ambient) ───
  var blobs = [];
  var blobCount = 5;

  for (var i = 0; i < blobCount; i++) {
    blobs.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: 250 + Math.random() * 200,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      color: themeColors[i % themeColors.length],
      phase: Math.random() * Math.PI * 2,
      pulseSpeed: 0.002 + Math.random() * 0.003
    });
  }

  // ─── Snake Trail ───
  // The snake is a series of connected points that slither in S-curves
  var snake = {
    points: [],
    segmentCount: 120,       // number of trail points
    colorIndex: 0,           // current theme color index
    colorProgress: 0,        // 0–1 lerp between current and next color
    direction: 1,            // 1 = going down, -1 = going up
    headY: 0,                // vertical position of the head
    speed: 0.6,              // pixels per frame vertical speed
    time: 0,                 // time counter for wave motion
    waveAmplitude: 180,      // horizontal wave amplitude
    waveFrequency: 0.008,    // how tight the S-curves are
    trailWidth: 60           // max glow width
  };

  // Initialize snake points at top
  for (var i = 0; i < snake.segmentCount; i++) {
    snake.points.push({
      x: canvas.width / 2,
      y: -i * 4
    });
  }

  function lerpColor(c1, c2, t) {
    return {
      r: Math.round(c1.r + (c2.r - c1.r) * t),
      g: Math.round(c1.g + (c2.g - c1.g) * t),
      b: Math.round(c1.b + (c2.b - c1.b) * t)
    };
  }

  function animate() {
    // Recalculate height in case content changes
    var totalH = document.documentElement.scrollHeight;
    if (canvas.height !== totalH || canvas.width !== window.innerWidth) {
      canvas.width = window.innerWidth;
      canvas.height = totalH;
    }

    // Clear
    ctx.fillStyle = '#0a0a0f';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    var now = Date.now();

    // ─── Draw Fluid Blobs ───
    for (var i = 0; i < blobs.length; i++) {
      var b = blobs[i];
      b.x += b.vx;
      b.y += b.vy;

      // Wrap around
      if (b.x < -b.radius) b.x = canvas.width + b.radius;
      if (b.x > canvas.width + b.radius) b.x = -b.radius;
      if (b.y < -b.radius) b.y = canvas.height + b.radius;
      if (b.y > canvas.height + b.radius) b.y = -b.radius;

      var pulse = Math.sin(now * b.pulseSpeed + b.phase) * 30;
      var r = b.radius + pulse;

      var grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, r);
      grad.addColorStop(0, 'rgba(' + b.color.r + ',' + b.color.g + ',' + b.color.b + ', 0.10)');
      grad.addColorStop(0.5, 'rgba(' + b.color.r + ',' + b.color.g + ',' + b.color.b + ', 0.04)');
      grad.addColorStop(1, 'rgba(' + b.color.r + ',' + b.color.g + ',' + b.color.b + ', 0)');

      ctx.beginPath();
      ctx.arc(b.x, b.y, r, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
    }

    // ─── Update & Draw Snake Trail ───
    snake.time += 1;

    // Move head
    snake.headY += snake.speed * snake.direction;

    // Reverse direction at top/bottom
    if (snake.headY > totalH + 100) {
      snake.direction = -1;
      // Cycle to next color
      snake.colorIndex = (snake.colorIndex + 1) % themeColors.length;
      snake.colorProgress = 0;
    } else if (snake.headY < -100) {
      snake.direction = 1;
      snake.colorIndex = (snake.colorIndex + 1) % themeColors.length;
      snake.colorProgress = 0;
    }

    // Color lerp toward the next color
    snake.colorProgress += 0.001;
    if (snake.colorProgress > 1) snake.colorProgress = 1;

    var currentColor = themeColors[snake.colorIndex];
    var nextColor = themeColors[(snake.colorIndex + 1) % themeColors.length];
    var snakeColor = lerpColor(currentColor, nextColor, snake.colorProgress);

    // Update head x-position (sinusoidal S-curve movement)
    var headX = canvas.width / 2 + Math.sin(snake.time * snake.waveFrequency) * snake.waveAmplitude;

    // Shift all points: newest at front
    for (var i = snake.points.length - 1; i > 0; i--) {
      snake.points[i].x = snake.points[i - 1].x;
      snake.points[i].y = snake.points[i - 1].y;
    }
    snake.points[0].x = headX;
    snake.points[0].y = snake.headY;

    // Draw the snake trail
    for (var i = 0; i < snake.points.length; i++) {
      var p = snake.points[i];
      var t = i / snake.points.length; // 0 at head, 1 at tail
      var alpha = (1 - t) * 0.18;     // fades toward tail
      var radius = (1 - t) * snake.trailWidth;

      if (radius < 2) continue;

      var grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius);
      grad.addColorStop(0, 'rgba(' + snakeColor.r + ',' + snakeColor.g + ',' + snakeColor.b + ',' + alpha + ')');
      grad.addColorStop(0.4, 'rgba(' + snakeColor.r + ',' + snakeColor.g + ',' + snakeColor.b + ',' + (alpha * 0.4) + ')');
      grad.addColorStop(1, 'rgba(' + snakeColor.r + ',' + snakeColor.g + ',' + snakeColor.b + ', 0)');

      ctx.beginPath();
      ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();
    }

    // Draw a brighter core at the head
    var coreGrad = ctx.createRadialGradient(snake.points[0].x, snake.points[0].y, 0, snake.points[0].x, snake.points[0].y, 20);
    coreGrad.addColorStop(0, 'rgba(' + snakeColor.r + ',' + snakeColor.g + ',' + snakeColor.b + ', 0.35)');
    coreGrad.addColorStop(0.5, 'rgba(' + snakeColor.r + ',' + snakeColor.g + ',' + snakeColor.b + ', 0.12)');
    coreGrad.addColorStop(1, 'rgba(' + snakeColor.r + ',' + snakeColor.g + ',' + snakeColor.b + ', 0)');
    ctx.beginPath();
    ctx.arc(snake.points[0].x, snake.points[0].y, 20, 0, Math.PI * 2);
    ctx.fillStyle = coreGrad;
    ctx.fill();

    requestAnimationFrame(animate);
  }

  animate();
})();


document.addEventListener('DOMContentLoaded', function () {

  // ─── Mobile Navigation Toggle ───────────────────────
  var hamburger = document.getElementById('hamburger');
  var navLinks = document.getElementById('navLinks');

  hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Close mobile nav when a link is clicked
  var navItems = navLinks.querySelectorAll('a');
  for (var i = 0; i < navItems.length; i++) {
    navItems[i].addEventListener('click', function () {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    });
  }

  // ─── Navbar Scroll Effect ──────────────────────────
  var navbar = document.getElementById('navbar');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // ─── Active Nav Link Highlight ─────────────────────
  var sections = document.querySelectorAll('section[id]');

  function highlightNav() {
    var scrollY = window.scrollY + 120;

    for (var i = 0; i < sections.length; i++) {
      var section = sections[i];
      var top = section.offsetTop;
      var height = section.offsetHeight;
      var id = section.getAttribute('id');
      var link = document.querySelector('.nav-links a[href="#' + id + '"]');

      if (link) {
        if (scrollY >= top && scrollY < top + height) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      }
    }
  }

  window.addEventListener('scroll', highlightNav);
  highlightNav();

  // ─── Scroll Animations (IntersectionObserver) ──────
  var animateElements = document.querySelectorAll('.animate-on-scroll');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      for (var i = 0; i < entries.length; i++) {
        if (entries[i].isIntersecting) {
          entries[i].target.classList.add('visible');

          // Animate skill bars inside this element
          var bars = entries[i].target.querySelectorAll('.skill-bar');
          for (var j = 0; j < bars.length; j++) {
            bars[j].classList.add('animate');
          }
        }
      }
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    for (var i = 0; i < animateElements.length; i++) {
      observer.observe(animateElements[i]);
    }
  } else {
    // Fallback: show everything immediately
    for (var i = 0; i < animateElements.length; i++) {
      animateElements[i].classList.add('visible');
    }
    var allBars = document.querySelectorAll('.skill-bar');
    for (var i = 0; i < allBars.length; i++) {
      allBars[i].classList.add('animate');
    }
  }

  // ─── Typewriter Effect ─────────────────────────────
  var typewriterEl = document.getElementById('typewriter');
  var phrases = [
    'Aspiring Developer',
    'Python Problem Solver',
    'Web Dev Learner',
    'Golang Explorer',
    'AI & ML Enthusiast'
  ];
  var phraseIndex = 0;
  var charIndex = 0;
  var isDeleting = false;
  var typeSpeed = 80;

  function typewrite() {
    var current = phrases[phraseIndex];

    if (isDeleting) {
      typewriterEl.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 40;
    } else {
      typewriterEl.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 80;
    }

    if (!isDeleting && charIndex === current.length) {
      typeSpeed = 2000; // pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typeSpeed = 400; // pause before next word
    }

    setTimeout(typewrite, typeSpeed);
  }

  typewrite();

});
