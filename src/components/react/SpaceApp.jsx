import { useState } from 'react';
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

export default function SpaceApp() {
  const [activa, setActiva] = useState('inicio');
  const seccionActual = SECCIONES.find((s) => s.id === activa);
  const Contenido = seccionActual.Componente;

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Starfield />

      <header className="fixed inset-x-0 top-0 z-20 border-b border-surface/80 bg-void/70 backdrop-blur-md">
        <nav
          aria-label="Navegación de secciones"
          className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-3"
        >
          <button
            type="button"
            onClick={() => setActiva('inicio')}
            className="flex items-center gap-2 font-hud text-xs font-semibold uppercase tracking-[0.3em] text-lumen transition-colors duration-300 hover:text-flare"
          >
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-full bg-flare shadow-[0_0_10px_rgba(224,82,82,0.9)]"
            />
            LL · Orbital
          </button>
          <ul className="flex flex-wrap items-center gap-2 sm:gap-4">
            {SECCIONES.map((s) => (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => setActiva(s.id)}
                  aria-current={activa === s.id ? 'true' : undefined}
                  className={`font-hud text-[11px] uppercase tracking-widest transition-colors duration-300 sm:text-xs ${
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
      </header>

      <main
        id="contenido-principal"
        className="relative z-10 mx-auto flex min-h-screen max-w-6xl items-center px-4 pt-24 pb-12"
      >
        <Contenido key={activa} irA={setActiva} />
      </main>
    </div>
  );
}
