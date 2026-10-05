<script setup lang="ts">
const { isDark, toggle } = useTheme()
</script>

<template>
  <button
    type="button"
    class="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface text-text-muted transition-colors duration-150 hover:text-text hover:border-accent/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    @click="toggle"
  >
    <ClientOnly>
      <Icon
        :name="isDark ? 'lucide:sun' : 'lucide:moon'"
        size="16"
        class="transition-transform duration-200"
      />
      <template #fallback>
        <div class="h-4 w-4" />
      </template>
    </ClientOnly>
  </button>
</template>