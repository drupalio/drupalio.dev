# Arquitectura del Proyecto

## Diagrama de Capas

```
┌─────────────────────────────────────────────┐
│                  App (app.vue)               │
│  Resume + theme toggle + language toggle    │
├─────────────────────────────────────────────┤
│              Components Layer               │
│  Resume.vue, HarvardCV.vue                  │
├─────────────────────────────────────────────┤
│              Plugins Layer                   │
│  i18n.js, pinia.js, primevue.js,            │
│  fontawesome.js, gsap.js                    │
├─────────────────────────────────────────────┤
│              State Layer (Pinia)            │
│  store/languageStore.js                     │
├─────────────────────────────────────────────┤
│           i18n Layer (@nuxtjs/i18n)         │
│  locales/en.json, locales/es.json           │
├─────────────────────────────────────────────┤
│           Content Layer (@nuxt/content)      │
│  content/ (Markdown + frontmatter)           │
├─────────────────────────────────────────────┤
│         UI Component Libraries              │
│  Nuxt UI v3 + PrimeVue 4 + GSAP            │
├─────────────────────────────────────────────┤
│           Nuxt Core / Vite                  │
│  SSR + SSG, TypeScript, ESLint             │
└─────────────────────────────────────────────┘
```

## Flujo de Datos

### Idioma
```
User action → toggleLanguage() en app.vue
  → $i18n.global.locale.value = newLanguage
  → localStorage.setItem('language', newLanguage)
  → Componentes reaccionan via $t() / useI18n()
```

### Contenido
```
content/*.md → @nuxt/content parsea frontmatter + body
  → Componente query con useAsyncData / useContent()
  → Renderiza con ContentRenderer / Markdown
```

### Tema
```
User action → toggleTheme() en app.vue
  → document.body.classList toggle neo-theme-tokyo-night / neo-theme-light
  → localStorage.setItem('theme', dark|light)
  → CSS variables reaccionan via :root y .neo-theme-light
```

## Rutas (planeadas)
- `/` — CV interactivo (Resume, theme, i18n)
- `/blog` — Lista de artículos
- `/blog/[slug]` — Artículo individual
- `/about` — Sobre mí

## Despliegue
- GitHub Actions en push a `main`
- `npm run generate` produce `dist/`
- GitHub Pages sirve desde `dist/`
- URL: `https://drupalio.github.io/drupalio.dev/` (o dominio personalizado)

## Dependencias Clave
| Paquete | Versión | Propósito |
|---------|---------|-----------|
| nuxt | ^3.16.2 | Framework |
| @nuxt/content | ^3.5.1 | CMS basado en archivos |
| @nuxtjs/i18n | ^9.5.3 | Internacionalización (en/es) |
| @nuxt/ui | ^3.1.0 | Componentes UI base |
| primevue | ^4.3.3 | Componentes avanzados |
| pinia | ^2.3.1 | Estado global |
| gsap | ^3.12.7 | Animaciones |
| @fortawesome/vue-fontawesome | ^3.0.8 | Iconos |

## Módulos Nuxt activos (nuxt.config.ts)
- @nuxt/content, @nuxt/eslint, @nuxt/fonts, @nuxt/icon
- @nuxt/image, @nuxt/scripts, @nuxt/test-utils, @nuxt/ui
- @nuxtjs/i18n (locales: en, es, defaultLocale: es, strategy: no_prefix)

## Archivos eliminados (obsoletos)
- `App.vue` — Duplicado de `app.vue` (Nuxt usa `app.vue` en minúscula)
- `main.js` — Bootstrap legacy de Vue, Nuxt no lo usa
- `store.js` — Store duplicado, `store/languageStore.js` es el vigente
