export type Locale = 'en' | 'es'

export const useLanguage = () => {
  const { $i18n } = useNuxtApp()

  const currentLocale = computed<Locale>(() => {
    if (!$i18n?.global?.locale?.value) return 'en'
    return $i18n.global.locale.value as Locale
  })

  const toggle = () => {
    if (!$i18n?.global) return
    const next = currentLocale.value === 'en' ? 'es' : 'en'
    $i18n.global.locale.value = next
    if (import.meta.client) {
      localStorage.setItem('language', next)
    }
  }

  const set = (locale: Locale) => {
    if (!$i18n?.global) return
    $i18n.global.locale.value = locale
    if (import.meta.client) {
      localStorage.setItem('language', locale)
    }
  }

  return {
    current: currentLocale,
    toggle,
    set,
  }
}