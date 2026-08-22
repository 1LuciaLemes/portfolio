import { useEffect, useRef } from 'react';

function crearEstrellas(ancho, alto) {
  const densidad = Math.floor((ancho * alto) / 9000);
  const estrellas = [];
  for (let i = 0; i < densidad; i++) {
    const esRoja = Math.random() < 0.08;
    estrellas.push({
      x: Math.random() * ancho,
      y: Math.random() * alto,
      radio: Math.random() * 1.4 + 0.2,
      brilloBase: Math.random() * 0.5 + 0.3,
      faseTwinkle: Math.random() * Math.PI * 2,
      velocidadDrift: Math.random() * 0.02 + 0.005,
      roja: esRoja,
    });
  }
  return estrellas;
}

export default function Starfield() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let estrellas = [];
    let animacionId = 0;
    let tiempo = 0;

    const ajustar = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      estrellas = crearEstrellas(window.innerWidth, window.innerHeight);
    };

    const dibujarEstrellaLejana = () => {
      const cx = window.innerWidth * 0.85;
      const cy = window.innerHeight * 0.18;
      const radio = Math.max(window.innerWidth, window.innerHeight) * 0.38;

      const halo = ctx.createRadialGradient(cx, cy, 0, cx, cy, radio);
      halo.addColorStop(0, 'rgba(224, 82, 82, 0.16)');
      halo.addColorStop(0.25, 'rgba(184, 50, 60, 0.07)');
      halo.addColorStop(0.6, 'rgba(110, 31, 38, 0.03)');
      halo.addColorStop(1, 'rgba(110, 31, 38, 0)');
      ctx.fillStyle = halo;
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      const pulso = reduceMotion ? 1 : 1 + Math.sin(tiempo * 0.8) * 0.12;

      ctx.beginPath();
      ctx.arc(cx, cy, 5 * pulso, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(240, 150, 150, ${0.55 * pulso})`;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(cx, cy, 1.8, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 220, 215, 0.95)';
      ctx.fill();
    };

    const dibujar = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);
      tiempo += 0.016;

      dibujarEstrellaLejana();

      for (const e of estrellas) {
        const parpadeo = reduceMotion
          ? e.brilloBase
          : e.brilloBase + Math.sin(tiempo * 1.5 + e.faseTwinkle) * 0.25;
        const alpha = Math.max(parpadeo, 0.05);

        ctx.beginPath();
        ctx.arc(e.x, e.y, e.radio, 0, Math.PI * 2);
        if (e.roja) {
          ctx.fillStyle = `rgba(224, 140, 140, ${alpha})`;
        } else {
          ctx.fillStyle = `rgba(231, 216, 200, ${alpha * 0.85})`;
        }
        ctx.fill();

        if (!reduceMotion) {
          e.y -= e.velocidadDrift;
          if (e.y < -2) {
            e.y = h + 2;
            e.x = Math.random() * w;
          }
        }
      }
    };

    const loop = () => {
      dibujar();
      animacionId = requestAnimationFrame(loop);
    };

    ajustar();

    if (reduceMotion) {
      dibujar();
    } else {
      loop();
    }

    const onResize = () => {
      ajustar();
      if (reduceMotion) dibujar();
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animacionId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
}
