type Locale = 'en' | 'es'

export default defineNuxtRouteMiddleware(() => {
  const { $i18n } = useNuxtApp()
  if (!$i18n?.global) return

  const cookie = useCookie<string>('language', {
    default: () => 'en',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 365,
  })

  const knownLocales: Locale[] = ['en', 'es']
  const saved = (cookie.value as Locale) || 'en'

  if (knownLocales.includes(saved) && saved !== $i18n.global.locale.value) {
    $i18n.global.locale.value = saved
  }
})