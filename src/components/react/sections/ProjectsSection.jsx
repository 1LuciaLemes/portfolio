import { useCallback, useEffect, useRef, useState } from 'react';
import projects from '../../../data/projects.json';

const CANT = projects.length;

function EsqueletoCarrusel() {
  return (
    <div className="relative mx-auto mt-6 w-full max-w-xl" aria-hidden="true">
      <div className="relative h-80 overflow-hidden rounded-xl">
        <div className="absolute inset-0 animate-barrido bg-gradient-to-r from-transparent via-flare/10 to-transparent" />
      </div>
      <div className="mt-4 space-y-2">
        <div className="h-5 w-1/3 rounded bg-surface/60" />
        <div className="h-3 w-full rounded bg-surface/50" />
        <div className="h-3 w-5/6 rounded bg-surface/50" />
      </div>
    </div>
  );
}

function PlaceholderImagen({ titulo }) {
  return (
    <div
      className="flex h-full w-full items-center justify-center"
      style={{
        background:
          'radial-gradient(circle at 30% 20%, rgba(184,50,60,0.35), rgba(9,7,8,0.9) 70%), linear-gradient(160deg, rgba(110,31,39,0.6), rgba(9,7,8,0.95))',
      }}
    >
      <span className="px-4 text-center font-hud text-lg uppercase tracking-[0.2em] text-lumen/70">
        {titulo}
      </span>
    </div>
  );
}

export default function ProjectsSection() {
  const [cargando, setCargando] = useState(true);
  const [centro, setCentro] = useState(0);
  const inicioX = useRef(0);

  useEffect(() => {
    const t = window.setTimeout(() => setCargando(false), 600);
    return () => window.clearTimeout(t);
  }, []);

  const posicionDe = useCallback(
    (idx) => {
      const offset = (((idx - centro) % CANT) + CANT) % CANT;
      if (offset === 0) return 0;
      return offset === 1 ? 1 : -1;
    },
    [centro]
  );

  const avanzar = useCallback(() => setCentro((c) => (c + 1) % CANT), []);
  const retroceder = useCallback(() => setCentro((c) => (c - 1 + CANT) % CANT), []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') avanzar();
      else if (e.key === 'ArrowLeft') retroceder();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [avanzar, retroceder]);

  if (cargando) {
    return (
      <section aria-labelledby="titulo-proyectos" aria-busy={cargando} className="w-full">
        <h2
          id="titulo-proyectos"
          className="font-display text-4xl font-bold uppercase tracking-wide text-lumen sm:text-5xl"
        >
          Proyectos seleccionados
        </h2>
        <div className="mt-4">
          <EsqueletoCarrusel />
        </div>
      </section>
    );
  }

  return (
    <section aria-labelledby="titulo-proyectos" className="w-full select-none">
      <h2
        id="titulo-proyectos"
        className="font-display text-4xl font-bold uppercase tracking-wide text-lumen sm:text-5xl"
      >
        Proyectos seleccionados
      </h2>
      <div
        role="region"
        aria-label="Carrusel de proyectos"
        className="relative mx-auto mt-4 w-full max-w-2xl"
        onTouchStart={(e) => {
          inicioX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          const dx = inicioX.current - e.changedTouches[0].clientX;
          if (Math.abs(dx) > 40) {
            if (dx > 0) avanzar();
            else retroceder();
          }
        }}
      >
        <div
          className="relative h-[24rem] sm:h-[32rem]"
          style={{ transformStyle: 'preserve-3d', perspective: '1600px' }}
        >
          {CANT > 0 &&
            projects.map((p, idx) => {
              const pos = posicionDe(idx);
              const clasePos =
                pos === 0
                  ? 'carrusel-pos-0'
                  : pos === 1
                    ? 'carrusel-pos-1'
                    : 'carrusel-pos-neg1';
              const estilosFondo =
                pos === 0
                  ? { opacity: 1, filter: 'blur(0px)', zIndex: 20 }
                  : { opacity: 0.6, filter: 'blur(1.5px)', zIndex: 10 };

              return (
                <article
                  key={p.titulo}
                  data-cursor={pos === 0 ? 'encuadre' : undefined}
                  aria-hidden={pos !== 0 ? 'true' : undefined}
                  onClick={(e) => {
                    if (pos !== 0) {
                      e.preventDefault();
                      setCentro(idx);
                    }
                  }}
                  className={`absolute left-1/2 top-0 flex h-full w-full max-w-xl flex-col overflow-hidden rounded-xl border border-surface/80 bg-abyss/95 shadow-2xl will-change-transform ${clasePos} ${
                    pos !== 0 ? 'cursor-pointer' : ''
                  }`}
                  style={{
                    ...estilosFondo,
                    transition:
                      'transform 0.65s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.65s ease, filter 0.65s ease',
                  }}
                >
                  <div className="h-40 w-full shrink-0 overflow-hidden border-b border-surface/60 sm:h-56">
                    {p.imagen ? (
                      pos === 0 && p.demo ? (
                        <a
                          href={p.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Abrir demo de ${p.titulo}`}
                          className="group/foto relative block h-full w-full"
                        >
                          <img
                            src={p.imagen}
                            alt={p.titulo}
                            loading="lazy"
                            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover/foto:scale-[1.04]"
                            style={{ filter: 'saturate(1.05) brightness(1.02)' }}
                          />
                          <span className="pointer-events-none absolute inset-0 hidden items-end justify-end bg-gradient-to-t from-void/70 via-transparent to-transparent p-3 font-hud text-[11px] uppercase tracking-widest text-lumen opacity-0 transition-opacity duration-300 group-hover/foto:opacity-100 sm:flex">
                            Ver demo ↗
                          </span>
                        </a>
                      ) : (
                        <img
                          src={p.imagen}
                          alt={p.titulo}
                          loading="lazy"
                          className="h-full w-full object-cover object-top"
                          style={{ filter: 'saturate(1.05) brightness(1.02)' }}
                        />
                      )
                    ) : (
                      <PlaceholderImagen titulo={p.titulo} />
                    )}
                  </div>
                  <div className="min-h-0 flex-1 overflow-y-auto px-6 pb-4 pt-4">
                    <h3 className="font-display text-xl font-semibold tracking-wide text-lumen">
                      {p.titulo}
                    </h3>
                    <p className="mt-2 text-sm leading-snug text-ash">
                      {p.descripcion}
                    </p>
                    <ul className="mt-3 flex flex-wrap gap-1.5">
                      {p.tecnologias.map((t) => (
                        <li
                          key={t}
                          className="rounded-full border border-ember/50 bg-ember/10 px-2.5 py-0.5 font-hud text-[11px] leading-4 text-lumen/90"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                    {(p.demo || p.repo) && (
                      <div className="mt-4 flex gap-4 font-hud text-xs uppercase tracking-widest">
                        {p.repo && (
                          <a
                            href={p.repo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-flare underline-offset-4 transition-colors duration-300 hover:text-lumen hover:underline"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Código ↗
                          </a>
                        )}
                        {p.demo && (
                          <a
                            href={p.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-flare underline-offset-4 transition-colors duration-300 hover:text-lumen hover:underline"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Demo ↗
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
        </div>

        <button
          type="button"
          onClick={retroceder}
          aria-label="Proyecto anterior"
          className="absolute -left-3 top-[50%] z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center text-flare transition-colors duration-300 hover:text-lumen sm:-left-6 sm:top-1/2 sm:h-11 sm:w-11 sm:rounded-full sm:border sm:border-surface/80 sm:bg-void/60 sm:backdrop-blur sm:text-lumen sm:hover:border-stellar sm:hover:text-flare"
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          onClick={avanzar}
          aria-label="Proyecto siguiente"
          className="absolute -right-3 top-[50%] z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center text-flare transition-colors duration-300 hover:text-lumen sm:-right-6 sm:top-1/2 sm:h-11 sm:w-11 sm:rounded-full sm:border sm:border-surface/80 sm:bg-void/60 sm:backdrop-blur sm:text-lumen sm:hover:border-stellar sm:hover:text-flare"
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden="true">
            <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="mt-6 flex items-center justify-center gap-2" aria-hidden="true">
        {projects.map((p, idx) => (
          <button
            type="button"
            key={p.titulo}
            onClick={() => setCentro(idx)}
            tabIndex={-1}
            aria-label={idx === centro ? `Proyecto activo: ${p.titulo}` : p.titulo}
            className={`h-2 rounded-full transition-all duration-500 ${
              idx === centro ? 'w-6 bg-flare' : 'w-2 bg-surface hover:bg-ash'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
