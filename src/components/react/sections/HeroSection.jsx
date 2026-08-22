import profile from '../../../data/profile.json';

export default function HeroSection({ irA }) {
  return (
    <section aria-labelledby="titulo-hero" className="w-full">
      <p className="animate-aterrizaje font-hud text-xs uppercase tracking-[0.4em] text-plasma">
        Base de Control · En línea
      </p>
      <h1
        id="titulo-hero"
        className="animate-aterrizaje mt-4 font-display text-5xl font-black uppercase tracking-wide sm:text-7xl"
        style={{ animationDelay: '120ms' }}
      >
        {profile.nombre}
      </h1>
      <h2
        className="animate-aterrizaje mt-3 font-hud text-lg text-nebula-light sm:text-2xl"
        style={{ animationDelay: '240ms' }}
      >
        {`< ${profile.rol} />`}
      </h2>
      <p
        className="animate-aterrizaje mt-6 max-w-xl text-stardust leading-relaxed"
        style={{ animationDelay: '360ms' }}
      >
        Bienvenida, tripulante. Este es mi rincón del espacio: explorá mis
        misiones completadas y mi arsenal de tecnologías.
      </p>
      <div
        className="animate-aterrizaje mt-10 flex flex-wrap gap-4"
        style={{ animationDelay: '480ms' }}
      >
        <button
          type="button"
          onClick={() => irA('proyectos')}
          className="rounded border border-plasma bg-plasma/10 px-6 py-3 font-hud text-xs uppercase tracking-widest text-plasma transition-all duration-300 hover:bg-plasma/25 hover:shadow-[0_0_24px_rgba(0,240,255,0.35)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-plasma"
        >
          Ver misiones
        </button>
        <button
          type="button"
          onClick={() => irA('contacto')}
          className="rounded border border-space-800 px-6 py-3 font-hud text-xs uppercase tracking-widest text-stardust transition-colors duration-300 hover:border-nebula hover:text-starlight focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-nebula"
        >
          Abrir transmisión
        </button>
      </div>
    </section>
  );
}
