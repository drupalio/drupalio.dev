<script setup lang="ts">
const progress = ref(0)

onMounted(() => {
  const handler = () => {
    const scrolled = window.scrollY
    const max = document.documentElement.scrollHeight - window.innerHeight
    progress.value = max > 0 ? (scrolled / max) * 100 : 0
  }
  window.addEventListener('scroll', handler, { passive: true })
  handler()
  onBeforeUnmount(() => window.removeEventListener('scroll', handler))
})
</script>

<template>
  <div class="fixed inset-x-0 top-0 z-[60] h-0.5 bg-transparent">
    <div
      class="h-full bg-accent transition-[width] duration-75 ease-out"
      :style="{ width: `${progress}%` }"
    />
  </div>
</template>