import { useCallback, useEffect, useRef, useState } from 'react';
import Starfield from './Starfield';
import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import SkillsSection from './sections/SkillsSection';
import ProjectsSection from './sections/ProjectsSection';
import ContactSection from './sections/ContactSection';

const SECCIONES = [
  { id: 'inicio', etiqueta: 'Base de Control', contexto: 'Base de Control · En línea', Componente: HeroSection },
  { id: 'proyectos', etiqueta: 'Bitácora', contexto: 'Bitácora · Misiones completadas', Componente: ProjectsSection },
  { id: 'sobre-mi', etiqueta: 'Expediente', contexto: 'Expediente · Perfil de misión', Componente: AboutSection },
  { id: 'habilidades', etiqueta: 'Arsenal', contexto: 'Arsenal · Módulos instalados', Componente: SkillsSection },
  { id: 'contacto', etiqueta: 'Transmisión', contexto: 'Transmisión · Señal abierta', Componente: ContactSection },
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
  const contenedorRef = useRef(null);
  const navbarRef = useRef(null);
  const scrollThumbRef = useRef(null);
  const scrollThumbBarRef = useRef(null);
  const [scrollVisible, setScrollVisible] = useState(false);

  const seccionActual = SECCIONES.find((s) => s.id === activa);
  const Contenido = seccionActual.Componente;
  const indiceActiva = SECCIONES.findIndex((s) => s.id === activa);

  const irA = useCallback((id) => {
    if (id === activa || fase !== 'idle') return;
    const indiceDestino = SECCIONES.findIndex((s) => s.id === id);
    const direccion = indiceDestino - indiceActiva;
    setMenuAbierto(false);
    setFase('viajando');
    targetMultiplierRef.current = (direccion > 0 ? 1 : -1) * MULTIPLIER_MAX;
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

  const navegar = useCallback(
    (dir) => {
      const nuevo = indiceActiva + dir;
      if (nuevo < 0 || nuevo >= SECCIONES.length) return;
      irA(SECCIONES[nuevo].id);
    },
    [indiceActiva, irA],
  );

  const UMBRAL_RUEDA = 48;
  useEffect(() => {
    const contenedor = contenedorRef.current;
    if (!contenedor) return;

    let touchInicioY = 0;
    let deltaAcumulado = 0;
    let reinicioDelta = 0;

    const desecharAcumulador = () => {
      deltaAcumulado = 0;
      window.clearTimeout(reinicioDelta);
    };

    const engranarReset = () => {
      window.clearTimeout(reinicioDelta);
      reinicioDelta = window.setTimeout(() => {
        deltaAcumulado = 0;
      }, 150);
    };

    const scrolleableDescendiente = (desde, dir) => {
      let el = desde;
      while (el && el !== contenedor) {
        const restante = el.scrollHeight - el.clientHeight;
        if (restante > 2) {
          if (dir > 0 && el.scrollTop < restante - 1) return el;
          if (dir < 0 && el.scrollTop > 1) return el;
        }
        el = el.parentElement;
      }
      return null;
    };

    const handleWheel = (e) => {
      if (faseRef.current !== 'idle') {
        desecharAcumulador();
        return;
      }
      const disp = e.deltaY;
      const enTope = contenedor.scrollTop <= 0;
      const enFondo =
        contenedor.scrollHeight - contenedor.scrollTop - contenedor.clientHeight < 4;

      if (disp > 0) {
        if (scrolleableDescendiente(e.target, 1)) return;
        if (!enFondo) return;
        if (deltaAcumulado < 0) deltaAcumulado = 0;
        deltaAcumulado += disp;
        engranarReset();
        if (deltaAcumulado >= UMBRAL_RUEDA) {
          desecharAcumulador();
          e.preventDefault();
          navegarRef.current(1);
        }
      } else if (disp < 0) {
        if (scrolleableDescendiente(e.target, -1)) return;
        if (!enTope) return;
        if (deltaAcumulado > 0) deltaAcumulado = 0;
        deltaAcumulado += disp;
        engranarReset();
        if (deltaAcumulado <= -UMBRAL_RUEDA) {
          desecharAcumulador();
          e.preventDefault();
          navegarRef.current(-1);
        }
      }
    };

    const handleTouchStart = (e) => {
      touchInicioY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      if (faseRef.current !== 'idle') return;
      const dy = touchInicioY - e.changedTouches[0].clientY;
      const UMBRAL = 48;
      const enTope = contenedor.scrollTop <= 0;
      const enFondo =
        contenedor.scrollHeight - contenedor.scrollTop - contenedor.clientHeight < 4;

      if (dy > UMBRAL) {
        if (scrolleableDescendiente(e.target, 1)) return;
        if (enFondo) navegarRef.current(1);
      } else if (dy < -UMBRAL) {
        if (scrolleableDescendiente(e.target, -1)) return;
        if (enTope) navegarRef.current(-1);
      }
    };

    contenedor.addEventListener('wheel', handleWheel, { passive: false });
    contenedor.addEventListener('touchstart', handleTouchStart, { passive: true });
    contenedor.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      desecharAcumulador();
      contenedor.removeEventListener('wheel', handleWheel);
      contenedor.removeEventListener('touchstart', handleTouchStart);
      contenedor.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  const faseRef = useRef(fase);
  useEffect(() => {
    faseRef.current = fase;
  }, [fase]);

  const navegarRef = useRef(navegar);
  useEffect(() => {
    navegarRef.current = navegar;
  }, [navegar]);

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

  useEffect(() => {
    const contenedor = contenedorRef.current;
    const indicador = scrollThumbRef.current;
    const barra = scrollThumbBarRef.current;
    if (!contenedor || !indicador || !barra) return;

    const OCULTAR_TRAS = 1200;
    let timeout = 0;

    const alturaNavbar = () =>
      navbarRef.current ? navbarRef.current.offsetHeight : 0;

    const actualizar = () => {
      const scrollTop = contenedor.scrollTop;
      const scrollHeight = contenedor.scrollHeight;
      const clientHeight = contenedor.clientHeight;
      const scrolleable = scrollHeight - clientHeight;
      const navAlt = alturaNavbar();
      contenedor.style.setProperty('--altura-navbar', `${navAlt}px`);
      const zonaVisible = Math.max(clientHeight - navAlt, 1);

      const puedeScrollear = scrolleable > 4;
      indicador.classList.toggle('es-scrolleable', puedeScrollear);

      if (puedeScrollear) {
        const altoThumb = Math.max((zonaVisible / scrollHeight) * zonaVisible, 28);
        const top = (scrollTop / scrolleable) * (zonaVisible - altoThumb);
        barra.style.height = `${altoThumb}px`;
        barra.style.top = `${top}px`;
      }
    };

    const mostrar = () => {
      setScrollVisible(true);
      window.clearTimeout(timeout);
      timeout = window.setTimeout(() => setScrollVisible(false), OCULTAR_TRAS);
    };

    const onScroll = () => {
      actualizar();
      mostrar();
    };

    actualizar();
    contenedor.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', actualizar);

    return () => {
      window.clearTimeout(timeout);
      contenedor.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', actualizar);
    };
  }, [activa]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div
        className={`pointer-events-none fixed inset-0 z-0 ${
          fase === 'frenando' ? 'animate-temblor-frenado' : ''
        }`}
      >
        <Starfield velocityMultiplierRef={multiplierRef} />
      </div>

      {/* Vignette de frenado */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-30"
        style={{
          boxShadow:
            fase === 'frenando'
              ? 'inset 0 0 180px 60px rgba(0, 0, 0, 0.85)'
              : 'inset 0 0 60px 20px rgba(0, 0, 0, 0.35)',
          opacity: fase === 'frenando' || fase === 'aterrizando' ? 1 : 0,
          transition: 'box-shadow 0.6s ease-out, opacity 0.6s ease-out',
        }}
      />

      <header
        ref={navbarRef}
        key={fase === 'viajando' ? 'viajando' : fase === 'intro' ? 'intro' : 'visible'}
        className={`fixed inset-x-0 top-0 z-20 border-b border-surface/80 bg-void/70 backdrop-blur-md ${
          fase === 'frenando' || fase === 'aterrizando' || fase === 'idle'
            ? 'animate-navbar-entrada'
            : ''
        }`}
        style={
          fase === 'frenando' || fase === 'aterrizando' || fase === 'idle'
            ? undefined
            : {
                opacity: fase === 'viajando' || fase === 'intro' ? 0 : 1,
                transform:
                  fase === 'viajando' || fase === 'intro'
                    ? 'translateY(-86px)'
                    : 'translateY(0)',
                transition: 'opacity 0.7s ease-in, transform 0.7s cubic-bezier(0.55, 0, 1, 0.45)',
              }
        }
      >
        <div className="mx-auto max-w-6xl px-4 py-2">
          <div className="flex items-center justify-between gap-4">
            <div className="flex min-w-0 items-center gap-4">
              <button
                type="button"
                onClick={() => irA('inicio')}
                className="flex min-h-11 shrink-0 items-center gap-2 font-hud text-xs font-semibold uppercase tracking-[0.3em] text-lumen transition-colors duration-300 hover:text-flare"
              >
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 shrink-0 rounded-full bg-flare shadow-[0_0_10px_rgba(224,82,82,0.9)]"
                />
                <span className="shrink-0">LL · Orbital</span>
              </button>

              <span
                key={activa}
                aria-hidden="true"
                className="hidden min-w-0 items-center gap-2 font-hud text-[11px] uppercase tracking-[0.25em] text-ash md:flex"
              >
                <span className="h-1 w-1 shrink-0 rounded-full bg-stellar" />
                <span className="truncate">{seccionActual.contexto}</span>
              </span>
            </div>

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
        ref={contenedorRef}
        id="contenido-principal"
        className={`fixed inset-x-0 bottom-0 z-10 ${
          fase === 'frenando' ||
          fase === 'viajando' ||
          fase === 'intro' ||
          fase === 'aterrizando'
            ? 'overflow-hidden'
            : 'overflow-y-auto overflow-x-hidden'
        }`}
        style={{ top: 'var(--altura-navbar, 0px)' }}
      >
        <div className="flex min-h-full w-full items-center justify-center px-4 pt-6 pb-10 md:pt-10">
          <div
            className={`relative m-auto w-full max-w-5xl ${
              fase === 'aterrizando' ? 'animate-aterrizaje-bloque' : ''
            }`}
            style={{
              opacity: mostrarContenido ? 1 : 0,
              transform:
                !mostrarContenido && fase === 'viajando'
                  ? 'translateY(46vh) scale(0.8)'
                  : 'translateY(0) scale(1)',
              filter: !mostrarContenido && fase === 'viajando' ? 'blur(14px)' : 'blur(0px)',
              transition:
                fase === 'aterrizando'
                  ? 'none'
                  : 'opacity 0.28s ease-in, transform 0.7s cubic-bezier(0.55, 0, 1, 0.45), filter 0.65s ease-in',
              pointerEvents: mostrarContenido ? 'auto' : 'none',
            }}
          >
            <Contenido key={activa} irA={irA} />
          </div>
        </div>
        <div
          ref={scrollThumbRef}
          className={`scroll-indicador ${scrollVisible ? 'is-visible' : ''}`}
          aria-hidden="true"
        >
          <div ref={scrollThumbBarRef} className="scroll-indicador__thumb" />
        </div>
      </main>
    </div>
  );
}