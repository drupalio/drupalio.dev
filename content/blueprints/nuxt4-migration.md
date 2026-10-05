---
title: "Migración Nuxt 4 + Ecosistema v4"
status: draft
created: 2026-10-05
locale: es
---

# Migración Nuxt 4 + Ecosistema v4

## Qué (What)
Como mantenedor del portfolio, quiero migrar de Nuxt 3 a Nuxt 4 y alinear el ecosistema (@nuxt/ui, @nuxt/image, @nuxt/icon, @nuxtjs/color-mode) a sus majors vigentes para eliminar deuda de versiones.

## Por qué (Why)
`npm outdated` (2026-10-05) muestra 7 majors behind: `nuxt 3.21→4.5`, `@nuxt/ui 3.3→4.11`, `@nuxt/image 1.11→2.1`, `@nuxt/icon 1.15→2.5`, `@nuxtjs/color-mode 3.5→4.0`, `vue-router 4.6→5.3`, `eslint 9→10`. Quedarse en v3 aumenta riesgo de parches de seguridad perdidos y bloquea features de Nuxt 4.

## Criterios de Aceptación
- [ ] CA1: `nuxt` en `^4.0.0` con `compatibilityVersion: 4` o estructura v4, sin warnings de compat en `build`.
- [ ] CA2: `@nuxt/ui`, `@nuxt/image`, `@nuxt/icon`, `@nuxtjs/color-mode` en majors vigentes y sin breaking visible en `/`, `/blog`, `/projects/*`.
- [ ] CA3: `vue-router` / `vue-i18n` evaluados: quitar si los provee Nuxt o fijar versión requerida por Nuxt 4.
- [ ] CA4: Verificadores en verde: `pnpm lint`, `nuxi typecheck`, `pnpm build`, `pnpm generate`.

## Stack Técnico
- Nuxt 4, @nuxt/content 3.x compatible con v4, @nuxt/ui v4, @nuxt/image v2, @nuxt/icon v2
- Guía oficial de migración Nuxt 3→4 + changelogs de cada módulo
- Estrategia: rama aislada, un módulo por paso, `pnpm outdated` como evidencia entre pasos

## Verificadores
- Deuda: `npm outdated`
- Lint: `pnpm lint`
- Typecheck: `nuxi typecheck`
- Preview: `pnpm dev` y navegar a `/`, `/blog`, `/projects/quizzer-ai-interview-system`
- Build estático: `pnpm generate`

## Notas
- Ya hecho (2026-10-05, verificado pendiente): `compatibilityDate` → `2025-07-15`, eliminado `@nuxtjs/i18n` muerto (no estaba en `modules`, i18n real en `plugins/i18n.js`).
- Riesgos: breaking changes en `@nuxt/ui` v3→v4 (tokens/clases), `@nuxt/image` v1→v2 (providers), `color-mode` v3→v4, `vue-router` v5 (revisar si Nuxt 4 lo exige o no).
- No tocar en este blueprint: drift de docs (`primevue/pinia/gsap` en AGENTS.md y `architecture.md`), `.nuxtrc` con `test-utils` huérfano, `vue`/`vue-router`/`vue-i18n` directos pendientes de decisión.
- Estado actual verificado: lint/typecheck/build en verde sobre Nuxt 3 antes de migrar.
