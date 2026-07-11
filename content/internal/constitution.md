# Constitución del Proyecto

## Identidad
**drupalio.dev** es el portfolio personal de Drupalio. Un sitio web bilingüe (español/inglés) que funciona como CV interactivo, blog técnico y carta de presentación profesional.

## Valores
1. **Calidad sobre cantidad** — Cada línea de código tiene un propósito
2. **Rendimiento primero** — Lighthouse 90+ en todas las métricas
3. **Accesibilidad** — WCAG AA como mínimo
4. **Mantenibilidad** — Código legible, tipado, documentado
5. **Internacionalización** — Contenido nativo en ambos idiomas

## Stack Decidido
- **Framework**: Nuxt 3.16+ — SSR + SSG, ecosistema maduro
- **UI**: Nuxt UI v3 + PrimeVue 4 — componentes probados, accesibles
- **Animaciones**: GSAP — para transiciones y micro-interacciones
- **Contenido**: @nuxt/content v3 — Markdown con frontmatter, i18n nativo
- **Estado**: Pinia — store simple para preferencias de idioma
- **Despliegue**: GitHub Pages + GitHub Actions — zero-cost, CI/CD integrado

## Decisiones Arquitectónicas

### Por qué Nuxt y no otro framework
- SSR para SEO en contenido público
- SSG para deploy estático en GitHub Pages
- Ecosistema @nuxt/* maduro (content, image, icon, fonts)
- i18n integrado con @nuxtjs/i18n

### Por qué dos librerías UI
- Nuxt UI v3 para componentes base (botones, navegación, layout)
- PrimeVue 4 para componentes complejos (CV interactivo, timeline)
- GSAP para animaciones que ninguna librería UI cubre

### Por qué Pinia
- Estado mínimo (solo idioma y tema)
- No necesitamos Vuex ni stores complejos
- Pinia es el estándar de facto en Vue 3

## Convenciones de Código
- TypeScript estricto en toda la aplicación
- Componentes en Options API (consistente con PrimeVue)
- Stores en Composition API (estándar Pinia)
- ESLint flat config para consistencia
- Nombres de archivos en PascalCase para componentes, camelCase para utilities
