export const useInView = (options?: IntersectionObserverInit) => {
  const target = ref<HTMLElement | null>(null)
  const inView = ref(false)

  onMounted(() => {
    if (!target.value) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          inView.value = true
          observer.disconnect()
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -10% 0px',
        ...options,
      },
    )

    observer.observe(target.value)

    onBeforeUnmount(() => observer.disconnect())
  })

  return {
    target,
    inView,
  }
}