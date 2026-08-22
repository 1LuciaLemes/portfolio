import projects from '../../../data/projects.json';

export default function ProjectsSection() {
  return (
    <section aria-labelledby="titulo-proyectos" className="w-full">
      <p className="animate-aterrizaje font-hud text-xs uppercase tracking-[0.4em] text-plasma">
        Bitácora · Misiones completadas
      </p>
      <h2
        id="titulo-proyectos"
        className="animate-aterrizaje mt-4 font-display text-4xl font-bold uppercase tracking-wide sm:text-5xl"
        style={{ animationDelay: '120ms' }}
      >
        Proyectos seleccionados
      </h2>
      <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {projects.map((p, i) => (
          <li
            key={p.titulo}
            className="animate-aterrizaje group rounded-lg border border-space-800 bg-space-900/60 p-6 transition-all duration-300 hover:border-nebula/60 hover:shadow-[0_0_32px_rgba(123,47,247,0.25)]"
            style={{ animationDelay: `${240 + i * 120}ms` }}
          >
            <article>
              <h3 className="font-display text-xl font-semibold tracking-wide group-hover:text-nebula-light">
                {p.titulo}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-stardust">
                {p.descripcion}
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {p.tecnologias.map((t) => (
                  <li
                    key={t}
                    className="rounded-full border border-plasma/30 bg-plasma/5 px-3 py-0.5 font-hud text-[11px] text-plasma"
                  >
                    {t}
                  </li>
                ))}
              </ul>
              {(p.demo || p.repo) && (
                <div className="mt-5 flex gap-4 font-hud text-xs uppercase tracking-widest">
                  {p.demo && (
                    <a href={p.demo} target="_blank" rel="noopener noreferrer" className="text-plasma hover:underline underline-offset-4">
                      Demo ↗
                    </a>
                  )}
                  {p.repo && (
                    <a href={p.repo} target="_blank" rel="noopener noreferrer" className="text-stardust hover:text-starlight hover:underline underline-offset-4">
                      Código ↗
                    </a>
                  )}
                </div>
              )}
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
