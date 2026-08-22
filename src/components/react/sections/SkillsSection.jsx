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
      <p className="animate-aterrizaje font-hud text-xs uppercase tracking-[0.4em] text-plasma">
        Arsenal · Módulos instalados
      </p>
      <h2
        id="titulo-skills"
        className="animate-aterrizaje mt-4 font-display text-4xl font-bold uppercase tracking-wide sm:text-5xl"
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
            <h3 className="font-hud text-xs uppercase tracking-widest text-stardust">
              {grupo.etiqueta}
            </h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {skills[grupo.clave].map((skill) => (
                <li
                  key={skill}
                  className={`rounded-full border px-4 py-1.5 font-hud text-xs ${
                    grupo.clave === 'aprendiendo'
                      ? 'border-dashed border-stardust/40 text-stardust'
                      : 'border-nebula/50 bg-nebula/10 text-starlight'
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
