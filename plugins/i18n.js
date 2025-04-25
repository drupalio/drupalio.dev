import { createI18n } from 'vue-i18n'
import en from '../locales/en.json'
import es from '../locales/es.json'

export default defineNuxtPlugin(({ vueApp }) => {
  console.log('Loaded locales:', { en, es })

  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: process.client && localStorage.getItem('language') ? localStorage.getItem('language') : 'en',
    fallbackLocale: 'en',
    silentTranslationWarn: true,
    silentFallbackWarn: true,
    missingWarn: false,
    fallbackWarn: false,
    messages: {
      en,
      es
    }
  })

  vueApp.use(i18n)

  // Provide i18n instance to the app
  vueApp.provide('i18n', i18n)

  return {
    provide: {
      i18n: i18n
    }
  }
})
