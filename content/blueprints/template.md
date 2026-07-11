# Template de Especificación

Usar este template para todo nuevo feature en `content/blueprints/[feature-name].md`.

```markdown
---
title: "[Nombre del Feature]"
status: draft
created: YYYY-MM-DD
locale: es
---

# [Nombre del Feature]

## Qué (What)
<!-- Descripción del problema o necesidad desde la perspectiva del usuario. -->
Como [tipo de usuario], quiero [acción] para [beneficio].

## Por qué (Why)
<!-- Justificación de negocio o valor. ¿Por qué vale la pena construir esto? -->

## Criterios de Aceptación
<!-- Verificables, medibles, sin ambigüedad. -->
- [ ] CA1: [descripción]
- [ ] CA2: [descripción]
- [ ] CA3: [descripción]

## Stack Técnico
<!-- Tecnologías y patrones a usar. -->
- [Framework/liberría]
- [Patrón de diseño]
- [API endpoints si aplica]

## Verificadores
<!-- Comandos exactos para verificar. -->
- Test: `npm run test`
- Lint: `npm run lint`
- Typecheck: `npx nuxi typecheck`
- Preview: `npm run dev` y navegar a [ruta]

## Notas
<!-- Información adicional, riesgos, dependencias. -->
```

## Estados de un Blueprint
- `draft` — En definición
- `clarified` — Ambigüedades resueltas
- `planned` — Plan técnico creado
- `implementing` — En implementación
- `done` — Implementado y verificado
- `cancelled` — No se procede
