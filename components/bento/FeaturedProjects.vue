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

const flagship = computed(() => projects.value?.[0])
const index = computed(() => projects.value?.slice(1) ?? [])

const casePath = (path?: string) => {
  if (!path) return '#'
  return path.replace(/^\/(en|es)\//, '/')
}
</script>

<template>
  <div class="flex flex-col">
    <SectionLabel number="03" :label="sectionTitle" />

    <!-- Flagship: full editorial spread -->
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

      <div v-if="flagship.metrics?.length" class="flex flex-wrap gap-x-10 gap-y-4">
        <div v-for="metric in flagship.metrics" :key="metric.label" class="flex flex-col gap-1">
          <span class="font-display text-3xl font-bold tabular-nums text-text">{{ metric.value }}</span>
          <span class="font-mono text-[10px] uppercase tracking-wider text-text-muted">{{ metric.label }}</span>
        </div>
      </div>

      <NuxtLink
        :to="casePath(flagship.path)"
        class="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-accent transition-colors duration-150 hover:text-text"
      >
        {{ viewLabel }}
        <Icon name="lucide:arrow-right" size="15" aria-hidden="true" />
      </NuxtLink>
    </article>

    <!-- Index: ruled rows -->
    <div v-if="index.length" class="flex flex-col">
      <NuxtLink
        v-for="(project, i) in index"
        :key="project.path || project.title"
        :to="casePath(project.path)"
        class="group grid grid-cols-12 items-baseline gap-x-4 gap-y-1 border-t border-border py-5 transition-colors duration-150 last:border-b hover:bg-surface-2/60"
      >
        <span class="col-span-2 font-mono text-xs tabular-nums text-text-muted sm:col-span-1">0{{ i + 2 }}</span>
        <span class="col-span-10 sm:col-span-6">
          <span class="block font-display text-xl font-bold tracking-tight text-text transition-colors duration-150 group-hover:text-accent sm:text-2xl">
            {{ project.title }}
          </span>
          <span class="mt-0.5 block text-sm text-text-muted">{{ project.company }} · {{ project.role }}</span>
        </span>
        <span class="col-span-8 col-start-3 font-mono text-xs tabular-nums text-text-muted sm:col-span-4 sm:col-start-auto sm:text-right">
          {{ project.period }}
        </span>
        <span class="col-span-2 col-start-11 flex justify-end text-text-muted transition-all duration-150 group-hover:translate-x-0.5 group-hover:text-accent sm:col-span-1" aria-hidden="true">
          <Icon name="lucide:arrow-right" size="16" />
        </span>
      </NuxtLink>
    </div>
  </div>
</template>
