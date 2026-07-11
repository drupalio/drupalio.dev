---
title: "Digital Banking Expansion"
description: "Expanded microservices and modernized its digital banking platform"
company: "Globant"
role: "Java Microservices Developer"
period: "2020-2022"
category: "banking"
stack: ["Java", "Spring Boot", "Microservices", "Kafka", "Redis"]
metrics:
  - label: "Features shipped"
    value: "15+"
  - label: "Time to market"
    value: "-65%"
challenge: "HSBC's digital banking platform needed new features fast — but the existing architecture required coordinated releases across 8 teams. Time-to-market for new features was 3+ months."
architecture: "Expanded the microservice ecosystem with event-driven services. Introduced a feature-flag system for progressive rollouts. Kafka event store enabled CQRS for read-optimized dashboards."
results: "Shipped 15+ new banking features in 18 months. Time-to-market reduced from 3 months to 3 weeks. Feature flags enabled safe progressive rollout to 5% → 25% → 100% of users."
status: "shipped"
featured: false
order: 5
---

## Challenge

HSBC needed to ship digital banking features faster. The existing microservice platform had grown organically, but each new feature required coordinated releases across 8 teams. A single bad deployment could affect all customers.

## Architecture

**Event-driven expansion**: New services subscribed to domain events from the existing Kafka event store. No direct database coupling — services could be built and deployed independently.

**Feature flags**: Implemented a feature-flag service backed by Redis. New features were hidden behind flags and progressively rolled out: 5% (internal testing) → 25% (canary) → 100% (general availability). Bad features could be killed instantly without redeployment.

**CQRS for dashboards**: Read-heavy dashboards (account summary, transaction history) used a CQRS pattern — events from the write side were projected into optimized read models. Dashboards queried pre-built projections instead of aggregating on the fly.

## Results

- **15+ features shipped** in 18 months — previously would have taken 3+ years at old cadence
- **Time-to-market**: 3 months → 3 weeks per feature
- **Zero-downtime releases**: Feature flags enabled instant rollback
- **Dashboard latency**: CQRS projections reduced query time from 2s to 200ms