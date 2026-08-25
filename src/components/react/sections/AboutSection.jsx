import profile from '../../../data/profile.json';

export default function AboutSection() {
  return (
    <section aria-labelledby="titulo-about" className="w-full">
      <p className="animate-aterrizaje flex items-center gap-2.5 font-hud text-xs uppercase tracking-[0.4em] text-flare">
        <span
          aria-hidden="true"
          className="h-1 w-1 rounded-full bg-flare shadow-[0_0_10px_rgba(224,82,82,0.9)]"
        />
        Expediente · Perfil de misión
      </p>
      <h2
        id="titulo-about"
        className="animate-aterrizaje mt-5 font-display text-4xl font-bold uppercase tracking-wide text-lumen sm:text-5xl"
        style={{ animationDelay: '120ms' }}
      >
        Sobre mí
      </h2>
      <div
        className="animate-aterrizaje mt-10 max-w-2xl space-y-6 leading-relaxed text-ash"
        style={{ animationDelay: '240ms' }}
      >
        <p>{profile.bio}</p>
        <p>
          Actualmente profundizo mis conocimientos en desarrollo backend, bases
          de datos y APIs para seguir creciendo como Full Stack Developer,
          combinando la base teórica de la ingeniería con la práctica intensiva
          del bootcamp.
        </p>
      </div>
      <h3
        className="animate-aterrizaje mt-10 max-w-2xl font-hud text-xs uppercase tracking-widest text-ash"
        style={{ animationDelay: '360ms' }}
      >
        Formación
      </h3>
      <ul
        className="animate-aterrizaje mt-3 max-w-2xl space-y-3"
        style={{ animationDelay: '420ms' }}
      >
        {profile.formacion.map((f) => (
          <li
            key={f.titulo}
            className="border-l border-ember/70 bg-abyss/60 p-4 pl-4 shadow-[inset_2px_0_8px_-6px_rgba(184,50,60,0.6)]"
          >
            <p className="font-display text-sm text-lumen">{f.titulo}</p>
            <p className="mt-1 text-sm text-ash">
              {f.institucion} · {f.periodo}
            </p>
          </li>
        ))}
      </ul>
      <dl
        className="animate-aterrizaje mt-10 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3"
        style={{ animationDelay: '540ms' }}
      >
        <div className="rounded border border-surface/80 bg-abyss/60 p-4">
          <dt className="font-hud text-[11px] uppercase tracking-widest text-ash">
            Sector
          </dt>
          <dd className="mt-1 font-display text-sm text-lumen">
            {profile.ubicacion}
          </dd>
        </div>
        <div className="rounded border border-surface/80 bg-abyss/60 p-4">
          <dt className="font-hud text-[11px] uppercase tracking-widest text-ash">
            Estado
          </dt>
          <dd className="mt-1 flex items-center gap-1.5 font-display text-sm text-flare">
            <span
              aria-hidden="true"
              className="h-1 w-1 rounded-full bg-flare shadow-[0_0_8px_rgba(224,82,82,0.9)]"
            />
            Disponible
          </dd>
        </div>
        <div className="rounded border border-surface/80 bg-abyss/60 p-4">
          <dt className="font-hud text-[11px] uppercase tracking-widest text-ash">
            Base
          </dt>
          <dd className="mt-1 break-all font-display text-sm">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lumen underline decoration-stellar/50 underline-offset-4 transition-colors duration-300 hover:text-flare"
            >
              GitHub ↗
            </a>
          </dd>
        </div>
      </dl>
    </section>
  );
}
