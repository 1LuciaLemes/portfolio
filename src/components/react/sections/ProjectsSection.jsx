import { useEffect, useState } from 'react';
import projects from '../../../data/projects.json';

const ESQUELETO = [0, 1, 2, 3];

function TarjetaEsqueleto({ ocultoEnMobile = false }) {
  return (
    <li
      aria-hidden="true"
      className={`relative overflow-hidden rounded-lg border border-surface/80 bg-abyss/70 p-6 ${
        ocultoEnMobile ? 'hidden sm:block' : ''
      }`}
    >
      <div className="space-y-3">
        <div className="h-5 w-1/2 rounded bg-surface/80" />
        <div className="h-3 w-full rounded bg-surface/60" />
        <div className="h-3 w-5/6 rounded bg-surface/60" />
        <div className="h-3 w-2/3 rounded bg-surface/60" />
        <div className="flex gap-2 pt-2">
          <div className="h-5 w-16 rounded-full bg-surface/60" />
          <div className="h-5 w-20 rounded-full bg-surface/60" />
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 animate-barrido bg-gradient-to-r from-transparent via-flare/15 to-transparent" />
    </li>
  );
}

export default function ProjectsSection() {
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const t = window.setTimeout(() => setCargando(false), 900);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <section aria-labelledby="titulo-proyectos" aria-busy={cargando} className="w-full">
      <p className="animate-aterrizaje flex items-center gap-2.5 font-hud text-xs uppercase tracking-[0.4em] text-flare">
        <span
          aria-hidden="true"
          className="h-1 w-1 rounded-full bg-flare shadow-[0_0_10px_rgba(224,82,82,0.9)]"
        />
        Bitácora · Misiones completadas
      </p>
      <h2
        id="titulo-proyectos"
        className="animate-aterrizaje mt-5 font-display text-4xl font-bold uppercase tracking-wide text-lumen sm:text-5xl"
        style={{ animationDelay: '80ms' }}
      >
        Proyectos seleccionados
      </h2>
      <p role="status" className="sr-only">
        {cargando ? 'Cargando misiones…' : `${projects.length} misiones cargadas.`}
      </p>
      {cargando ? (
        <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {ESQUELETO.map((i) => (
            <TarjetaEsqueleto key={i} ocultoEnMobile={i >= 2} />
          ))}
        </ul>
      ) : (
        <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {projects.map((p, i) => (
            <li
              key={p.titulo}
              data-cursor="encuadre"
              className="animate-aterrizaje group rounded-lg border border-surface/80 bg-abyss/60 p-6 transition-all duration-500 hover:border-stellar/50 hover:shadow-[inset_4px_0_16px_-8px_rgba(224,82,82,0.55),0_0_36px_rgba(184,50,60,0.12)]"
              style={{ animationDelay: `${180 + i * 180}ms` }}
            >
              <article>
                <h3 className="font-display text-xl font-semibold tracking-wide text-lumen transition-colors duration-500 group-hover:text-flare">
                  {p.titulo}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ash">
                  {p.descripcion}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {p.tecnologias.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-ember/50 bg-ember/10 px-3 py-0.5 font-hud text-[11px] text-lumen/90"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
                {(p.demo || p.repo) && (
                  <div className="mt-5 flex gap-4 font-hud text-xs uppercase tracking-widest">
                    {p.repo && (
                      <a
                        href={p.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-flare underline-offset-4 transition-colors duration-300 hover:text-lumen hover:underline"
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
                      >
                        Demo ↗
                      </a>
                    )}
                  </div>
                )}
              </article>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
