---
title: "Rediseño casebook técnico expresivo"
status: done
created: 2026-10-05
locale: es
---

# Rediseño casebook técnico expresivo

## Qué (What)

Recomponer la home como casebook técnico expresivo según `DESIGN.md`:
prueba de trabajo primero, composiciones variadas por contenido, un solo
artefacto firma basado en un caso real, sin el paquete anterior
(vidrio + brutalismo + grano + cinética).

## Por qué (Why)

La home actual se lee plana: secciones con la misma composición
(etiqueta + regla + tarjetas), cuadrícula bento por defecto, animaciones de
entrada que esconden contenido, snippet de código ficticio y métricas de
respaldo inventadas. El propietario rechazó iteraciones previas por planas.

## Alcance

- Home (`pages/index.vue`) y sus secciones; `main.css`; `AppHeader`;
  `error.vue` (botón). Sin dependencias nuevas.
- Firma: `TraceLedger` (ruta de petición del caso de modernización
  bancaria, datos reales del frontmatter, realce CSS sin JS).
- Proyectos: flagship + par asimétrico + filas compactas.
- Quitar: `AILabCard` (snippet ficticio), `CareerTimeline` (duplica el
  timeline), `SoftSkillsCloud` (píldoras genéricas).
- `GitHubCard` con estados honestos; API de contribuciones sin datos
  aleatorios de respaldo; bandera `stale` en respaldos de la API.
- Sin enlace de CV descargable hasta que exista el archivo real (R-24).

## Criterios de Aceptación

- [x] CA1: hero con foco visible + artefacto firma; contenido legible sin JS.
- [x] CA2: secciones con composiciones distintas; sin bento por defecto.
- [x] CA3: cero números sin fuente; métricas solo desde frontmatter o API.
- [x] CA4: teclado, móvil y `prefers-reduced-motion` verificados por código.
- [x] CA5: `lint`, `typecheck`, `build`, `generate` en verde + Delivery Gate.

## Verificadores

- `npm run lint` · `npx nuxi typecheck` · `npm run build` · `npm run generate`

## Notas

- Rama: `chore/redesign-2027-editorial`.
- Riesgo: densidad tipo muro de texto (entradillas cortas mandan).
- Paleta y tipografías se mantienen (neutros + ámbar tonal, Cabinet
  Grotesk display, Geist cuerpo, Geist Mono solo datos); la confirmación
  final es del propietario.
