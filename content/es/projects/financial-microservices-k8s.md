---
title: "Microservicios Financieros en Kubernetes"
description: "Construcción y mantenimiento de microservicios financieros con Quarkus y Kubernetes en Google Cloud, automatizando despliegues con GitHub Actions"
company: "Globant"
role: "Java Microservices Developer"
period: "2020-2022"
category: "fintech"
stack: ["Java", "Quarkus", "Kubernetes", "Google Cloud", "GitHub Actions", "Kafka"]
metrics:
  - label: "Cold start"
    value: "0.04s"
  - label: "Costo infra"
    value: "-40%"
challenge: "Los microservicios financieros en JVM tenían arranque lento — escalar era caro. El gasto en cloud subía. CI/CD era manual."
architecture: "Migré microservicios Spring Boot a Quarkus con compilación nativa (GraalVM). Desplegado en Google Kubernetes Engine con autoscaling horizontal. Pipelines de GitHub Actions compilaban binarios nativos y desplegaban con Helm. Kafka para eventos entre servicios."
results: "Cold start de 8s a 40ms — habilitando scale-to-zero. Costo de infraestructura reducido 40%. CI/CD 100% automatizado."
status: "shipped"
featured: true
order: 3
---

## Reto

Los microservicios financieros corrían en Spring Boot con JVM tradicional. Tiempo de arranque: 8 segundos. Durante horas de bajo tráfico, los pods seguían corriendo — quemando presupuesto cloud. Los eventos de escalado eran lentos.

## Arquitectura

**Compilación nativa Quarkus**: Migré servicios a Quarkus con imágenes nativas GraalVM. Arranque de 8s a 40ms. Memoria por pod de 512MB a 80MB.

**Google Kubernetes Engine**: Despliegue con Helm charts. HPA escaló por CPU + métricas custom de lag de Kafka. Scale-to-zero para servicios no críticos.

**GitHub Actions CI/CD**:
1. PR → tests unitarios + integración
2. Merge → build nativo (GraalVM)
3. Push a Google Container Registry
4. Helm upgrade con rolling deployment

**Event streaming**: Apache Kafka para comunicación entre servicios.

## Resultados

- **Cold start**: 8s → 40ms (200x más rápido) — scale-to-zero real
- **Costo de infra**: -40% — pods inactivos se apagan
- **Memoria por pod**: 512MB → 80MB — 6x más densidad
- **Tiempo de despliegue**: 15 min manual → 3 min automatizado
- **Respuesta de escalado**: 8s → sub-segundo