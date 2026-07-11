---
title: "Banking Platform Modernization"
description: "Modernized online banking with microservices using the YAPE framework"
company: "Globant"
role: "Java Microservices Developer"
period: "2021-2023"
category: "banking"
stack: ["Java", "Spring Boot", "Microservices", "YAPE Framework", "Kubernetes"]
metrics:
  - label: "Latency"
    value: "-73%"
  - label: "Throughput"
    value: "12M req/day"
challenge: "Legacy monolithic banking platform couldn't handle peak-hour traffic. Transactions timed out. Deployment cycles took weeks."
architecture: "Decomposed the monolith into 40+ Spring Boot microservices using Banco Nacional's YAPE framework. Each service owned its database (polyglot persistence: PostgreSQL for transactions, Redis for sessions, MongoDB for audit logs). Inter-service communication via REST for synchronous flows and Apache Kafka for event-driven operations. Deployed on Kubernetes with blue-green deployments via GitHub Actions CI/CD."
results: "Latency dropped 73% on critical paths. Platform handles 12M requests/day with 99.97% uptime. Deployment cycle reduced from 3 weeks to 2 hours."
status: "shipped"
featured: true
order: 2
---

## Challenge

Banco Nacional del Perú's online banking platform was a monolith that buckled under load. Peak-hour traffic (payroll processing, bill payments) caused transaction timeouts. Deployments required coordinated downtime — the team shipped once every 3 weeks.

The business needed:
- Real-time transaction processing at scale
- Independent deployment of banking features
- Zero-downtime releases

## Architecture

**Decomposition strategy**: Identified bounded contexts (accounts, transfers, payments, auth, notifications) and extracted each as a Spring Boot microservice using the YAPE framework — Banco Nacional's internal microservice standard.

**Data architecture**: Each service owned its database:
- PostgreSQL for transactional services (ACID required)
- Redis for session management and rate limiting
- MongoDB for audit logs (write-heavy, schema-flexible)

**Communication**:
- Synchronous: REST for request/response flows (balance check, transfer initiation)
- Asynchronous: Apache Kafka for event-driven flows (transaction completed → notification → audit)

**Deployment**: Kubernetes with blue-green strategy. GitHub Actions CI/CD pipeline ran integration tests, built containers, and promoted to production with a single approval gate.

## Results

- **Latency**: Critical path (transfer confirmation) dropped from 2.4s to 0.65s — a 73% reduction
- **Throughput**: Platform sustains 12M requests/day, up from 4M
- **Uptime**: 99.97% — up from 99.2% (the 0.77% delta was mostly planned downtime eliminated)
- **Deployment frequency**: From every 3 weeks to multiple times per day
- **MTTR**: From 4 hours to 12 minutes (Kubernetes health checks + auto-restart)