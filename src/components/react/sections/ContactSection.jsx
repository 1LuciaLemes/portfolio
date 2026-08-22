import profile from '../../../data/profile.json';

export default function ContactSection() {
  const canales = [
    { etiqueta: 'GitHub', url: profile.github, activo: Boolean(profile.github) },
    { etiqueta: 'LinkedIn', url: profile.linkedin, activo: Boolean(profile.linkedin) },
    { etiqueta: 'Email', url: profile.email ? `mailto:${profile.email}` : '', activo: Boolean(profile.email) },
  ];

  return (
    <section aria-labelledby="titulo-contacto" className="w-full">
      <p className="animate-aterrizaje font-hud text-xs uppercase tracking-[0.4em] text-plasma">
        Transmisión · Señal abierta
      </p>
      <h2
        id="titulo-contacto"
        className="animate-aterrizaje mt-4 font-display text-4xl font-bold uppercase tracking-wide sm:text-5xl"
        style={{ animationDelay: '120ms' }}
      >
        Contacto
      </h2>
      <p
        className="animate-aterrizaje mt-6 max-w-xl text-stardust leading-relaxed"
        style={{ animationDelay: '240ms' }}
      >
        ¿Tenés una misión para mí o querés coordinar un despegue? Elegí un canal
        y establezcamos comunicación.
      </p>
      <ul className="mt-10 flex flex-wrap gap-4">
        {canales.map((c, i) => (
          <li
            key={c.etiqueta}
            className="animate-aterrizaje"
            style={{ animationDelay: `${360 + i * 100}ms` }}
          >
            {c.activo ? (
              <a
                href={c.url}
                target={c.url.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="inline-block rounded border border-space-800 px-6 py-3 font-hud text-xs uppercase tracking-widest text-starlight transition-all duration-300 hover:border-plasma hover:text-plasma hover:shadow-[0_0_20px_rgba(0,240,255,0.25)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-plasma"
              >
                {c.etiqueta} ↗
              </a>
            ) : (
              <span className="inline-block cursor-not-allowed rounded border border-dashed border-space-800 px-6 py-3 font-hud text-xs uppercase tracking-widest text-stardust/50" title="Completá este dato en src/data/profile.json">
                {c.etiqueta} · pendiente
              </span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
