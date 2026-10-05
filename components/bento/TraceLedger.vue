<script setup lang="ts">
// Signature artifact: the request path of the banking modernization case.
// Every step names real tech and only figures documented in the case
// frontmatter (12M req/day, 0.65s confirm). Highlight is CSS-only, so the
// full path reads without JS, keyboard, or motion.
const { $i18n } = useNuxtApp()
const currentLocale = computed(() => $i18n?.global?.locale?.value || 'en')

const label = computed(() =>
  currentLocale.value === 'en'
    ? 'Request path: banking modernization'
    : 'Ruta de petición: modernización bancaria',
)
const openCase = computed(() =>
  currentLocale.value === 'en' ? 'Open the case' : 'Abrir el caso',
)

const steps = computed(() => currentLocale.value === 'en'
  ? [
      { name: 'Edge', detail: 'Sustains 12M requests per day at peak', meta: '12M req/day' },
      { name: 'Auth', detail: 'Sessions and rate limiting on Redis', meta: 'Redis' },
      { name: 'Ledger', detail: 'Transfer confirm in 0.65s on PostgreSQL', meta: '0.65s' },
      { name: 'Events', detail: 'Notify and audit through Kafka topics', meta: 'Kafka' },
    ]
  : [
      { name: 'Edge', detail: 'Sostiene 12M de peticiones por día en pico', meta: '12M req/día' },
      { name: 'Auth', detail: 'Sesiones y límite de tasa en Redis', meta: 'Redis' },
      { name: 'Ledger', detail: 'Confirmación de transferencia en 0.65s en PostgreSQL', meta: '0.65s' },
      { name: 'Events', detail: 'Notificación y auditoría con tópicos de Kafka', meta: 'Kafka' },
    ],
)
</script>

<template>
  <figure class="mt-12 border-t-2 border-text pt-6">
    <div class="flex flex-wrap items-baseline justify-between gap-2">
      <figcaption class="font-mono text-xs uppercase tracking-wider text-text-muted">
        {{ label }}
      </figcaption>
      <NuxtLink
        to="/projects/banking-modernization"
        class="inline-flex items-center gap-1 text-sm font-medium text-text-muted transition-colors duration-150 hover:text-accent"
      >
        {{ openCase }}
        <Icon name="lucide:arrow-up-right" size="15" aria-hidden="true" />
      </NuxtLink>
    </div>

    <ol class="trace mt-4 grid grid-cols-1 gap-x-10 sm:grid-cols-2">
      <li
        v-for="(step, i) in steps"
        :key="step.name"
        class="trace-step"
      >
        <span class="trace-marker" aria-hidden="true">{{ String(i + 1).padStart(2, '0') }}</span>
        <div class="flex flex-col gap-0.5 pb-1">
          <div class="flex flex-wrap items-baseline justify-between gap-x-3">
            <span class="trace-name text-sm font-semibold text-text transition-colors duration-150">{{ step.name }}</span>
            <span class="font-mono text-[11px] tabular-nums text-text-muted">{{ step.meta }}</span>
          </div>
          <p class="text-sm leading-relaxed text-text-muted">{{ step.detail }}</p>
        </div>
      </li>
    </ol>
  </figure>
</template>
