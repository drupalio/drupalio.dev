<script setup lang="ts">
interface Props {
  variant?: 'default' | 'flat' | 'hover'
  padding?: 'sm' | 'md' | 'lg' | 'none'
  as?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  padding: 'md',
  as: 'div',
})

const paddingClass = computed(() => ({
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}[props.padding]))

const variantClass = computed(() => ({
  default: 'bento-card',
  flat: 'bg-transparent border-0 shadow-none',
  hover: 'bento-card bento-card-hover cursor-pointer hover:-translate-y-0.5',
}[props.variant]))
</script>

<template>
  <component :is="as" :class="[variantClass, paddingClass]">
    <slot />
  </component>
</template>