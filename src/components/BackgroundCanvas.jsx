import { useEffect, useRef } from 'react';

export default function BackgroundCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = document.documentElement.scrollHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const themeColors = [
      { r: 120, g: 50, b: 200 },   // purple
      { r: 6, g: 182, b: 212 },    // cyan
      { r: 80, g: 20, b: 160 }     // deep violet
    ];

    const blobs = [];
    const blobCount = 5;
    for (let i = 0; i < blobCount; i++) {
      blobs.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * document.documentElement.scrollHeight,
        radius: 250 + Math.random() * 200,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        color: themeColors[i % themeColors.length],
        phase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.002 + Math.random() * 0.003
      });
    }

    const snake = {
      points: [],
      segmentCount: 120,
      colorIndex: 0,
      colorProgress: 0,
      direction: 1,
      headY: 0,
      speed: 0.6,
      time: 0,
      waveAmplitude: 180,
      waveFrequency: 0.008,
      trailWidth: 60
    };

    for (let i = 0; i < snake.segmentCount; i++) {
      snake.points.push({ x: window.innerWidth / 2, y: -i * 4 });
    }

    function lerpColor(c1, c2, t) {
      return {
        r: Math.round(c1.r + (c2.r - c1.r) * t),
        g: Math.round(c1.g + (c2.g - c1.g) * t),
        b: Math.round(c1.b + (c2.b - c1.b) * t)
      };
    }

    let animationFrameId;

    function animate() {
      if (!canvas) return;
      const totalH = document.documentElement.scrollHeight;
      if (canvas.height !== totalH || canvas.width !== window.innerWidth) {
        canvas.width = window.innerWidth;
        canvas.height = totalH;
      }

      ctx.fillStyle = '#0a0a0f';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const now = Date.now();

      // Fluid Blobs
      for (let i = 0; i < blobs.length; i++) {
        const b = blobs[i];
        b.x += b.vx;
        b.y += b.vy;

        if (b.x < -b.radius) b.x = canvas.width + b.radius;
        if (b.x > canvas.width + b.radius) b.x = -b.radius;
        if (b.y < -b.radius) b.y = canvas.height + b.radius;
        if (b.y > canvas.height + b.radius) b.y = -b.radius;

        const pulse = Math.sin(now * b.pulseSpeed + b.phase) * 30;
        const r = b.radius + pulse;

        const grad = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, r);
        grad.addColorStop(0, `rgba(${b.color.r},${b.color.g},${b.color.b}, 0.10)`);
        grad.addColorStop(0.5, `rgba(${b.color.r},${b.color.g},${b.color.b}, 0.04)`);
        grad.addColorStop(1, `rgba(${b.color.r},${b.color.g},${b.color.b}, 0)`);

        ctx.beginPath();
        ctx.arc(b.x, b.y, r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      // Snake Trail
      snake.time += 1;
      snake.headY += snake.speed * snake.direction;

      if (snake.headY > totalH + 100) {
        snake.direction = -1;
        snake.colorIndex = (snake.colorIndex + 1) % themeColors.length;
        snake.colorProgress = 0;
      } else if (snake.headY < -100) {
        snake.direction = 1;
        snake.colorIndex = (snake.colorIndex + 1) % themeColors.length;
        snake.colorProgress = 0;
      }

      snake.colorProgress += 0.001;
      if (snake.colorProgress > 1) snake.colorProgress = 1;

      const currentColor = themeColors[snake.colorIndex];
      const nextColor = themeColors[(snake.colorIndex + 1) % themeColors.length];
      const snakeColor = lerpColor(currentColor, nextColor, snake.colorProgress);

      const headX = canvas.width / 2 + Math.sin(snake.time * snake.waveFrequency) * snake.waveAmplitude;

      for (let i = snake.points.length - 1; i > 0; i--) {
        snake.points[i].x = snake.points[i - 1].x;
        snake.points[i].y = snake.points[i - 1].y;
      }
      snake.points[0].x = headX;
      snake.points[0].y = snake.headY;

      for (let i = 0; i < snake.points.length; i++) {
        const p = snake.points[i];
        const t = i / snake.points.length;
        const alpha = (1 - t) * 0.18;
        const radius = (1 - t) * snake.trailWidth;

        if (radius < 2) continue;

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius);
        grad.addColorStop(0, `rgba(${snakeColor.r},${snakeColor.g},${snakeColor.b},${alpha})`);
        grad.addColorStop(0.4, `rgba(${snakeColor.r},${snakeColor.g},${snakeColor.b},${alpha * 0.4})`);
        grad.addColorStop(1, `rgba(${snakeColor.r},${snakeColor.g},${snakeColor.b}, 0)`);

        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }

      const coreGrad = ctx.createRadialGradient(snake.points[0].x, snake.points[0].y, 0, snake.points[0].x, snake.points[0].y, 20);
      coreGrad.addColorStop(0, `rgba(${snakeColor.r},${snakeColor.g},${snakeColor.b}, 0.35)`);
      coreGrad.addColorStop(0.5, `rgba(${snakeColor.r},${snakeColor.g},${snakeColor.b}, 0.12)`);
      coreGrad.addColorStop(1, `rgba(${snakeColor.r},${snakeColor.g},${snakeColor.b}, 0)`);
      
      ctx.beginPath();
      ctx.arc(snake.points[0].x, snake.points[0].y, 20, 0, Math.PI * 2);
      ctx.fillStyle = coreGrad;
      ctx.fill();

      animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas id="bgCanvas" ref={canvasRef}></canvas>;
}
