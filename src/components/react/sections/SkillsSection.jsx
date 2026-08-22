import skills from '../../../data/skills.json';

const GRUPOS = [
  { clave: 'lenguajes', etiqueta: 'Lenguajes' },
  { clave: 'frameworks', etiqueta: 'Frameworks' },
  { clave: 'backend', etiqueta: 'Backend y datos' },
  { clave: 'herramientas', etiqueta: 'Herramientas' },
  { clave: 'aprendiendo', etiqueta: 'Aprendiendo' },
];

export default function SkillsSection() {
  return (
    <section aria-labelledby="titulo-skills" className="w-full">
      <p className="animate-aterrizaje flex items-center gap-2.5 font-hud text-xs uppercase tracking-[0.4em] text-stellar">
        <span
          aria-hidden="true"
          className="h-1 w-1 rounded-full bg-flare shadow-[0_0_10px_rgba(224,82,82,0.9)]"
        />
        Arsenal · Módulos instalados
      </p>
      <h2
        id="titulo-skills"
        className="animate-aterrizaje mt-5 font-display text-4xl font-bold uppercase tracking-wide text-lumen sm:text-5xl"
        style={{ animationDelay: '120ms' }}
      >
        Habilidades
      </h2>
      <div className="mt-10 space-y-8">
        {GRUPOS.map((grupo, i) => (
          <div
            key={grupo.clave}
            className="animate-aterrizaje"
            style={{ animationDelay: `${240 + i * 100}ms` }}
          >
            <h3 className="font-hud text-xs uppercase tracking-widest text-ash">
              {grupo.etiqueta}
            </h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {skills[grupo.clave].map((skill) => (
                <li
                  key={skill}
                  className={`rounded-full border px-4 py-1.5 font-hud text-xs transition-colors duration-500 ${
                    grupo.clave === 'aprendiendo'
                      ? 'border-dashed border-ash/40 text-ash hover:border-ember hover:text-lumen'
                      : 'border-ember/60 bg-ember/10 text-lumen hover:border-stellar/60'
                  }`}
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
