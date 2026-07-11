---
title: "Microservicios Resilientes: Lecciones de Banca a Escala"
description: "Lo que aprendí modernizando plataformas bancarias — de monolito a 40+ microservicios manejando 12M peticiones/día."
date: "2024-12-15"
tags: ["microservicios", "banca", "arquitectura", "kubernetes"]
readingTime: 8
draft: false
---

# Microservicios Resilientes

Después de modernizar dos plataformas bancarias, aprendí que lo más difícil no es la tecnología — son los límites organizacionales y de datos.

## Empieza con Bounded Contexts

El error más grande es dividir por capa técnica en lugar de dominio de negocio. Cuando descompuse el monolito del Banco Nacional, identificamos 7 bounded contexts:

- **Cuentas** — balance, historial
- **Transferencias** — internas y externas
- **Pagos** — pago de servicios, programados
- **Auth** — sesión, OAuth, 2FA
- **Notificaciones** — push, SMS, email
- **Auditoría** — logging regulatorio
- **Conciliación** — liquidación fin de día

Cada uno se convirtió en un microservicio. Cada uno era dueño de su base de datos. Sin tablas compartidas.

## Persistencia Poliglota Es Real

No todos los servicios necesitan PostgreSQL. Usamos:
- PostgreSQL para flujos ACID (transferencias, pagos)
- Redis para sesiones y rate limiting
- MongoDB para logs de auditoría
- Kafka como backbone de eventos

## La Estrategia de Despliegue Importa Más de lo que Crees

Blue-green deployments nos salvaron más de una vez:

1. Desplegar nueva versión a entorno green (0% tráfico)
2. Smoke tests contra green
3. Shift 10% del tráfico a green (canary)
4. Monitorear error rate por 5 minutos
5. Shift 100% o rollback — decisión en < 10 minutos

## El Costo Real de los Microservicios

Los microservicios no son gratis. Pagas en:
- **Complejidad operacional** — distributed tracing, service mesh, log aggregation
- **Latencia de red** — cada llamada cross-service añade 5-20ms
- **Consistencia eventual** — no puedes hacer un JOIN entre servicios
- **Testing** — contract tests, integration tests, end-to-end tests

El beneficio: despliegue independiente, escalado independiente, aislamiento de fallas. Para banca a escala, el trade-off vale la pena.