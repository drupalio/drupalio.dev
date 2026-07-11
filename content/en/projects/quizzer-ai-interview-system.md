---
title: "QuizzerA — AI Interview System"
description: "Customized GPT for key projects and developed an interview follow-up system to enhance feedback and efficiency"
company: "Globant"
role: "Java Microservices Developer"
period: "2022-2024"
category: "ai"
stack: ["Java", "Spring Boot", "GPT", "AI", "Microservices"]
metrics:
  - label: "Feedback cycle"
    value: "-60%"
  - label: "Interview throughput"
    value: "+3x"
challenge: "Interview feedback was slow, inconsistent, and manual. Candidates waited days for results. Interviewers spent hours writing notes."
architecture: "Built a GPT-powered interview assistant as a Spring Boot microservice. The system captured interview transcripts, generated structured feedback using custom GPT prompts, and routed results through an event-driven pipeline via Apache Kafka. A follow-up scheduler automated the next steps — no manual triage needed."
results: "Reduced feedback cycle from 5 days to under 48 hours. Tripled interview throughput per interviewer. Standardized feedback quality across teams."
status: "shipped"
featured: true
order: 1
---

## Challenge

Interview feedback at scale was the bottleneck. With hundreds of candidates across multiple clients, interviewers spent more time documenting than evaluating. Feedback quality varied wildly between interviewers — some wrote paragraphs, others wrote bullet points. Candidates waited up to a week for results.

## Architecture

The system was built as a Spring Boot microservice integrated into the existing Globant hiring platform:

1. **Transcript capture** — Interview recordings transcribed via a speech-to-text service, sent to the microservice via REST
2. **GPT processing** — Custom GPT prompts evaluated transcripts against role-specific rubrics, generating structured JSON feedback
3. **Event pipeline** — Results published to Apache Kafka topics, consumed by the notification service and the follow-up scheduler
4. **Follow-up automation** — A scheduled job checked pending feedback, sent reminders, and escalated stale items

## Results

- Feedback cycle reduced from 5 business days to under 48 hours
- Interview throughput tripled — same team handled 3x candidate volume
- Feedback consistency improved — GPT-enforced structure eliminated ad-hoc formatting
- Hiring manager satisfaction up — structured JSON enabled dashboard analytics