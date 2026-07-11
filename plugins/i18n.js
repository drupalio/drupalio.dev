import { createI18n } from 'vue-i18n'
import enData from '../locales/en.json'
import esData from '../locales/es.json'

export default defineNuxtPlugin(({ vueApp }) => {
  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: 'en',
    fallbackLocale: 'en',
    silentTranslationWarn: true,
    silentFallbackWarn: true,
    missingWarn: false,
    fallbackWarn: false,
    messages: {
      en: enData,
      es: esData,
    },
  })

  vueApp.use(i18n)

  return {
    provide: {
      i18n,
    },
  }
})