export type Theme = 'light' | 'dark'

export const useTheme = () => {
  const colorMode = useColorMode()

  const isDark = computed({
    get: () => colorMode.value === 'dark',
    set: (val: boolean) => {
      colorMode.preference = val ? 'dark' : 'light'
    },
  })

  const toggle = () => {
    if (import.meta.client && document.startViewTransition) {
      document.startViewTransition(() => {
        isDark.value = !isDark.value
      })
    } else {
      isDark.value = !isDark.value
    }
  }

  return {
    isDark,
    toggle,
  }
}