'use client';
import { useEffect, useRef } from 'react';

export default function Particles() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let w, h, raf;
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    const dots = [];
    const N = 60;

    const resize = () => {
      w = canvas.width = window.innerWidth * DPR;
      h = canvas.height = window.innerHeight * DPR;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
    };

    const init = () => {
      dots.length = 0;
      for (let i = 0; i < N; i++) {
        dots.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: (Math.random() * 1.2 + 0.2) * DPR,
          vx: (Math.random() - 0.5) * 0.15 * DPR,
          vy: (Math.random() - 0.5) * 0.15 * DPR,
          o: Math.random() * 0.4 + 0.1
        });
      }
    };

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (const d of dots) {
        d.x += d.vx; d.y += d.vy;
        if (d.x < 0 || d.x > w) d.vx *= -1;
        if (d.y < 0 || d.y > h) d.vy *= -1;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${d.o})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };

    resize(); init(); tick();
    window.addEventListener('resize', () => { resize(); init(); });
    return () => cancelAnimationFrame(raf);
  }, []);
  return <canvas ref={ref} className="fixed inset-0 z-0 pointer-events-none" />;
}
