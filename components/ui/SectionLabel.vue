<script setup lang="ts">
interface Props {
  number?: string
  label: string
  as?: 'h2' | 'div'
}

const props = withDefaults(defineProps<Props>(), { as: 'h2', number: '' })
</script>

<template>
  <div class="flex items-baseline gap-3">
    <span v-if="number" class="font-mono text-sm text-text-muted tabular-nums">{{ number }}</span>
    <component :is="props.as" class="section-label">{{ label }}</component>
  </div>
</template>
