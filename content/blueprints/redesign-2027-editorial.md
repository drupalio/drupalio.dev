---
title: "Rediseño 2027 v3 — editorial técnico"
status: planned
created: 2026-10-05
locale: es
---

# Rediseño 2027 v3 — editorial técnico

## Qué (What)
Como visitante del portfolio, quiero una revista técnica personal densa y
editable de leer, para entender en segundos quién es Ricardo y profundizar
donde me interese.

## Por qué (Why)
Dos intentos descartados (vidrio expresivo, oscuro premium). Dirección nueva
elegida desde tendencias 2027: editorial técnico. Especificación en
`DESIGN.md` (ENERGY 2 / RHYTHM 3 / MOTION 1).

## Criterios de Aceptación
- [ ] CA1: Hero editorial (nombre oversize, meta real, entradilla, CTAs).
- [ ] CA2: Proyectos home como índice editorial + un flagship, sin tarjetas
  por defecto.
- [ ] CA3: Secciones numeradas con regla superior y composiciones variadas.
- [ ] CA4: Blog, slugs y footer entonados al sistema; titulares display.
- [ ] CA5: Contrastes AA con números; MOTION 1; contenido visible sin JS.
- [ ] CA6: Verificadores en verde + Delivery Gate con reporte PASS.

## Stack Técnico
- Nuxt 4, Tailwind v4, `@nuxt/fonts` (Cabinet Grotesk fontshare + Geist).
- Sin dependencias nuevas.

## Verificadores
- Lint: `pnpm lint` · Typecheck: `nuxi typecheck` (grep `error TS` = 0)
- Build: `pnpm build` · Estático: `pnpm generate`
- Visual: `pnpm dev`, `/`, `/blog`, `/projects/*`, ambos temas y móvil.

## Notas
- Rama: `chore/redesign-2027-editorial` (base limpia `chore/nuxt4-migration`).
- Riesgos: densidad que se vuelva muro de texto (entradillas y reglas
  mandan); índice con columnas genéricas (columnas desde el contenido).
