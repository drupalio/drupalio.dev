---
title: "Expansión de Banca Digital"
description: "Expansión de microservicios y modernización de la plataforma de banca digital"
company: "Globant"
role: "Java Microservices Developer"
period: "2020-2022"
category: "banking"
stack: ["Java", "Spring Boot", "Microservices", "Kafka", "Redis"]
metrics:
  - label: "Features lanzados"
    value: "15+"
  - label: "Time to market"
    value: "-65%"
challenge: "La plataforma de banca digital de HSBC necesitaba features rápido — pero la arquitectura existente requería releases coordinados entre 8 equipos. Time-to-market de 3+ meses."
architecture: "Expansión del ecosistema de microservicios con servicios event-driven. Sistema de feature flags para rollouts progresivos. Kafka event store habilitó CQRS para dashboards optimizados."
results: "15+ features bancarias lanzadas en 18 meses. Time-to-market de 3 meses a 3 semanas. Feature flags permitieron rollout progresivo 5% → 25% → 100%."
status: "shipped"
featured: false
order: 5
---

## Reto

HSBC necesitaba lanzar features de banca digital más rápido. Cada nuevo feature requería releases coordinados entre 8 equipos. Un mal despliegue podía afectar a todos los clientes.

## Arquitectura

**Expansión event-driven**: Nuevos servicios se suscribían a eventos de dominio del Kafka event store. Sin acoplamiento directo a bases de datos.

**Feature flags**: Servicio de feature flags con Redis. Nuevos features ocultos detrás flags con rollout progresivo: 5% (testing interno) → 25% (canary) → 100%.

**CQRS para dashboards**: Dashboards read-heavy usaron CQRS — eventos del lado de escritura proyectados en modelos de lectura optimizados.

## Resultados

- **15+ features** lanzadas en 18 meses
- **Time-to-market**: 3 meses → 3 semanas por feature
- **Releases sin downtime**: Feature flags permiten rollback instantáneo
- **Latencia de dashboards**: Proyecciones CQRS redujeron query time de 2s a 200ms