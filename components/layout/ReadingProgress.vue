<script setup lang="ts">
const progress = ref(0)

onMounted(() => {
  const handler = () => {
    const article = document.querySelector('article')
    if (!article) {
      progress.value = 0
      return
    }
    const rect = article.getBoundingClientRect()
    const articleTop = rect.top + window.scrollY
    const articleHeight = rect.height
    const viewportHeight = window.innerHeight
    const scrolled = window.scrollY - articleTop + viewportHeight * 0.3
    const max = articleHeight - viewportHeight * 0.3
    progress.value = max > 0 ? Math.min(Math.max(scrolled / max, 0), 1) * 100 : 0
  }
  window.addEventListener('scroll', handler, { passive: true })
  window.addEventListener('resize', handler, { passive: true })
  handler()
  onBeforeUnmount(() => {
    window.removeEventListener('scroll', handler)
    window.removeEventListener('resize', handler)
  })
})
</script>

<template>
  <div class="fixed left-0 top-16 z-50 h-0.5 w-full bg-transparent">
    <div
      class="h-full bg-accent transition-[width] duration-75 ease-out"
      :style="{ width: `${progress}%` }"
    />
  </div>
</template>