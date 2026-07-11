<script setup lang="ts">
interface Props {
  value: number
  suffix?: string
  prefix?: string
  duration?: number
}

const props = withDefaults(defineProps<Props>(), {
  suffix: '',
  prefix: '',
  duration: 1200,
})

const display = ref(0)
const { target, inView } = useInView()

watch(inView, (visible) => {
  if (!visible) return

  const start = performance.now()
  const animate = (now: number) => {
    const progress = Math.min((now - start) / props.duration, 1)
    const eased = 1 - Math.pow(1 - progress, 3)
    display.value = Math.floor(eased * props.value)
    if (progress < 1) {
      requestAnimationFrame(animate)
    } else {
      display.value = props.value
    }
  }
  requestAnimationFrame(animate)
})
</script>

<template>
  <span ref="target" class="font-mono tabular-nums">
    {{ prefix }}{{ display.toLocaleString() }}{{ suffix }}
  </span>
</template>