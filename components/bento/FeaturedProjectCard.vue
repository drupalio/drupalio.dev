<script setup lang="ts">
interface Project {
  title: string
  description: string
  stack?: string[]
  technologies?: string[]
  path?: string
  metrics?: Array<{ label: string; value: string }>
  challenge?: string
  architecture?: string
  results?: string
  company?: string
  role?: string
}

interface Props {
  project: Project
  layout: 'wide' | 'tall' | 'compact'
  index: number
}

const props = defineProps<Props>()

const { $i18n } = useNuxtApp()
const currentLocale = computed(() => $i18n?.global?.locale?.value || 'en')

const labels = computed(() => ({
  challenge: currentLocale.value === 'en' ? 'Challenge' : 'Reto',
  stack: currentLocale.value === 'en' ? 'Stack' : 'Stack',
  view: currentLocale.value === 'en' ? 'View case study' : 'Ver caso',
}))

const stack = computed(() => props.project.stack || props.project.technologies || [])
const href = computed(() => {
  if (!props.project.path) return '#'
  return props.project.path.replace(/^\/(en|es)\//, '/')
})
</script>

<template>
  <div
    class="bento-card flex flex-col gap-4 p-6 transition-all duration-200 hover:border-accent/30"
    :class="{
      'lg:col-span-2': layout === 'wide',
      'lg:row-span-2': layout === 'tall',
    }"
  >
    <div class="flex items-center justify-between">
      <span class="font-mono text-xs text-text-muted tabular-nums">0{{ index + 1 }}</span>
      <div class="flex flex-wrap gap-1">
        <span
          v-for="tech in stack.slice(0, layout === 'compact' ? 3 : 5)"
          :key="tech"
          class="rounded-md bg-surface-2 px-2 py-0.5 font-mono text-[10px] text-text-muted"
        >
          {{ tech }}
        </span>
      </div>
    </div>

    <h3
      class="text-balance font-medium tracking-tight text-text"
      :class="{
        'text-xl': layout === 'compact',
        'text-2xl': layout === 'wide' || layout === 'tall',
      }"
    >
      {{ project.title }}
    </h3>

    <p class="text-balance text-sm leading-relaxed text-text-muted" :class="{ 'flex-1': layout === 'tall' }">
      {{ project.description }}
    </p>

    <div v-if="layout !== 'compact' && project.metrics?.length" class="flex gap-6">
      <div v-for="metric in project.metrics" :key="metric.label" class="flex flex-col gap-0.5">
        <span class="text-lg font-semibold text-text">{{ metric.value }}</span>
        <span class="font-mono text-[10px] uppercase tracking-wider text-text-muted">{{ metric.label }}</span>
      </div>
    </div>

    <NuxtLink
      :to="href"
      class="inline-flex items-center gap-1 text-sm text-accent transition-colors duration-150 hover:text-accent/80"
    >
      <Icon name="lucide:arrow-right" size="14" />
      {{ labels.view }}
    </NuxtLink>
  </div>
</template>