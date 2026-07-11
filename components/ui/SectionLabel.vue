<script setup lang="ts">
interface Props {
  number?: string
  label: string
}

defineProps<Props>()
</script>

<template>
  <div class="flex items-baseline gap-3">
    <span v-if="number" class="font-mono text-sm text-text-muted tabular-nums">{{ number }}</span>
    <span class="section-label">{{ label }}</span>
  </div>
</template>