import profile from '../../../data/profile.json';

export default function HeroSection({ irA }) {
  return (
    <section aria-labelledby="titulo-hero" className="-mt-12 w-full md:-mt-16">
      <p className="flex items-center gap-2.5 font-hud text-xs uppercase tracking-[0.4em] text-flare">
        <span
          aria-hidden="true"
          className="h-1 w-1 rounded-full bg-flare shadow-[0_0_10px_rgba(224,82,82,0.9)]"
        />
        Base de Control · En línea
      </p>
      <h1
        id="titulo-hero"
        className="mt-5 font-display text-5xl font-bold uppercase tracking-wide text-lumen sm:text-7xl"
      >
        {profile.nombre}
      </h1>
      <p className="mt-3 font-hud text-lg text-flare sm:text-2xl">
        {`< ${profile.rol} />`}
      </p>
      <p className="mt-6 max-w-xl leading-relaxed text-ash">
        Bienvenida, tripulante. Este es mi rincón del universo: explorá mis
        misiones completadas y mi arsenal de tecnologías.
      </p>
      <div className="mt-10 flex flex-wrap gap-4">
        <button
          type="button"
          onClick={() => irA('proyectos')}
          className="rounded border border-stellar/60 bg-stellar/10 px-6 py-3 font-hud text-xs uppercase tracking-widest text-lumen transition-all duration-500 hover:border-stellar hover:bg-stellar/20 hover:shadow-[0_0_28px_rgba(184,50,60,0.35)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-flare"
        >
          Ver misiones
        </button>
        <button
          type="button"
          onClick={() => irA('contacto')}
          className="rounded border border-surface px-6 py-3 font-hud text-xs uppercase tracking-widest text-ash transition-colors duration-500 hover:border-ember hover:text-lumen focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-flare"
        >
          Abrir transmisión
        </button>
      </div>
    </section>
  );
}
