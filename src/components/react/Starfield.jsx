import { useEffect, useRef } from 'react';

function crearEstrellas(ancho, alto) {
  const densidad = Math.floor((ancho * alto) / 9000);
  const estrellas = [];
  for (let i = 0; i < densidad; i++) {
    estrellas.push({
      x: Math.random() * ancho,
      y: Math.random() * alto,
      radio: Math.random() * 1.4 + 0.2,
      brilloBase: Math.random() * 0.5 + 0.3,
      faseTwinkle: Math.random() * Math.PI * 2,
      velocidadDrift: Math.random() * 0.02 + 0.005,
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

    const dibujar = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      tiempo += 0.016;

      for (const e of estrellas) {
        const parpadeo = reduceMotion
          ? e.brilloBase
          : e.brilloBase + Math.sin(tiempo * 1.5 + e.faseTwinkle) * 0.25;

        ctx.beginPath();
        ctx.arc(e.x, e.y, e.radio, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(248, 248, 255, ${Math.max(parpadeo, 0.05)})`;
        ctx.fill();

        if (!reduceMotion) {
          e.y -= e.velocidadDrift;
          if (e.y < -2) {
            e.y = window.innerHeight + 2;
            e.x = Math.random() * window.innerWidth;
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
