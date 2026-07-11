<script setup lang="ts">
const route = useRoute()
const { blogPostBySlug } = useContentQueries()

const { data: post } = await blogPostBySlug(route.path)

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found' })
}

const { $i18n } = useNuxtApp()
const currentLocale = computed(() => $i18n?.global?.locale?.value || 'en')

useSeoMeta({
  title: () => `${post.value?.title} — Ricardo Morales`,
  description: () => post.value?.description,
  ogTitle: () => `${post.value?.title} — Ricardo Morales`,
  ogDescription: () => post.value?.description,
  ogType: 'article',
})

const backLabel = computed(() =>
  currentLocale.value === 'en' ? 'Back to writing' : 'Volver a escritos',
)
</script>

<template>
  <div class="min-h-screen">
    <ScrollProgress />
    <ReadingProgress />
    <AppHeader />

    <main class="mx-auto max-w-3xl px-6 pt-32 pb-20 lg:px-8">
      <NuxtLink
        to="/blog"
        class="mb-8 inline-flex items-center gap-1.5 text-sm text-text-muted transition-colors duration-150 hover:text-text"
      >
        <Icon name="lucide:arrow-left" size="14" />
        {{ backLabel }}
      </NuxtLink>

      <article v-if="post" class="flex flex-col gap-6">
        <header class="flex flex-col gap-4">
          <div class="flex flex-wrap gap-1.5">
            <span
              v-for="tag in post.tags"
              :key="tag"
              class="font-mono text-[10px] uppercase tracking-wider text-text-muted"
            >
              #{{ tag }}
            </span>
          </div>

          <h1 class="text-balance text-4xl font-semibold tracking-tight text-text sm:text-5xl">
            {{ post.title }}
          </h1>

          <p class="text-balance text-lg leading-relaxed text-text-muted">{{ post.description }}</p>

          <div class="flex items-center gap-3 text-sm text-text-muted">
            <span class="font-mono tabular-nums">{{ post.date }}</span>
            <span v-if="post.readingTime" class="text-border">·</span>
            <span v-if="post.readingTime">{{ post.readingTime }} min read</span>
          </div>
        </header>

        <div class="prose prose-neutral max-w-none dark:prose-invert prose-headings:tracking-tight prose-headings:font-semibold prose-headings:text-text prose-p:text-text-muted prose-p:leading-relaxed prose-a:text-accent prose-code:font-mono prose-code:text-sm prose-code:bg-surface-2 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-pre:bg-surface prose-pre:border prose-pre:border-border">
          <ContentRenderer :value="post" />
        </div>
      </article>
    </main>

    <AppFooter />
  </div>
</template>