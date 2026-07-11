---
title: "Building Resilient Microservices: Lessons from Banking at Scale"
description: "What I learned modernizing banking platforms — from monolith to 40+ microservices handling 12M requests/day."
date: "2024-12-15"
tags: ["microservices", "banking", "architecture", "kubernetes"]
readingTime: 8
draft: false
---

# Building Resilient Microservices

After modernizing two major banking platforms, I've learned that the hardest part isn't the technology — it's the organizational and data boundaries.

## Start with Bounded Contexts

The biggest mistake teams make is splitting by technical layer (controller/service/repository) instead of business domain. When we decomposed Banco Nacional's monolith, we identified 7 bounded contexts first:

- **Accounts** — balance, account history
- **Transfers** — internal and external transfers
- **Payments** — bill pay, scheduled payments
- **Auth** — session, OAuth, 2FA
- **Notifications** — push, SMS, email
- **Audit** — regulatory logging
- **Reconciliation** — end-of-day settlement

Each became a microservice. Each owned its database. No shared tables.

## Polyglot Persistence Is Real

Not every service needs PostgreSQL. We used:
- PostgreSQL for ACID-required flows (transfers, payments)
- Redis for session state and rate limiting
- MongoDB for audit logs (write-heavy, schema-flexible)
- Kafka as the event backbone

This reduced cost and improved fit-for-purpose. But it introduced operational complexity — you need observability tooling that works across data stores.

## Deployment Strategy Matters More Than You Think

Blue-green deployments saved us more than once. The pattern:

1. Deploy new version to green environment (0% traffic)
2. Run smoke tests against green
3. Shift 10% traffic to green (canary)
4. Monitor error rate for 5 minutes
5. Shift 100% or rollback — decision in < 10 minutes

This is impossible with a monolith. With microservices, it's routine.

## The Real Cost of Microservices

Microservices aren't free. You pay in:
- **Operational complexity** — distributed tracing, service mesh, log aggregation
- **Network latency** — every cross-service call adds 5-20ms
- **Eventual consistency** — you can't do a JOIN across services
- **Testing** — contract tests, integration tests, end-to-end tests

The payoff: independent deployment, independent scaling, fault isolation. For banking at scale, the trade-off is worth it.