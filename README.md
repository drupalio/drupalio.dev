# drupalio.dev

Portfolio personal de Drupalio — sitio Nuxt 3 con contenido bilingüe (en/es), CV interactivo, y blog técnico sobre desarrollo web, seguridad y AI.

## Stack

| Capa | Tecnología |
|------|-----------|
| Framework | Nuxt 3.16+ (Vue 3.5, Vite) |
| UI | Nuxt UI v3, PrimeVue 4, GSAP |
| Contenido | @nuxt/content v3 (Markdown) |
| i18n | @nuxtjs/i18n (en/es) |
| Estado | Pinia |
| Despliegue | GitHub Pages + GitHub Actions |

## Metodología

Este proyecto sigue **Spec-Driven Development**, **Harness Engineering** y **Loop Engineering**:

- **Specs primero**: Toda funcionalidad comienza con una especificación en `content/blueprints/`
- **Verificador explícito**: Nunca declarar completo sin pasar verificadores
- **Bucles, no prompts**: Diseñar loops que el agente ejecuta autónomamente

Ver `AGENTS.md` para la constitución completa.

## Estructura

```
drupalio.dev/
├── AGENTS.md                    # Harness principal
├── .opencode/
│   ├── AGENTS.md                # Configuración de opencode
│   └── skills/                  # Skills del proyecto
├── content/
│   ├── internal/                # Documentación interna
│   └── blueprints/              # Especificaciones de features
├── components/                  # Componentes Vue
├── locales/                     # Traducciones en/es
├── store/                       # Estado Pinia
├── public/                      # Assets estáticos
├── app.vue                      # Entry point
└── nuxt.config.ts               # Configuración Nuxt
```

## Comandos

```bash
npm run dev        # Desarrollo
npm run build      # Build producción
npm run generate   # Exportación estática
npm run preview    # Vista previa
npm run lint       # ESLint
npx nuxi typecheck # TypeScript
```
