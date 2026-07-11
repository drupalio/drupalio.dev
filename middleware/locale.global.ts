type Locale = 'en' | 'es'

export default defineNuxtRouteMiddleware((to) => {
  if (!import.meta.client) return

  const { $i18n } = useNuxtApp()
  if (!$i18n?.global) return

  const localePath = to.path

  const knownLocales: Locale[] = ['en', 'es']
  const firstSegment = localePath.split('/')[1] as Locale

  if (knownLocales.includes(firstSegment)) {
    const locale: Locale = firstSegment
    if ($i18n.global.locale.value !== locale) {
      $i18n.global.locale.value = locale
      localStorage.setItem('language', locale)
    }
    return
  }

  const saved = (localStorage.getItem('language') || 'en') as Locale
  if (saved && knownLocales.includes(saved) && saved !== 'en') {
    return navigateTo(`/${saved}${localePath === '/' ? '' : localePath}`, { replace: true })
  }

  if (saved !== $i18n.global.locale.value) {
    $i18n.global.locale.value = saved
  }
})