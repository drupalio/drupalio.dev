---
title: "Batch Payment Infrastructure"
description: "Co-developed batch processing infrastructure for invoicing and cinema payments"
company: "Globant"
role: "Java Microservices Developer"
period: "2019-2021"
category: "media"
stack: ["Java", "Spring Batch", "Kafka", "Oracle", "Microservices"]
metrics:
  - label: "Batch window"
    value: "-80%"
  - label: "Records/batch"
    value: "2M"
challenge: "Invoicing and cinema payment batch jobs took 6+ hours nightly. Failed batches delayed next-day operations. No retry mechanism — failures required manual intervention."
architecture: "Rebuilt batch processing with Spring Batch + Kafka. Chunk-oriented processing (1000 records per chunk) with checkpointing. Kafka topics for dead-letter queues — failed records retried automatically. Parallel step execution for independent job flows."
results: "Batch window reduced from 6 hours to 1.2 hours. Processes 2M records per batch. Failed records auto-retry with exponential backoff — manual intervention eliminated."
status: "shipped"
featured: true
order: 4
---

## Challenge

Disney's batch processing for invoicing and cinema payments was a nightly 6+ hour operation. If the batch failed at hour 4, the entire run restarted from zero — no checkpointing. Operations team was on-call every night during batch windows.

## Architecture

**Spring Batch**: Replaced the monolithic batch script with chunk-oriented processing. Each chunk processed 1,000 records with transactional integrity — failures only re-processed the failed chunk, not the entire batch.

**Kafka dead-letter queue**: Records that failed business validation were sent to a Kafka DLQ topic. A retry consumer processed them with exponential backoff (1s, 5s, 30s, 2m, 10m) — transient failures self-healed without manual intervention.

**Parallel execution**: Independent job flows (invoicing vs cinema payments) ran in parallel — cutting wall-clock time.

**Monitoring**: Custom Micrometer metrics exposed batch progress, throughput, and failure rates to Prometheus.

## Results

- **Batch window**: 6h → 1.2h — 80% reduction
- **Throughput**: 2M records per batch run
- **Manual intervention**: Eliminated — DLQ + retry handles all transient failures
- **On-call burden**: Operations team no longer needed during batch windows
- **Recovery**: Failed chunk restarts in seconds, not hours