<script setup lang="ts">
const route = useRoute()
const { projectBySlug } = useContentQueries()

const slug = computed(() => route.path)

const project = await projectBySlug(slug.value)

if (!project) {
  throw createError({ statusCode: 404, statusMessage: 'Project not found' })
}

const { $i18n } = useNuxtApp()
const currentLocale = computed(() => $i18n?.global?.locale?.value || 'en')

useSeoMeta({
  title: () => `${project.title} — Ricardo Morales`,
  description: () => project.description,
  ogTitle: () => `${project.title} — Ricardo Morales`,
  ogDescription: () => project.description,
  ogType: 'website',
})

const labels = computed(() => ({
  challenge: currentLocale.value === 'en' ? 'Challenge' : 'Reto',
  architecture: currentLocale.value === 'en' ? 'Architecture' : 'Arquitectura',
  results: currentLocale.value === 'en' ? 'Results' : 'Resultados',
  stack: currentLocale.value === 'en' ? 'Stack' : 'Stack',
  metrics: currentLocale.value === 'en' ? 'Metrics' : 'Métricas',
  back: currentLocale.value === 'en' ? 'Back to home' : 'Volver al inicio',
}))
</script>

<template>
  <div class="min-h-screen">
    <ScrollProgress />
    <ReadingProgress />
    <AppHeader />

    <main class="mx-auto max-w-3xl px-6 pt-32 pb-20 lg:px-8">
      <NuxtLink
        to="/"
        class="mb-8 inline-flex items-center gap-1.5 text-sm text-text-muted transition-colors duration-150 hover:text-text"
      >
        <Icon name="lucide:arrow-left" size="14" />
        {{ labels.back }}
      </NuxtLink>

      <article v-if="project" class="flex flex-col gap-8">
        <!-- Header -->
        <header class="flex flex-col gap-4">
          <div class="flex flex-wrap gap-1.5">
            <span
              v-for="tech in project.stack"
              :key="tech"
              class="rounded-md bg-surface-2 px-2 py-0.5 font-mono text-[11px] text-text-muted"
            >
              {{ tech }}
            </span>
          </div>

          <h1 class="text-balance text-4xl font-semibold tracking-tight text-text sm:text-5xl">
            {{ project.title }}
          </h1>

          <p class="text-balance text-lg leading-relaxed text-text-muted">
            {{ project.description }}
          </p>

          <div class="flex flex-wrap items-center gap-4 text-sm text-text-muted">
            <span>{{ project.company }}</span>
            <span class="text-border">·</span>
            <span>{{ project.role }}</span>
            <span class="text-border">·</span>
            <span class="font-mono tabular-nums">{{ project.period }}</span>
          </div>
        </header>

        <!-- Metrics -->
        <section v-if="project.metrics?.length" class="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div
            v-for="metric in project.metrics"
            :key="metric.label"
            class="bento-card p-4"
          >
            <p class="text-2xl font-semibold text-text">{{ metric.value }}</p>
            <p class="mt-1 font-mono text-[10px] uppercase tracking-wider text-text-muted">{{ metric.label }}</p>
          </div>
        </section>

        <!-- Challenge -->
        <section v-if="project.challenge" class="flex flex-col gap-3">
          <SectionLabel :number="'01'" :label="labels.challenge" />
          <p class="text-balance text-base leading-relaxed text-text-muted">
            {{ project.challenge }}
          </p>
        </section>

        <!-- Architecture -->
        <section v-if="project.architecture" class="flex flex-col gap-3">
          <SectionLabel :number="'02'" :label="labels.architecture" />
          <p class="text-balance text-base leading-relaxed text-text-muted">
            {{ project.architecture }}
          </p>
        </section>

        <!-- Results -->
        <section v-if="project.results" class="flex flex-col gap-3">
          <SectionLabel :number="'03'" :label="labels.results" />
          <p class="text-balance text-base leading-relaxed text-text-muted">
            {{ project.results }}
          </p>
        </section>

        <!-- Markdown body -->
        <section v-if="project.body" class="prose prose-neutral max-w-none dark:prose-invert">
          <ContentRenderer :value="project" />
        </section>
      </article>
    </main>

    <AppFooter />
  </div>
</template>