<script setup lang="ts">
const { featuredProjects } = useContentQueries()

const { data: projects } = await featuredProjects()

const { $i18n } = useNuxtApp()
const currentLocale = computed(() => $i18n?.global?.locale?.value || 'en')

const sectionTitle = computed(() =>
  currentLocale.value === 'en' ? 'Selected Work' : 'Trabajo Seleccionado',
)
const viewLabel = computed(() =>
  currentLocale.value === 'en' ? 'View case study' : 'Ver caso',
)
const emptyLabel = computed(() =>
  currentLocale.value === 'en' ? 'No featured work yet.' : 'Aún no hay trabajo destacado.',
)

const flagship = computed(() => projects.value?.[0])
const pair = computed(() => projects.value?.slice(1, 3) ?? [])
const rest = computed(() => projects.value?.slice(3) ?? [])

const casePath = (path?: string) => {
  if (!path) return '#'
  return path.replace(/^\/(en|es)\//, '/')
}

const stackLine = (stack?: string[]) => (stack ?? []).join(' · ')
</script>

<template>
  <div class="flex flex-col">
    <SectionLabel number="02" :label="sectionTitle" />

    <p v-if="!projects?.length" class="mt-6 text-sm text-text-muted">
      {{ emptyLabel }}
    </p>

    <!-- Flagship: full editorial spread, most visual weight -->
    <article v-if="flagship" class="flex flex-col gap-5 border-t-2 border-text py-10">
      <div class="flex flex-wrap items-baseline gap-x-4 gap-y-1 font-mono text-xs uppercase tracking-wider text-text-muted">
        <span>{{ flagship.company }}</span>
        <span aria-hidden="true">·</span>
        <span>{{ flagship.role }}</span>
        <span aria-hidden="true">·</span>
        <span class="tabular-nums">{{ flagship.period }}</span>
      </div>

      <h3 class="font-display max-w-4xl text-balance text-4xl font-bold leading-[1.02] tracking-tight text-text sm:text-5xl">
        {{ flagship.title }}
      </h3>

      <p class="max-w-2xl text-balance text-base leading-relaxed text-text-muted">
        {{ flagship.description }}
      </p>

      <div v-if="flagship.metrics?.length" class="metric-band flex w-fit max-w-full flex-wrap gap-x-10 gap-y-4 px-7 py-5">
        <div v-for="metric in flagship.metrics" :key="metric.label" class="flex flex-col gap-1">
          <span class="font-display text-3xl font-bold tabular-nums text-text">{{ metric.value }}</span>
          <span class="font-mono text-[10px] uppercase tracking-wider text-text-muted">{{ metric.label }}</span>
        </div>
      </div>

      <p v-if="flagship.stack?.length" class="font-mono text-xs text-text-muted">
        {{ stackLine(flagship.stack) }}
      </p>

      <NuxtLink
        :to="casePath(flagship.path)"
        class="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-accent transition-colors duration-150 hover:text-text"
      >
        {{ viewLabel }}
        <Icon name="lucide:arrow-up-right" size="15" aria-hidden="true" />
      </NuxtLink>
    </article>

    <!-- Pair: asymmetric split, composition follows each case -->
    <div v-if="pair.length" class="grid grid-cols-1 gap-x-10 gap-y-8 lg:grid-cols-12">
      <NuxtLink
        v-for="(project, i) in pair"
        :key="project.path || project.title"
        :to="casePath(project.path)"
        :class="[
          'group flex flex-col gap-3 border-t border-border py-6',
          i === 0 ? 'lg:col-span-7' : 'lg:col-span-5',
        ]"
      >
        <span class="font-mono text-xs tabular-nums text-text-muted">0{{ i + 2 }}</span>
        <span class="font-display block text-balance text-2xl font-bold tracking-tight text-text transition-colors duration-150 group-hover:text-accent sm:text-3xl">
          {{ project.title }}
        </span>
        <span class="text-sm text-text-muted">{{ project.company }} · {{ project.role }} · {{ project.period }}</span>
        <span v-if="i === 0 && project.architecture" class="max-w-xl text-balance text-sm leading-relaxed text-text-muted">
          {{ project.architecture }}
        </span>
        <span v-if="i === 1 && project.metrics?.length" class="flex flex-wrap gap-x-6 gap-y-2">
          <span v-for="metric in project.metrics.slice(0, 2)" :key="metric.label" class="flex items-baseline gap-2">
            <span class="font-display text-xl font-bold tabular-nums text-text">{{ metric.value }}</span>
            <span class="font-mono text-[10px] uppercase tracking-wider text-text-muted">{{ metric.label }}</span>
          </span>
        </span>
        <span v-if="project.stack?.length" class="font-mono text-[11px] text-text-muted">
          {{ stackLine(project.stack) }}
        </span>
      </NuxtLink>
    </div>

    <!-- Rest: compact ruled rows -->
    <div v-if="rest.length" class="mt-2 flex flex-col">
      <NuxtLink
        v-for="(project, i) in rest"
        :key="project.path || project.title"
        :to="casePath(project.path)"
        class="group grid grid-cols-12 items-baseline gap-x-4 gap-y-1 border-t border-border py-5 transition-colors duration-150 last:border-b hover:bg-surface-2/60"
      >
        <span class="col-span-2 font-mono text-xs tabular-nums text-text-muted sm:col-span-1">0{{ i + 4 }}</span>
        <span class="col-span-10 sm:col-span-6">
          <span class="block font-display text-xl font-bold tracking-tight text-text transition-colors duration-150 group-hover:text-accent">
            {{ project.title }}
          </span>
          <span class="mt-0.5 block text-sm text-text-muted">{{ project.company }} · {{ project.role }}</span>
        </span>
        <span class="col-span-10 col-start-3 font-mono text-xs tabular-nums text-text-muted sm:col-span-5 sm:col-start-auto sm:text-right">
          {{ project.period }}
        </span>
      </NuxtLink>
    </div>
  </div>
</template>
