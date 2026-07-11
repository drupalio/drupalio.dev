export default defineNuxtPlugin(() => {
  if (!import.meta.client) return

  const { toggle } = useTheme()

  const handler = (e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'd') {
      e.preventDefault()
      toggle()
    }
  }

  window.addEventListener('keydown', handler)

  onBeforeUnmount(() => {
    window.removeEventListener('keydown', handler)
  })
})