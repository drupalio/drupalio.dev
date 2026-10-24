<script setup lang="ts">
const route = useRoute()
const siteUrl = 'https://drupalio.dev'

// Both locales share one URL (language is a cookie), so the path alone is canonical.
const canonical = computed(() => {
  const path = route.path.replace(/\/+$/, '')
  return `${siteUrl}${path || '/'}`
})

useHead({
  link: [
    { rel: 'canonical', href: canonical },
  ],
})
</script>

<template>
  <NuxtPage />
</template>
