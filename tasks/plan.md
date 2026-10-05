# Implementation Plan: Migración Nuxt 4 + Ecosistema v4

## Overview
Migrar el portfolio de Nuxt 3.21 a Nuxt 4 y alinear `@nuxt/ui`, `@nuxt/image`, `@nuxt/icon`, `@nuxtjs/color-mode` a sus majors vigentes. El proyecto no usa componentes `U*` directamente ni `ButtonGroup/PageMarquee/PageAccordion/Form/nullify`, por lo que el riesgo de UI v4 es bajo. Se mantiene la estructura de carpetas v3 (Nuxt 4 la autodetecta).

## Architecture Decisions
- Nuxt primero (UI v4 exige Nuxt ≥4.1), luego módulos uno por paso.
- No mover a estructura `app/` — mantener v3 autodetectada para minimizar diff.
- `vue`/`vue-router` los dicta Nuxt, no se actualizan manual. `eslint` 9 y `typescript` 5.9 quedan fuera de alcance.
- `image.screens` ya define `xs`/`xxl` personalizados, compatible con Image v2 que los eliminó por defecto.

## Task List

### Phase 1: Núcleo Nuxt 4
- [ ] Task 1: Actualizar `nuxt` a `^4.0.0`, `nuxt prepare`, corregir breaking changes.

### Checkpoint: Núcleo
- [ ] typecheck + build en verde sobre Nuxt 4 con módulos v3.

### Phase 2: Módulos v4
- [ ] Task 2: `@nuxt/ui` v3→v4 (+ `tailwindcss` si la guía lo exige).
- [ ] Task 3: `@nuxt/image` v1→v2 + `@nuxt/icon` v1→v2.
- [ ] Task 4: `@nuxtjs/color-mode` v3→v4, `@nuxt/content`/`@nuxt/fonts` a minors vigentes.

### Checkpoint: Módulos
- [ ] `pnpm lint`, `nuxi typecheck`, `pnpm build`, `pnpm generate` en verde. Revisión visual `/`, `/blog`, `/projects/*`.

### Phase 3: Cierre
- [ ] Task 5: Actualizar blueprint a `done`, commit en rama.

## Risks and Mitigations
| Risk | Impact | Mitigation |
|------|--------|------------|
| Breaking de UI v4 (tokens/estilos) | Med | Sin uso `U*` directo; diff visual en 3 rutas |
| Estructura `app/` v4 | Low | No migrar carpetas; autodetección v3 |
| `image.screens` xs/xxl | Low | Config ya los define explícitamente |
| `color-mode` v4 behavior | Low | Verificar toggle claro/oscuro manual |

## Open Questions
- Ninguna bloqueante. Codemods (`nuxt/4/migration-recipe`) disponibles si aparecen errores típicos.
