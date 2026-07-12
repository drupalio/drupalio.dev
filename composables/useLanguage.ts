export type Locale = 'en' | 'es'

export const useLanguage = () => {
  const { $i18n } = useNuxtApp()

  const cookie = useCookie<string>('language', {
    default: () => 'en',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 365,
  })

  const currentLocale = computed<Locale>(() => {
    if (!$i18n?.global?.locale?.value) return 'en'
    return $i18n.global.locale.value as Locale
  })

  const set = (locale: Locale) => {
    if (!$i18n?.global) return
    $i18n.global.locale.value = locale
    cookie.value = locale
  }

  const toggle = () => {
    const next: Locale = currentLocale.value === 'en' ? 'es' : 'en'
    set(next)
  }

  return {
    current: currentLocale,
    toggle,
    set,
  }
}