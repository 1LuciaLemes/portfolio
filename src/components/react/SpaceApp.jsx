import { useCallback, useEffect, useRef, useState } from 'react';
import Starfield from './Starfield';
import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import SkillsSection from './sections/SkillsSection';
import ProjectsSection from './sections/ProjectsSection';
import ContactSection from './sections/ContactSection';

const SECCIONES = [
  { id: 'inicio', etiqueta: 'Base de Control', Componente: HeroSection },
  { id: 'sobre-mi', etiqueta: 'Expediente', Componente: AboutSection },
  { id: 'habilidades', etiqueta: 'Arsenal', Componente: SkillsSection },
  { id: 'proyectos', etiqueta: 'Bitácora', Componente: ProjectsSection },
  { id: 'contacto', etiqueta: 'Transmisión', Componente: ContactSection },
];

const DURACION_VIAJE = 800;
const DURACION_FRENO = 400;
const MULTIPLIER_MAX = 18;
const MULTIPLIER_LERP = 0.04;

export default function SpaceApp() {
  const [activa, setActiva] = useState('inicio');
  const [fase, setFase] = useState('intro');
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [mostrarContenido, setMostrarContenido] = useState(false);

  const multiplierRef = useRef(1);
  const targetMultiplierRef = useRef(1);
  const animFrameRef = useRef(0);

  const seccionActual = SECCIONES.find((s) => s.id === activa);
  const Contenido = seccionActual.Componente;

  useEffect(() => {
    targetMultiplierRef.current = MULTIPLIER_MAX;

    const tFreno = window.setTimeout(() => {
      setFase('frenando');
      targetMultiplierRef.current = 1;
    }, 600);

    const tAterrizaje = window.setTimeout(() => {
      setFase('aterrizando');
      setMostrarContenido(true);

      const tIdle = window.setTimeout(() => setFase('idle'), 900);
      return () => window.clearTimeout(tIdle);
    }, 1000);

    return () => {
      window.clearTimeout(tFreno);
      window.clearTimeout(tAterrizaje);
    };
  }, []);

  useEffect(() => {
    if (!menuAbierto) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setMenuAbierto(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuAbierto]);

  useEffect(() => {
    const tick = () => {
      const current = multiplierRef.current;
      const target = targetMultiplierRef.current;
      multiplierRef.current = current + (target - current) * MULTIPLIER_LERP;
      if (Math.abs(multiplierRef.current - target) < 0.01) {
        multiplierRef.current = target;
      }
      animFrameRef.current = requestAnimationFrame(tick);
    };
    animFrameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, []);

  const irA = useCallback((id) => {
    if (id === activa || fase !== 'idle') return;
    setMenuAbierto(false);
    setFase('viajando');
    targetMultiplierRef.current = MULTIPLIER_MAX;
    setMostrarContenido(false);

    setTimeout(() => {
      setFase('frenando');
      targetMultiplierRef.current = 1;
    }, DURACION_VIAJE);

    setTimeout(() => {
      setActiva(id);
      setFase('aterrizando');
      setMostrarContenido(true);

      setTimeout(() => setFase('idle'), 900);
    }, DURACION_VIAJE + DURACION_FRENO);
  }, [activa, fase]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Starfield velocityMultiplierRef={multiplierRef} />

      <header
        className="fixed inset-x-0 top-0 z-20 border-b border-surface/80 bg-void/70 backdrop-blur-md"
        style={{
          opacity:
            fase === 'idle' || fase === 'aterrizando' ? 1 : fase === 'viajando' ? 0 : 1,
          transform:
            fase === 'idle' || fase === 'aterrizando'
              ? 'translateY(0)'
              : fase === 'viajando'
                ? 'translateY(-86px)'
                : 'translateY(-12px)',
          filter: fase === 'viajando' ? 'blur(8px)' : 'blur(0px)',
          transition:
            'opacity 0.7s ease-in, transform 0.7s cubic-bezier(0.55, 0, 1, 0.45), filter 0.5s ease-in',
        }}
      >
        <div className="mx-auto max-w-6xl px-4 py-2">
          <div className="flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => irA('inicio')}
              className="flex min-h-11 items-center gap-2 font-hud text-xs font-semibold uppercase tracking-[0.3em] text-lumen transition-colors duration-300 hover:text-flare"
            >
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-flare shadow-[0_0_10px_rgba(224,82,82,0.9)]"
              />
              LL · Orbital
            </button>

            <nav
              aria-label="Navegación de secciones"
              className="hidden items-center gap-4 md:flex"
            >
              <ul className="flex items-center gap-4">
                {SECCIONES.map((s) => (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => irA(s.id)}
                      aria-current={activa === s.id ? 'true' : undefined}
                      className={`font-hud text-xs uppercase tracking-widest transition-colors duration-300 ${
                        activa === s.id
                          ? 'text-flare [text-shadow:0_0_12px_rgba(224,82,82,0.7)]'
                          : 'text-ash hover:text-lumen'
                      }`}
                    >
                      {s.etiqueta}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            <button
              type="button"
              onClick={() => setMenuAbierto((o) => !o)}
              aria-expanded={menuAbierto}
              aria-controls="menu-navegacion-movil"
              aria-label={menuAbierto ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
              className="inline-flex h-11 w-11 items-center justify-center rounded border border-surface/80 text-lumen transition-colors duration-300 hover:border-stellar hover:text-flare focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-flare md:hidden"
            >
              <span aria-hidden="true" className="relative block h-3 w-5">
                <span
                  className={`absolute left-0 block h-0.5 w-full bg-current transition-all duration-300 ${
                    menuAbierto ? 'top-1.5 rotate-45' : 'top-0'
                  }`}
                />
                <span
                  className={`absolute top-1.5 left-0 block h-0.5 w-full bg-current transition-opacity duration-300 ${
                    menuAbierto ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`absolute left-0 block h-0.5 w-full bg-current transition-all duration-300 ${
                    menuAbierto ? 'top-1.5 -rotate-45' : 'top-3'
                  }`}
                />
              </span>
            </button>
          </div>
        </div>

        {menuAbierto && (
          <nav
            id="menu-navegacion-movil"
            aria-label="Navegación móvil"
            className="border-t border-surface/80 bg-void/95 backdrop-blur-md md:hidden"
          >
            <ul className="mx-auto max-w-6xl space-y-1 px-4 py-2">
              {SECCIONES.map((s) => (
                <li key={s.id}>
                  <button
                    type="button"
                    onClick={() => irA(s.id)}
                    aria-current={activa === s.id ? 'true' : undefined}
                    className={`flex min-h-11 w-full items-center gap-3 rounded px-3 font-hud text-sm uppercase tracking-widest transition-colors duration-300 ${
                      activa === s.id
                        ? 'bg-stellar/10 text-flare'
                        : 'text-ash hover:bg-surface/50 hover:text-lumen'
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`h-1 w-1 rounded-full transition-all duration-300 ${
                        activa === s.id
                          ? 'bg-flare shadow-[0_0_8px_rgba(224,82,82,0.9)]'
                          : 'bg-surface'
                      }`}
                    />
                    {s.etiqueta}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>

      <main
        id="contenido-principal"
        className={`relative z-10 mx-auto flex min-h-screen max-w-6xl px-4 pt-28 pb-12 md:pt-32 ${
          fase === 'frenando' || fase === 'viajando' || fase === 'intro'
            ? 'overflow-hidden'
            : 'overflow-visible'
        }`}
      >
        <div
          className="m-auto w-full"
          style={{
            opacity: mostrarContenido ? 1 : 0,
            transform:
              !mostrarContenido && fase === 'viajando'
                ? 'translateY(46vh) scale(0.8)'
                : 'translateY(0) scale(1)',
            filter: !mostrarContenido && fase === 'viajando' ? 'blur(14px)' : 'blur(0px)',
            transition:
              'opacity 0.28s ease-in, transform 0.7s cubic-bezier(0.55, 0, 1, 0.45), filter 0.65s ease-in',
            pointerEvents: mostrarContenido ? 'auto' : 'none',
          }}
        >
          <Contenido key={activa} irA={irA} />
        </div>
      </main>
    </div>
  );
}
