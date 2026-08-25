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
      velocidadDrift: Math.random() * 0.08 + 0.02,
      roja: esRoja,
    });
  }
  return estrellas;
}

export default function Starfield({ velocityMultiplierRef }) {
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

    const dibujarEstrellaLejana = (mult) => {
      const cx = window.innerWidth * 0.85;
      const cy = window.innerHeight * 0.18;
      const radioBase = Math.max(window.innerWidth, window.innerHeight) * 0.38;
      const escala = 1 + (mult - 1) * 0.025;
      const radio = radioBase * escala;

      const halo = ctx.createRadialGradient(cx, cy, 0, cx, cy, radio);
      const intensidad = Math.min(0.16 + (mult - 1) * 0.008, 0.4);
      halo.addColorStop(0, `rgba(224, 82, 82, ${intensidad})`);
      halo.addColorStop(0.25, `rgba(184, 50, 60, ${intensidad * 0.44})`);
      halo.addColorStop(0.6, `rgba(110, 31, 38, ${intensidad * 0.19})`);
      halo.addColorStop(1, 'rgba(110, 31, 38, 0)');
      ctx.fillStyle = halo;
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

      const freqPulso = 0.8 + (mult - 1) * 0.15;
      const pulso = reduceMotion ? 1 : 1 + Math.sin(tiempo * freqPulso) * 0.12;

      const radioNucleo = (3 + mult * 0.5) * pulso;
      ctx.beginPath();
      ctx.arc(cx, cy, radioNucleo, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(240, 150, 150, ${0.55 * pulso})`;
      ctx.fill();

      const radioBrillo = 1.2 + mult * 0.15;
      ctx.beginPath();
      ctx.arc(cx, cy, radioBrillo, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 220, 215, 0.95)';
      ctx.fill();
    };

    const dibujar = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const mult = velocityMultiplierRef.current;

      ctx.fillStyle = `rgba(9, 7, 8, ${mult > 3 ? 0.25 : 0.4})`;
      ctx.fillRect(0, 0, w, h);
      tiempo += 0.016;

      dibujarEstrellaLejana(mult);

      for (const e of estrellas) {
        const parpadeo = reduceMotion
          ? e.brilloBase
          : e.brilloBase + Math.sin(tiempo * 1.5 + e.faseTwinkle) * 0.25;
        const alpha = Math.max(parpadeo, 0.05);

        const drawAlpha = e.roja ? alpha : alpha * 0.85;
        const color = e.roja ? '224, 140, 140' : '231, 216, 200';

        if (!reduceMotion && mult > 3) {
          const longitud = Math.min(mult * 4, 60);
          const gradiente = ctx.createLinearGradient(e.x, e.y, e.x, e.y + longitud);
          gradiente.addColorStop(0, `rgba(${color}, ${drawAlpha})`);
          gradiente.addColorStop(1, `rgba(${color}, 0)`);
          ctx.beginPath();
          ctx.moveTo(e.x, e.y);
          ctx.lineTo(e.x, e.y + longitud);
          ctx.strokeStyle = gradiente;
          ctx.lineWidth = e.radio * 0.8;
          ctx.stroke();
        } else {
          ctx.beginPath();
          ctx.arc(e.x, e.y, e.radio, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${color}, ${drawAlpha})`;
          ctx.fill();
        }

        if (!reduceMotion) {
          e.y -= e.velocidadDrift * mult;
          if (e.y < -60) {
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
