import { useEffect, useRef } from 'react';

const POOL_PARTICULAS = 48;

export default function CustomCursor() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const mouse = { x: -100, y: -100 };
    const anillo = { x: -100, y: -100 };
    const ultima = { x: -100, y: -100 };
    let estado = null;
    let visible = false;

    const particulas = Array.from({ length: POOL_PARTICULAS }, () => ({
      vida: 0,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      tamano: 1,
      roja: false,
    }));

    const ajustar = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (!visible) {
        visible = true;
        anillo.x = mouse.x;
        anillo.y = mouse.y;
        ultima.x = mouse.x;
        ultima.y = mouse.y;
      }
      if (reduceMotion) return;

      const dx = mouse.x - ultima.x;
      const dy = mouse.y - ultima.y;
      const velocidad = Math.hypot(dx, dy);

      if (velocidad > 5) {
        const cantidad = Math.min(Math.floor(velocidad / 9) + 1, 3);
        for (let i = 0; i < cantidad; i++) {
          const part = particulas.find((q) => q.vida <= 0);
          if (!part) break;
          part.x = mouse.x + (Math.random() - 0.5) * 4;
          part.y = mouse.y + (Math.random() - 0.5) * 4;
          part.vx = -dx * 0.05 + (Math.random() - 0.5) * 0.6;
          part.vy = -dy * 0.05 + (Math.random() - 0.5) * 0.6;
          part.tamano = Math.random() * 1.6 + 0.6;
          part.roja = Math.random() < 0.35;
          part.vida = 1;
        }
      }
      ultima.x = mouse.x;
      ultima.y = mouse.y;
    };

    const onOver = (e) => {
      const t = e.target;
      if (!(t instanceof Element)) {
        estado = null;
        return;
      }
      if (t.closest('[data-cursor="encuadre"]')) {
        estado = 'encuadre';
      } else if (t.closest('a, button')) {
        estado = 'link';
      } else {
        estado = null;
      }
    };

    ajustar();
    document.addEventListener('pointermove', onMove);
    document.addEventListener('pointerover', onOver);
    window.addEventListener('resize', ajustar);

    let animacionId = 0;
    let previo = performance.now();

    const dibujarEncuadre = (x, y, r) => {
      const brazo = r * 0.42;
      ctx.strokeStyle = 'rgba(224, 82, 82, 0.95)';
      ctx.lineWidth = 1.5;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(x - r + brazo, y - r);
      ctx.lineTo(x - r, y - r);
      ctx.lineTo(x - r, y - r + brazo);
      ctx.moveTo(x + r - brazo, y - r);
      ctx.lineTo(x + r, y - r);
      ctx.lineTo(x + r, y - r + brazo);
      ctx.moveTo(x - r + brazo, y + r);
      ctx.lineTo(x - r, y + r);
      ctx.lineTo(x - r, y + r - brazo);
      ctx.moveTo(x + r - brazo, y + r);
      ctx.lineTo(x + r, y + r);
      ctx.lineTo(x + r, y + r - brazo);
      ctx.stroke();
    };

    const loop = (now) => {
      const dt = Math.min((now - previo) / 16.7, 3);
      previo = now;

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      if (visible) {
        for (const q of particulas) {
          if (q.vida <= 0) continue;
          q.vida -= 0.03 * dt;
          q.x += q.vx * dt;
          q.y += q.vy * dt;
          const alpha = Math.max(q.vida, 0) * 0.7;
          ctx.beginPath();
          ctx.arc(q.x, q.y, q.tamano, 0, Math.PI * 2);
          ctx.fillStyle = q.roja
            ? `rgba(224, 120, 120, ${alpha})`
            : `rgba(231, 216, 200, ${alpha * 0.8})`;
          ctx.fill();
        }

        const factor = Math.min(0.22 * dt, 1);
        anillo.x += (mouse.x - anillo.x) * factor;
        anillo.y += (mouse.y - anillo.y) * factor;

        let radioAnillo = 13;
        let colorAnillo = '231, 216, 200';
        let alphaAnillo = 0.55;

        if (estado === 'link') {
          radioAnillo = 21;
          colorAnillo = '224, 82, 82';
          alphaAnillo = 0.9;
        }

        if (estado === 'encuadre') {
          dibujarEncuadre(anillo.x, anillo.y, 24);
        } else {
          ctx.beginPath();
          ctx.arc(anillo.x, anillo.y, radioAnillo, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(${colorAnillo}, ${alphaAnillo})`;
          ctx.lineWidth = 1.25;
          ctx.stroke();
        }

        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(224, 82, 82, 0.95)';
        ctx.fill();
      }

      animacionId = requestAnimationFrame(loop);
    };

    animacionId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animacionId);
      document.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onOver);
      window.removeEventListener('resize', ajustar);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-40"
    />
  );
}
