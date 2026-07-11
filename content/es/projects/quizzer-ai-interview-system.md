---
title: "QuizzerA — Sistema de Entrevistas con IA"
description: "GPT personalizado para proyectos clave y desarrollo de un sistema de seguimiento de entrevistas para mejorar el feedback y la eficiencia"
company: "Globant"
role: "Java Microservices Developer"
period: "2022-2024"
category: "ai"
stack: ["Java", "Spring Boot", "GPT", "AI", "Microservices"]
metrics:
  - label: "Ciclo de feedback"
    value: "-60%"
  - label: "Throughput de entrevistas"
    value: "+3x"
challenge: "El feedback de las entrevistas era lento, inconsistente y manual. Los candidatos esperaban días por resultados. Los entrevistores dedicaban horas a escribir notas."
architecture: "Construí un asistente de entrevistas con GPT como microservicio Spring Boot. El sistema capturaba transcripciones, generaba feedback estructurado con prompts GPT personalizados, y enrutaba resultados por un pipeline event-driven vía Apache Kafka. Un scheduler automatizaba los siguientes pasos."
results: "Reducción del ciclo de feedback de 5 días a menos de 48 horas. Se triplicó el throughput de entrevistas por entrevistador. Feedback estandarizado entre equipos."
status: "shipped"
featured: true
order: 1
---

## Reto

El feedback de entrevistas a escala era el cuello de botella. Con cientos de candidatos en múltiples clientes, los entrevistadores pasaban más tiempo documentando que evaluando. La calidad del feedback variaba — algunos escribían párrafos, otros viñetas. Los candidatos esperaban hasta una semana.

## Arquitectura

1. **Captura de transcripciones** — Grabaciones transcritas vía speech-to-text, enviadas al microservicio por REST
2. **Procesamiento GPT** — Prompts personalizados evaluaron transcripciones contra rúbricas específicas por rol, generando feedback JSON estructurado
3. **Pipeline de eventos** — Resultados publicados en topics de Apache Kafka, consumidos por el servicio de notificaciones y el scheduler de seguimiento
4. **Automatización de seguimiento** — Job programado verificaba feedback pendiente, enviaba recordatorios y escalaba items obsoletos

## Resultados

- Ciclo de feedback: 5 días → menos de 48 horas
- Throughput de entrevistas: 3x por entrevistador
- Consistencia de feedback: estructura GPT eliminó formatos ad-hoc
- Satisfacción de hiring managers: JSON estructurado habilitó analítica en dashboards