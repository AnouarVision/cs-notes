import { useEffect, useRef } from "react";
import styles from "./HeroBackground.module.scss";

const GLYPHS = ["∑", "∀", "∃", "∈", "⊕", "λ", "0", "1", "∧", "∨", "→", "ℤ"];
const MOUSE_RADIUS = 160;

export default function HeroBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mouse = { x: -9999, y: -9999 };
    let particles = [];
    let width = 0;
    let height = 0;
    let frame = 0;
    let linkDistance = 130;
    let scale = 1;

    const primary = "#1ECC71";

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const compact = width < 600;
      linkDistance = compact ? 95 : 130;
      scale = compact ? 1.35 : 1;
      const speed = compact ? 0.6 : 0.35;
      const count = compact
        ? Math.min(48, Math.floor((width * height) / 5500))
        : Math.min(70, Math.floor((width * height) / 14000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        glyph: Math.random() < 0.35 ? GLYPHS[Math.floor(Math.random() * GLYPHS.length)] : null,
        size: 1.4 + Math.random() * 1.6,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < MOUSE_RADIUS && dist > 0) {
          const force = (1 - dist / MOUSE_RADIUS) * 0.6;
          p.x += (dx / dist) * force;
          p.y += (dy / dist) * force;
        }
      }

      ctx.lineWidth = 1;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < linkDistance) {
            ctx.globalAlpha = (1 - d / linkDistance) * (scale > 1 ? 0.6 : 0.35);
            ctx.strokeStyle = primary;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      ctx.fillStyle = primary;
      ctx.font = `${Math.round(16 * scale)}px 'Courier New', monospace`;
      for (const p of particles) {
        if (p.glyph) {
          ctx.globalAlpha = 0.65;
          ctx.fillText(p.glyph, p.x, p.y);
        } else {
          ctx.globalAlpha = 0.7;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * scale, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    };

    const loop = () => {
      draw();
      frame = requestAnimationFrame(loop);
    };

    const start = () => {
      cancelAnimationFrame(frame);
      if (reduceMotion.matches) draw();
      else loop();
    };

    const handleMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
    };
    const handleLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    const handleVisibility = () => {
      if (document.hidden) cancelAnimationFrame(frame);
      else start();
    };

    resize();
    start();

    const hero = canvas.parentElement;
    window.addEventListener("resize", resize);
    hero.addEventListener("pointermove", handleMove);
    hero.addEventListener("pointerleave", handleLeave);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      hero.removeEventListener("pointermove", handleMove);
      hero.removeEventListener("pointerleave", handleLeave);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
}
