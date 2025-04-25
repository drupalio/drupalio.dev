import { defineStore } from 'pinia'
import { translations } from '../i18n/translations'

export const useLanguageStore = defineStore('language', {
  state: () => ({
    currentLanguage: localStorage.getItem('language') || 'es' // Por defecto español
  }),
  
  getters: {
    t: (state) => {
      return (key) => {
        return translations[state.currentLanguage][key] || key
      }
    }
  },
  
  actions: {
    setLanguage(lang) {
      if (translations[lang]) {
        this.currentLanguage = lang
        localStorage.setItem('language', lang)
      }
    },
    
    toggleLanguage() {
      const newLang = this.currentLanguage === 'es' ? 'en' : 'es'
      this.setLanguage(newLang)
    }
  }
})
