import profile from '../../../data/profile.json';

export default function AboutSection() {
  return (
    <section aria-labelledby="titulo-about" className="w-full">
      <p className="animate-aterrizaje font-hud text-xs uppercase tracking-[0.4em] text-plasma">
        Expediente · Perfil de misión
      </p>
      <h2
        id="titulo-about"
        className="animate-aterrizaje mt-4 font-display text-4xl font-bold uppercase tracking-wide sm:text-5xl"
        style={{ animationDelay: '120ms' }}
      >
        Sobre mí
      </h2>
      <div
        className="animate-aterrizaje mt-10 max-w-2xl space-y-6 leading-relaxed text-stardust"
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
        className="animate-aterrizaje mt-10 max-w-2xl font-hud text-xs uppercase tracking-widest text-stardust"
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
            className="rounded border border-space-800 bg-space-900/60 p-4"
          >
            <p className="font-display text-sm">{f.titulo}</p>
            <p className="mt-1 text-sm text-stardust">
              {f.institucion} · {f.periodo}
            </p>
          </li>
        ))}
      </ul>
      <dl
        className="animate-aterrizaje mt-10 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-3"
        style={{ animationDelay: '540ms' }}
      >
        <div className="rounded border border-space-800 bg-space-900/60 p-4">
          <dt className="font-hud text-[11px] uppercase tracking-widest text-stardust">
            Sector
          </dt>
          <dd className="mt-1 font-display text-sm">{profile.ubicacion}</dd>
        </div>
        <div className="rounded border border-space-800 bg-space-900/60 p-4">
          <dt className="font-hud text-[11px] uppercase tracking-widest text-stardust">
            Estado
          </dt>
          <dd className="mt-1 font-display text-sm text-plasma">Disponible</dd>
        </div>
        <div className="rounded border border-space-800 bg-space-900/60 p-4">
          <dt className="font-hud text-[11px] uppercase tracking-widest text-stardust">
            Base
          </dt>
          <dd className="mt-1 break-all font-display text-sm">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-plasma/50 underline-offset-4 transition-colors hover:text-plasma"
            >
              GitHub ↗
            </a>
          </dd>
        </div>
      </dl>
    </section>
  );
}
