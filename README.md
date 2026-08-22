# 🌌 Portfolio — Lucía Lemes

Portfolio personal con temática espacial inmersiva, construido como una Single
Page Application que simula un viaje por el espacio profundo. Cada sección es
una estación de la nave y la escena completa reacciona a una fuente de energía
roja que ilumina el universo desde lejos.

> 🔗 **Sitio en vivo:** [portfolio-seven-hazel-24.vercel.app](https://portfolio-seven-hazel-24.vercel.app)

> Concepto visual: **Energía Estelar** — oscuridad profunda, glows suaves y un
> rojo que funciona como luz física dentro del espacio, no como color de UI.

## ✨ Características

- **Navegación SPA** entre secciones sin recarga, con animaciones de aterrizaje orbital
- **Fondo estelar procedural** en canvas: estrellas cálidas con parpadeo, deriva
  lenta y una estrella roja lejana pulsante que ilumina la escena
- **Cursor HUD personalizado** (solo desktop): retícula con estela de polvo
  estelar, estados de hover sobre botones y encuadre sobre tarjetas
- **Skeleton cards** con barrido de luz al cargar los proyectos
- **Accesibilidad**: respeta `prefers-reduced-motion`, navegación por teclado,
  skip link, landmarks semánticos y anuncios para lectores de pantalla

## 🛠️ Stack

| Tecnología | Uso |
|---|---|
| [Astro](https://astro.build/) | Arquitectura de islas, HTML estático + SEO |
| [React](https://react.dev/) | Islas interactivas (escena espacial, navegación, efectos) |
| [Tailwind CSS v4](https://tailwindcss.com/) | Tokens de diseño vía `@theme` |
| [Vercel](https://vercel.com/) | Despliegue |

## 🎨 Sistema de diseño

Paleta definida en `src/styles/global.css`:

| Token | Hex | Rol |
|---|---|---|
| `void` | `#090708` | Vacío espacial / fondo principal |
| `abyss` | `#120B0C` | Fondo secundario |
| `surface` | `#211315` | Paneles y superficies elevadas |
| `ember` | `#6E1F26` | Rojo profundo / energía contenida |
| `stellar` | `#B8323C` | Rojo estelar / acento principal |
| `flare` | `#E05252` | Rojo energético / highlights |
| `lumen` | `#E7D8C8` | Blanco cálido / texto principal |
| `ash` | `#A69B98` | Gris cálido / texto secundario |

Tipografía: **Space Grotesk** (títulos y cuerpo) + **DM Mono** (detalles HUD).

## 🚀 Desarrollo local

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # build de producción en dist/
```

## ☁️ Despliegue

El sitio se despliega automáticamente en [Vercel](https://vercel.com): cada
push a `main` genera un despliegue de producción, y los pushes a `dev`
generan previews temporales para probar sin tocar producción.

## 📂 Estructura

```
src/
├── assets/          # Imágenes optimizadas por Astro
├── components/
│   ├── astro/       # Componentes estáticos (SEO)
│   └── react/       # Islas interactivas + secciones
├── data/            # Contenido editable (profile, projects, skills)
├── layouts/         # BaseLayout con SEO y fuentes
├── pages/           # index.astro (única página de la SPA)
└── styles/          # global.css con tokens @theme
```

El contenido se edita desde `src/data/*.json` — no hace falta tocar componentes.

## 🌿 Ramas

- `main` — versión estable
- `dev` — desarrollo activo
