<script setup lang="ts">
const { allBlogPosts } = useContentQueries()

const { data: posts } = await allBlogPosts()

const { $i18n } = useNuxtApp()
const currentLocale = computed(() => $i18n?.global?.locale?.value || 'en')

const sectionTitle = computed(() =>
  currentLocale.value === 'en' ? 'Writing' : 'Escritos',
)
const viewAll = computed(() =>
  currentLocale.value === 'en' ? 'View all' : 'Ver todo',
)
const emptyLabel = computed(() =>
  currentLocale.value === 'en' ? 'No posts yet.' : 'Aún no hay publicaciones.',
)

const latest = computed(() => posts.value?.slice(0, 3) ?? [])
const postPath = (path: string) => path.replace(/^\/(en|es)\//, '/')
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex items-center justify-between">
      <SectionLabel number="06" :label="sectionTitle" />
      <NuxtLink
        to="/blog"
        class="text-sm text-accent transition-colors duration-150 hover:text-accent/80"
      >
        {{ viewAll }}
      </NuxtLink>
    </div>

    <p v-if="!latest.length" class="text-sm text-text-muted">
      {{ emptyLabel }}
    </p>

    <div v-else class="flex flex-col">
      <NuxtLink
        v-for="post in latest"
        :key="post.path"
        :to="postPath(post.path)"
        class="group flex flex-col gap-1 border-b border-border py-4 transition-colors duration-150 first:border-t hover:border-accent/30"
      >
        <div class="flex items-baseline justify-between gap-4">
          <h3 class="text-balance text-base font-medium text-text transition-colors duration-150 group-hover:text-accent">
            {{ post.title }}
          </h3>
          <span class="shrink-0 font-mono text-xs tabular-nums text-text-muted">{{ post.date }}</span>
        </div>
        <p class="text-balance text-sm leading-relaxed text-text-muted">{{ post.description }}</p>
      </NuxtLink>
    </div>
  </div>
</template>
