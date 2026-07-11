<script setup lang="ts">
const { current, toggle } = useLanguage()
</script>

<template>
  <button
    type="button"
    class="inline-flex h-9 items-center gap-1.5 rounded-lg border border-border bg-surface px-3 font-mono text-xs font-medium uppercase tracking-wider text-text-muted transition-all duration-150 hover:text-text hover:border-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
    :aria-label="`Switch language, current: ${current}`"
    @click="toggle"
  >
    <ClientOnly>
      <span>{{ current }}</span>
    </ClientOnly>
  </button>
</template>