<template>
  <div class="app-container">
    <div class="neo-bg">
      <div class="noise-overlay"></div>
      <div class="grid-overlay"></div>
      <div class="gradient-sphere"></div>
      <div class="gradient-sphere secondary"></div>
      <div class="gradient-sphere tertiary"></div>
    </div>
    <main class="main-content">
      <div v-if="currentView === 'resume'">
        <Resume />
      </div>
      <div v-else-if="currentView === 'harvard-cv'">
        <HarvardCV />
      </div>
    </main>
  </div>
</template>

<script setup>
import Resume from './components/Resume.vue'
import { onMounted, ref, watch } from 'vue'

// Get i18n instance
const { $i18n } = useNuxtApp()
const locale = ref($i18n.global.locale.value || 'en')

// Estado del tema
const isDarkTheme = ref(true)

// Estado del idioma
const currentLanguage = ref(locale.value || 'en')

// Estado de la vista actual
const currentView = ref('resume')

// Función para cambiar a la vista de Harvard CV
function goToHarvardCV() {
  currentView.value = 'harvard-cv'
}

// Función para volver a la vista principal
function goToResume() {
  currentView.value = 'resume'
}

// Observar cambios en la URL para detectar la vista de Harvard CV
// Solo ejecutar en el cliente
if (process.client) {
  watch(() => window.location.href, (newUrl) => {
    if (newUrl.includes('harvard-cv')) {
      currentView.value = 'harvard-cv'
    } else {
      currentView.value = 'resume'
    }
  }, { immediate: true })
}

// Función para cambiar el tema
function toggleTheme() {
  if (process.client) {
    isDarkTheme.value = !isDarkTheme.value

    if (isDarkTheme.value) {
      document.body.classList.remove('neo-theme-light')
      document.body.classList.add('neo-theme-tokyo-night')
      localStorage.setItem('theme', 'dark')
    } else {
      document.body.classList.remove('neo-theme-tokyo-night')
      document.body.classList.add('neo-theme-light')
      localStorage.setItem('theme', 'light')
    }

    // Recargar la página para actualizar las estadísticas de GitHub
    window.location.reload()
  }
}

// Función para cambiar el idioma
function toggleLanguage() {
  const newLanguage = locale.value === 'en' ? 'es' : 'en'
  locale.value = newLanguage
  currentLanguage.value = newLanguage

  if (process.client) {
    $i18n.global.locale.value = newLanguage
    localStorage.setItem('language', newLanguage)
  }
}

onMounted(() => {
  if (process.client) {
    // Verificar si hay un tema guardado en localStorage
    const savedTheme = localStorage.getItem('theme')

    // Verificar si hay un idioma guardado en localStorage
    const savedLanguage = localStorage.getItem('language')
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'es')) {
      locale.value = savedLanguage
      currentLanguage.value = savedLanguage
      $i18n.global.locale.value = savedLanguage
    }

    if (savedTheme === 'light') {
      isDarkTheme.value = false
      document.body.classList.add('neo-theme-light')
    } else {
      // Por defecto, usar tema oscuro
      isDarkTheme.value = true
      document.body.classList.add('neo-theme-tokyo-night')
    }
  }
})
</script>

<style>
/* Variables de tema */
:root {
  /* Tema oscuro (Tokyo Night) - valores por defecto */
  --neo-bg: #1a1b26;
  --neo-surface: #16161e;
  --neo-primary: #7aa2f7;
  --neo-primary-rgb: 122, 162, 247;
  --neo-secondary: #bb9af7;
  --neo-secondary-rgb: 187, 154, 247;
  --neo-accent: #f7768e;
  --neo-accent-rgb: 247, 118, 142;
  --neo-text: #a9b1d6;
  --neo-text-secondary: #9699b7; /* Mejorado para contraste */
  --neo-border: #565f89;
  --neo-radius-sm: 8px;
  --neo-radius-md: 12px;
  --neo-radius-lg: 16px;
  --neo-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  --neo-glow: 0 8px 20px rgba(122, 162, 247, 0.25);
  --neo-font-sans: 'Inter', 'SF Pro Display', -apple-system, sans-serif;
  --neo-font-mono: 'Space Mono', monospace;
}

/* Tema claro */
.neo-theme-light {
  --neo-bg: #f5f5f7;
  --neo-surface: #ffffff;
  --neo-primary: #0071e3;
  --neo-primary-rgb: 0, 113, 227;
  --neo-secondary: #5e5ce6;
  --neo-secondary-rgb: 94, 92, 230;
  --neo-accent: #ff375f;
  --neo-accent-rgb: 255, 55, 95;
  --neo-text: #1d1d1f;
  --neo-text-secondary: #555558; /* Mejorado para contraste */
  --neo-border: #d2d2d7;
  --neo-radius-sm: 8px;
  --neo-radius-md: 12px;
  --neo-radius-lg: 16px;
  --neo-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  --neo-glow: 0 8px 20px rgba(0, 113, 227, 0.25);
  --neo-font-sans: 'Inter', 'SF Pro Display', -apple-system, sans-serif;
  --neo-font-mono: 'Space Mono', monospace;
}

/* Reset básico */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  overflow-y: auto;
}

.app-container {
  position: relative;
  min-height: 100vh;
  width: 100%;
}

.main-content {
  position: relative;
  z-index: 10;
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
}

.neo-theme-tokyo-night, .neo-theme-light {
  background-color: var(--neo-bg);
  color: var(--neo-text);
  font-family: 'Inter', 'SF Pro Display', -apple-system, sans-serif;
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* Importar fuentes modernas */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Mono&display=swap');
</style>

<style scoped>
.neo-bg {
  background-color: var(--neo-bg);
  min-height: 100vh;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
}

/* Overlay de ruido para textura */
.noise-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=');
  background-attachment: fixed;
  z-index: 1;
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.neo-theme-tokyo-night .noise-overlay {
  opacity: 0.4;
}

.neo-theme-light .noise-overlay {
  opacity: 0.2;
}

/* Grid futurista */
.grid-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-size: 40px 40px;
  background-attachment: fixed;
  z-index: 2;
  pointer-events: none;
  transition: background-image 0.3s ease;
}

.neo-theme-tokyo-night .grid-overlay {
  background-image:
    linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
}

.neo-theme-light .grid-overlay {
  background-image:
    linear-gradient(to right, rgba(0, 0, 0, 0.03) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(0, 0, 0, 0.03) 1px, transparent 1px);
}

/* Esferas de gradiente */
.gradient-sphere {
  position: absolute;
  width: 40vw;
  height: 40vw;
  border-radius: 100%;
  filter: blur(60px);
  top: -10vw;
  right: -10vw;
  z-index: 3;
  pointer-events: none;
  animation: float 20s ease-in-out infinite alternate;
  transition: background 0.3s ease;
}

.neo-theme-tokyo-night .gradient-sphere {
  background: radial-gradient(circle, rgba(122, 162, 247, 0.15) 0%, rgba(122, 162, 247, 0) 70%); /* Azul de Tokyo Night */
}

.neo-theme-light .gradient-sphere {
  background: radial-gradient(circle, rgba(0, 113, 227, 0.1) 0%, rgba(0, 113, 227, 0) 70%); /* Azul del tema claro */
}

.gradient-sphere.secondary {
  width: 50vw;
  height: 50vw;
  bottom: -20vw;
  left: -15vw;
  top: auto;
  right: auto;
  position: absolute;
  animation: float 25s ease-in-out infinite alternate-reverse;
}

.neo-theme-tokyo-night .gradient-sphere.secondary {
  background: radial-gradient(circle, rgba(187, 154, 247, 0.1) 0%, rgba(187, 154, 247, 0) 70%); /* Morado de Tokyo Night */
}

.neo-theme-light .gradient-sphere.secondary {
  background: radial-gradient(circle, rgba(94, 92, 230, 0.08) 0%, rgba(94, 92, 230, 0) 70%); /* Morado del tema claro */
}

.gradient-sphere.tertiary {
  width: 45vw;
  height: 45vw;
  top: 40vh;
  right: -10vw;
  position: absolute;
  animation: float 30s ease-in-out infinite alternate;
}

.neo-theme-tokyo-night .gradient-sphere.tertiary {
  background: radial-gradient(circle, rgba(247, 118, 142, 0.08) 0%, rgba(247, 118, 142, 0) 70%); /* Rosa de Tokyo Night */
}

.neo-theme-light .gradient-sphere.tertiary {
  background: radial-gradient(circle, rgba(255, 55, 95, 0.06) 0%, rgba(255, 55, 95, 0) 70%); /* Rosa del tema claro */
}

@keyframes float {
  0% { transform: translate(0, 0); }
  100% { transform: translate(5%, 5%); }
}

/* Botón de cambio de tema */
.theme-toggle {
  position: fixed;
  top: 1rem;
  right: 1rem;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: var(--neo-surface);
  border: 1px solid var(--neo-border);
  color: var(--neo-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 100;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.theme-toggle:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  color: var(--neo-accent);
}

.theme-toggle svg {
  font-size: 1.2rem;
}

/* Botón de cambio de idioma */
.language-toggle {
  position: fixed;
  top: 1rem;
  right: 4rem;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: var(--neo-surface);
  border: 1px solid var(--neo-border);
  color: var(--neo-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 100;
  transition: all 0.3s ease;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 0.8rem;
}

.language-toggle:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  color: var(--neo-accent);
}
</style>