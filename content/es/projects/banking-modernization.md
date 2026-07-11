---
title: "Modernización de Plataforma Bancaria"
description: "Modernización de banca en línea con microservicios usando el framework YAPE"
company: "Globant"
role: "Java Microservices Developer"
period: "2021-2023"
category: "banking"
stack: ["Java", "Spring Boot", "Microservices", "YAPE Framework", "Kubernetes"]
metrics:
  - label: "Latencia"
    value: "-73%"
  - label: "Throughput"
    value: "12M req/día"
challenge: "La plataforma bancaria monolítica no soportaba el tráfico en horas pico. Las transacciones agotaban el timeout. Los ciclos de despliegue tomaban semanas."
architecture: "Descompuse el monolito en 40+ microservicios Spring Boot usando el framework YAPE. Cada servicio era dueño de su base de datos (poliglota: PostgreSQL, Redis, MongoDB). Comunicación REST para flujos síncronos y Kafka para event-driven. Desplegado en Kubernetes con blue-green deployments vía GitHub Actions."
results: "Latencia reducida 73% en rutas críticas. Plataforma maneja 12M peticiones/día con 99.97% uptime. Ciclo de despliegue de 3 semanas a 2 horas."
status: "shipped"
featured: true
order: 2
---

## Reto

La plataforma de banca en línea del Banco Nacional del Perú era un monolito que colapsaba bajo carga. El tráfico en horas pico (procesamiento de nómina, pago de servicios) causaba timeouts. Los despliegues requerían downtime coordinado — el equipo liberaba cada 3 semanas.

## Arquitectura

**Estrategia de descomposición**: Identifiqué contextos acotados (cuentas, transferencias, pagos, auth, notificaciones) y extraje cada uno como microservicio Spring Boot con el framework YAPE.

**Arquitectura de datos**: Cada servicio era dueño de su base de datos:
- PostgreSQL para servicios transaccionales (ACID)
- Redis para sesiones y rate limiting
- MongoDB para logs de auditoría (escritura intensiva, esquema flexible)

**Comunicación**:
- Síncrona: REST para flujos request/response
- Asíncrona: Apache Kafka para operaciones event-driven

**Despliegue**: Kubernetes con estrategia blue-green. CI/CD con GitHub Actions.

## Resultados

- **Latencia**: Ruta crítica (confirmación de transferencia) 2.4s → 0.65s
- **Throughput**: 12M peticiones/día (antes 4M)
- **Uptime**: 99.97% (antes 99.2%)
- **Frecuencia de despliegue**: Cada 3 semanas → múltiple veces al día
- **MTTR**: 4 horas → 12 minutos