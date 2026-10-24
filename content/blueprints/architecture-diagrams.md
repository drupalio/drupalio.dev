---
title: "Diagramas de arquitectura para casos de estudio"
status: done
created: 2026-10-24
locale: es
---

# Diagramas de arquitectura para casos de estudio

## Qué (What)

Como reclutador o par técnico, quiero entender visualmente dos flujos reales del trabajo de Ricardo sin depender de animaciones ni de una explicación exclusivamente gráfica.

## Por qué (Why)

Los casos de QuizzerA y de procesamiento batch de Disney describen pipelines con varios pasos y mecanismos de recuperación. Un diagrama Pele por caso ayuda a escanear la arquitectura; el texto y las etiquetas del SVG mantienen la información accesible para lectores, buscadores y agentes.

## Criterios de Aceptación

- [x] CA1: QuizzerA muestra transcripción, servicio Spring Boot, evaluación con GPT, publicación en Kafka y seguimiento/notificaciones.
- [x] CA2: El caso batch muestra los flujos de facturación y pagos de cine, procesamiento por chunks con checkpoint y el manejo documentado de registros fallidos con Kafka DLQ y retry.
- [x] CA3: Ambos diagramas funcionan en español e inglés, en tema claro y oscuro, y se mantienen dentro del ancho disponible en pantallas estrechas.
- [x] CA4: Cada diagrama incluye un título y un resumen legible en HTML; el SVG queda decorativo para tecnologías de asistencia.
- [x] CA5: Los diagramas aparecen solo en sus casos de estudio, con las demás rutas sin cambios.

## Stack Técnico

- Pele para renderizar Mermaid como SVG con SSR.
- Nuxt Content para declarar el tipo de diagrama por proyecto.
- CSS variables existentes del tema para igualar fondo, texto, bordes y acento.

## Verificadores

- Lint: `npm run lint`
- Typecheck: `npx nuxi typecheck`
- Generación estática: `npm run generate`
- Revisar HTML generado, tema claro/oscuro y anchos de escritorio/móvil.

## Notas

- No añadir un diagrama a la portada: ya existe TraceLedger para modernización bancaria.
- No afirmar arquitectura, métricas o mecanismos que no aparezcan en los case studies.
- El Mermaid estático es confiable; no se aceptan diagramas arbitrarios de contenido no confiable.
