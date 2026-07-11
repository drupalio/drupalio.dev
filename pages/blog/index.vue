<script setup lang="ts">
const { allBlogPosts } = useContentQueries()

const { data: posts } = await allBlogPosts()

const { $i18n } = useNuxtApp()
const currentLocale = computed(() => $i18n?.global?.locale?.value || 'en')

const sectionTitle = computed(() =>
  currentLocale.value === 'en' ? 'Writing' : 'Escritos',
)

useSeoMeta({
  title: 'Writing — Ricardo Morales',
  description: 'Thoughts on microservices, AI engineering, and building resilient systems.',
})
</script>

<template>
  <div class="min-h-screen">
    <ScrollProgress />
    <AppHeader />

    <main class="mx-auto max-w-3xl px-6 pt-32 pb-20 lg:px-8">
      <div class="mb-12 flex flex-col gap-4">
        <SectionLabel number="" :label="sectionTitle" />
        <h1 class="text-balance text-4xl font-semibold tracking-tight text-text sm:text-5xl">
          {{ currentLocale === 'en' ? 'Engineering deep dives, not hot takes.' : 'Análisis técnico, no opiniones.' }}
        </h1>
      </div>

      <div class="flex flex-col gap-2">
        <NuxtLink
          v-for="post in posts"
          :key="post.path"
          :to="post.path.replace(/^\/(en|es)\//, '/')"
          class="group flex flex-col gap-1 border-b border-border py-4 transition-colors duration-150 hover:border-accent/30"
        >
          <div class="flex items-baseline justify-between gap-4">
            <h2 class="text-balance text-lg font-medium text-text transition-colors duration-150 group-hover:text-accent">
              {{ post.title }}
            </h2>
            <span class="font-mono text-xs text-text-muted tabular-nums">{{ post.date }}</span>
          </div>
          <p class="text-balance text-sm leading-relaxed text-text-muted">{{ post.description }}</p>
          <div v-if="post.tags?.length" class="mt-1 flex flex-wrap gap-1">
            <span
              v-for="tag in post.tags"
              :key="tag"
              class="font-mono text-[10px] uppercase tracking-wider text-text-muted"
            >
              #{{ tag }}
            </span>
          </div>
        </NuxtLink>
      </div>
    </main>

    <AppFooter />
  </div>
</template>