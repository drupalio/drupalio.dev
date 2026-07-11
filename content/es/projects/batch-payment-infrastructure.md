---
title: "Infraestructura de Pagos Batch"
description: "Co-desarrollo de infraestructura de procesamiento batch para facturación y pagos de cine"
company: "Globant"
role: "Java Microservices Developer"
period: "2019-2021"
category: "media"
stack: ["Java", "Spring Batch", "Kafka", "Oracle", "Microservices"]
metrics:
  - label: "Ventana batch"
    value: "-80%"
  - label: "Registros/batch"
    value: "2M"
challenge: "Los jobs batch de facturación y pagos de cine tomaban 6+ horas nocturnas. Los batches fallidos retrasaban operaciones del día siguiente. Sin retry — las fallas requerían intervención manual."
architecture: "Reconstruí el procesamiento batch con Spring Batch + Kafka. Procesamiento orientado a chunks (1000 registros por chunk) con checkpointing. Kafka topics para dead-letter queues — registros fallidos con retry automático."
results: "Ventana batch reducida de 6 horas a 1.2 horas. Procesa 2M registros por batch. Fallos auto-reintentados — intervención manual eliminada."
status: "shipped"
featured: true
order: 4
---

## Reto

El procesamiento batch de facturación y pagos de cine era una operación nocturna de 6+ horas. Si el batch fallaba a la hora 4, todo se reiniciaba desde cero — sin checkpointing. El equipo de operaciones estaba on-call cada noche.

## Arquitectura

**Spring Batch**: Procesamiento orientado a chunks. Cada chunk procesaba 1,000 registros con integridad transaccional — las fallas solo reprocesaban el chunk fallido.

**Kafka dead-letter queue**: Registros que fallaban validación de negocio iban a un topic DLQ. Un consumer de retry los procesaba con backoff exponencial.

**Ejecución paralela**: Flujos independientes (facturación vs pagos de cine) corrían en paralelo.

**Monitoreo**: Métricas custom de Micrometer expuestas a Prometheus.

## Resultados

- **Ventana batch**: 6h → 1.2h (80% de reducción)
- **Throughput**: 2M registros por ejecución
- **Intervención manual**: Eliminada — DLQ + retry maneja fallas transitorias
- **On-call**: Equipo de operaciones ya no necesario durante batches
- **Recuperación**: Chunk fallido reinicia en segundos, no horas