<script setup lang="ts">
import { register, render } from 'pele/core'
import flowchart from 'pele/diagrams/flowchart'

register(flowchart)

type DiagramKind = 'quizzer-interview' | 'batch-payment'
type Locale = 'en' | 'es'

const props = defineProps<{
  kind: DiagramKind
  locale: Locale
}>()

const diagrams = {
  'quizzer-interview': {
    en: {
      title: 'Interview feedback workflow',
      description: 'Transcripts enter a Spring Boot service, GPT evaluates them against role rubrics, and Kafka routes structured feedback to notifications and follow-up automation.',
      source: `flowchart TB
  transcript[Transcript] --> service[Spring Boot]
  service --> gpt[GPT role rubric]
  gpt --> feedback[Structured JSON]
  feedback --> kafka[Kafka]
  kafka --> notifications[Notifications]
  kafka --> followup[Follow-up job]`,
    },
    es: {
      title: 'Flujo de feedback de entrevistas',
      description: 'Las transcripciones llegan a un servicio Spring Boot; GPT las evalúa con rúbricas por rol y Kafka distribuye el feedback estructurado a notificaciones y seguimiento automatizado.',
      source: `flowchart TB
  transcript[Transcripción] --> service[Spring Boot]
  service --> gpt[Rúbrica GPT]
  gpt --> feedback[JSON estructurado]
  feedback --> kafka[Kafka]
  kafka --> notifications[Notificaciones]
  kafka --> followup[Seguimiento]`,
    },
  },
  'batch-payment': {
    en: {
      title: 'Batch payment processing',
      description: 'Parallel invoicing and cinema-payment jobs process 1,000-record Spring Batch chunks with checkpoints. Successful records complete; failed records go to a Kafka dead-letter queue and retry with exponential backoff.',
      source: `flowchart TB
  trigger[Nightly batch] --> jobs[Parallel jobs]
  jobs --> chunks[Spring Batch, 1,000 records]
  chunks --> checkpoint[Checkpoint]
  checkpoint --> success[Completed]
  checkpoint --> failed[Failed records]
  failed --> dlq[Kafka DLQ]
  dlq --> retry[Exponential retry]
  retry --> chunks`,
    },
    es: {
      title: 'Procesamiento de pagos batch',
      description: 'Facturación y pagos de cine avanzan en flujos paralelos. Spring Batch procesa chunks de 1,000 registros con checkpoint. Los registros exitosos se completan; los fallidos pasan a Kafka DLQ y se reintentan con backoff exponencial.',
      source: `flowchart TB
  trigger[Lote nocturno] --> jobs[Flujos paralelos]
  jobs --> chunks[Spring Batch, 1,000 registros]
  chunks --> checkpoint[Checkpoint]
  checkpoint --> success[Completados]
  checkpoint --> failed[Fallidos]
  failed --> dlq[Kafka DLQ]
  dlq --> retry[Reintento exponencial]
  retry --> chunks`,
    },
  },
} satisfies Record<DiagramKind, Record<Locale, { title: string; description: string; source: string }>>

const diagram = computed(() => diagrams[props.kind][props.locale])
const svg = computed(() => render(diagram.value.source, {
  idPrefix: `project-${props.kind}-${props.locale}`,
  links: false,
  images: false,
}).svg)

const theme = {
  '--pele-bg': 'var(--color-bg)',
  '--pele-fg': 'var(--color-text)',
  '--pele-muted': 'var(--color-text-muted)',
  '--pele-line': 'var(--color-text-muted)',
  '--pele-surface': 'var(--color-surface)',
  '--pele-border': 'var(--color-text-muted)',
  '--pele-accent': 'var(--color-accent)',
}
</script>

<template>
  <figure class="flex flex-col gap-3">
    <!-- eslint-disable vue/no-v-html -- Pele renders fixed local diagrams, never user input. -->
    <div
      class="flex justify-center overflow-hidden rounded-xl border border-border bg-surface px-3 py-4"
      :style="theme"
      aria-hidden="true"
      v-html="svg"
    />
    <!-- eslint-enable vue/no-v-html -->
    <figcaption class="flex flex-col gap-1 text-sm leading-relaxed text-text-muted">
      <span class="font-mono text-xs uppercase tracking-wider text-text">{{ diagram.title }}</span>
      <span>{{ diagram.description }}</span>
    </figcaption>
  </figure>
</template>
