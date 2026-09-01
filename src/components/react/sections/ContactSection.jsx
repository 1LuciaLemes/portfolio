import profile from '../../../data/profile.json';

export default function ContactSection() {
  const canales = [
    {
      etiqueta: 'GitHub',
      url: profile.github,
      activo: Boolean(profile.github),
    },
    {
      etiqueta: 'LinkedIn',
      url: profile.linkedin,
      activo: Boolean(profile.linkedin),
    },
    {
      etiqueta: 'Email',
      url: profile.email ? `mailto:${profile.email}` : '',
      activo: Boolean(profile.email),
    },
  ];

  return (
    <section aria-labelledby="titulo-contacto" className="w-full">
      <h2
        id="titulo-contacto"
        className="font-display text-4xl font-bold uppercase tracking-wide text-lumen sm:text-5xl"
      >
        Contacto
      </h2>
      <p className="mt-6 max-w-xl leading-relaxed text-ash">
        ¿Tenés una misión para mí o querés coordinar un despegue? Elegí un canal
        y establezcamos comunicación.
      </p>
      <ul className="mt-10 flex flex-wrap gap-4">
        {canales.map((c) => (
          <li key={c.etiqueta}>
            {c.activo ? (
              <a
                href={c.url}
                target={c.url.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="inline-block rounded border border-surface/80 px-6 py-3 font-hud text-xs uppercase tracking-widest text-lumen transition-all duration-500 hover:border-stellar hover:shadow-[0_0_24px_rgba(184,50,60,0.3)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-flare"
              >
                {c.etiqueta} ↗
              </a>
            ) : (
              <span
                className="inline-block cursor-not-allowed rounded border border-dashed border-surface/80 px-6 py-3 font-hud text-xs uppercase tracking-widest text-ash/50"
                title="Completá este dato en src/data/profile.json"
              >
                {c.etiqueta} · pendiente
              </span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
