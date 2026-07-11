---
title: "Financial Microservices on Kubernetes"
description: "Built and maintained financial microservices with Quarkus and Kubernetes on Google Cloud, automating deployments with GitHub Actions"
company: "Globant"
role: "Java Microservices Developer"
period: "2020-2022"
category: "fintech"
stack: ["Java", "Quarkus", "Kubernetes", "Google Cloud", "GitHub Actions", "Kafka"]
metrics:
  - label: "Cold start"
    value: "0.04s"
  - label: "Infra cost"
    value: "-40%"
challenge: "Financial microservices on JVM had slow startup times — deployment scaling was expensive. Cloud spend was rising. CI/CD was manual."
architecture: "Migrated Spring Boot microservices to Quarkus with native compilation (GraalVM). Deployed to Google Kubernetes Engine with horizontal pod autoscaling. GitHub Actions pipelines built native binaries, pushed to GCR, and deployed with Helm. Kafka handled inter-service events for transaction flows."
results: "Cold start dropped from 8s to 40ms — enabling scale-to-zero. Infrastructure cost reduced 40% by shutting down idle pods. CI/CD fully automated — zero manual deployments."
status: "shipped"
featured: true
order: 3
---

## Challenge

The existing financial microservices ran on Spring Boot with traditional JVM. Startup time was 8 seconds. During low-traffic hours (nights, weekends), pods kept running — burning cloud budget for nothing. Scaling events were slow because new pods took 8s to become ready.

## Architecture

**Quarkus native compilation**: Migrated services to Quarkus with GraalVM native images. Startup dropped from 8s to 40ms. Memory footprint shrank from 512MB to 80MB per pod.

**Google Kubernetes Engine**: Deployed with Helm charts. Horizontal Pod Autoscaler scaled on CPU + custom Kafka lag metrics. Scale-to-zero enabled for non-critical services during off-hours.

**GitHub Actions CI/CD**:
1. PR opened → run unit tests + integration tests
2. Merge to main → build native binary (GraalVM) in CI
3. Push to Google Container Registry
4. Helm upgrade with rolling deployment

**Event streaming**: Apache Kafka for inter-service communication — transaction events, audit trails, and reconciliation flows.

## Results

- **Cold start**: 8s → 40ms (200x faster) — enables true scale-to-zero
- **Infrastructure cost**: -40% — idle pods shut down during off-hours
- **Memory per pod**: 512MB → 80MB — 6x density improvement
- **Deployment time**: From 15 min manual process to 3 min automated pipeline
- **Scaling response**: From 8s to sub-second — HPA reacts instantly to traffic spikes