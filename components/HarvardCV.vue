<template>
  <div class="harvard-container">
    <div class="harvard-content">
      <h1 class="harvard-title">Harvard CV Format</h1>
      <p class="harvard-description">This is a placeholder for the Harvard CV format. The actual CV is generated when you click the download button.</p>

      <div class="harvard-actions">
        <button @click="goToResume" class="harvard-button back">
          <font-awesome-icon :icon="['fas', 'arrow-left']" /> Back to Resume
        </button>
        <button @click="generateHarvardPDF" class="harvard-button download">
          <font-awesome-icon :icon="['fas', 'download']" /> Download Harvard CV
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'

// Get i18n instance
const { $i18n } = useNuxtApp()
const locale = ref($i18n.global.locale.value || 'en')
const currentLanguage = ref(locale.value)

// Define t and tm functions
const t = (key) => {
  try {
    // Intenta usar la función t de vue-i18n
    const result = $i18n.global.t(key)
    if (result === key) {
      // Si devuelve la misma clave, es posible que no se haya encontrado la traducción
      // Intentamos acceder directamente
      return getNestedValue(key, false)
    }
    return result
  } catch (error) {
    console.error(`Error translating key: ${key}`, error)
    // Fallback to direct access
    return getNestedValue(key, false)
  }
}

const tm = (key) => {
  try {
    // Intenta usar la función tm de vue-i18n
    const result = $i18n.global.tm(key)
    if (Object.keys(result).length === 0) {
      // Si devuelve un objeto vacío, es posible que no se haya encontrado la traducción
      // Intentamos acceder directamente
      return getNestedValue(key, true)
    }
    return result
  } catch (error) {
    console.error(`Error translating key: ${key}`, error)
    // Fallback to direct access
    return getNestedValue(key, true)
  }
}

// Función auxiliar para acceder a valores anidados en el objeto de mensajes
const getNestedValue = (key, isObject) => {
  console.log(`Accessing nested value for key: ${key}, isObject: ${isObject}`)
  const parts = key.split('.')
  let result = $i18n.global.messages.value[locale.value]

  // Imprimir el objeto de mensajes para depuración
  console.log('Messages:', JSON.stringify(result).substring(0, 200) + '...')

  for (const part of parts) {
    if (result && result[part] !== undefined) {
      result = result[part]
    } else {
      console.error(`Part ${part} not found in path ${key}`)
      return isObject ? {} : key
    }
  }

  if (isObject) {
    return Array.isArray(result) || typeof result === 'object' ? result : {}
  } else {
    return typeof result === 'string' ? result : key
  }
}

// Import html2pdf only on client-side
let html2pdf = null
if (process.client) {
  html2pdf = await import('html2pdf.js')
}

// Function to go back to the main resume
const goToResume = () => {
  if (process.client) {
    window.location.href = '/'
  }
}

// Function to generate Harvard PDF
const generateHarvardPDF = () => {
  if (!process.client) return;

  // Create a temporary div to contain the Harvard CV
  const tempDiv = document.createElement('div')
  tempDiv.id = 'harvard-cv-container'
  tempDiv.style.width = '8.5in'
  tempDiv.style.padding = '0'
  tempDiv.style.backgroundColor = 'white'
  tempDiv.style.color = 'black'
  tempDiv.style.fontFamily = 'Calibri, Arial, sans-serif'

  // Generate HTML directly
  const name = t('personalInfo.name')
  const title = t('personalInfo.title')
  const summary = t('summary.summaryText')

  // Create HTML for the Harvard CV
  // Use the same padding for both languages
  const padding = '1in'

  let htmlContent = `
    <div style="padding: ${padding}; font-family: Calibri, Arial, sans-serif; color: black; background-color: white; line-height: 1.4; max-width: 8.5in; margin: 0 auto; box-sizing: border-box; border-top: 4px solid #333; border-bottom: 4px solid #333; position: relative;">
      <!-- Decorative side borders -->
      <div style="position: absolute; top: 0; left: 0.25in; bottom: 0; border-left: 1px solid #999; z-index: 1;"></div>
      <div style="position: absolute; top: 0; right: 0.25in; bottom: 0; border-left: 1px solid #999; z-index: 1;"></div>
      <!-- Header -->
      <div style="text-align: center; margin-bottom: 0.5in; border-bottom: 2px solid #333; padding-bottom: 0.2in; border-top: 2px solid #333; padding-top: 0.2in;">
        <h1 style="font-size: 24pt; margin: 0 0 0.1in 0; color: #000; font-family: Calibri, Arial, sans-serif;">${name}</h1>
        <h2 style="font-size: 14pt; margin: 0; color: #333; font-weight: 500; font-family: Calibri, Arial, sans-serif;">${title}</h2>
      </div>

      <!-- Summary -->
      <div style="margin-bottom: 0.4in;">
        <h2 style="font-size: 14pt; color: #000; border-bottom: 1px solid #333; border-top: 1px solid #333; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 0.15in; padding: 0.05in 0; font-family: Calibri, Arial, sans-serif;">${t('summary.title')}</h2>
        <p style="line-height: 1.5; font-size: 11pt;">${summary}</p>
      </div>

      <!-- Professional Experience -->
      <div style="margin-bottom: 0.4in;">
        <h2 style="font-size: 14pt; color: #000; border-bottom: 1px solid #333; border-top: 1px solid #333; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 0.15in; padding: 0.05in 0; font-family: Calibri, Arial, sans-serif;">${t('workExperienceSection.title')}</h2>
        <p style="font-size: 11pt; font-style: italic;">Please see the interactive resume for detailed work experience.</p>
      </div>

      <!-- Education -->
      <div style="margin-bottom: 0.4in;">
        <h2 style="font-size: 14pt; color: #000; border-bottom: 1px solid #333; border-top: 1px solid #333; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 0.15in; padding: 0.05in 0; font-family: Calibri, Arial, sans-serif;">${t('educationSection.title')}</h2>
        <p style="font-size: 11pt; font-style: italic;">Please see the interactive resume for detailed education information.</p>
      </div>

      <!-- Skills -->
      <div style="margin-bottom: 0.4in;">
        <h2 style="font-size: 14pt; color: #000; border-bottom: 1px solid #333; border-top: 1px solid #333; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 0.15in; padding: 0.05in 0; font-family: Calibri, Arial, sans-serif;">${t('skillsSection.title')}</h2>
        <p style="font-size: 11pt; font-style: italic;">Please see the interactive resume for detailed skills information.</p>
      </div>
    </div>
  `

  // Set the HTML in the temporary div
  tempDiv.innerHTML = htmlContent

  // Add the temporary div to the document
  document.body.appendChild(tempDiv)

  // Wait for the DOM to update completely
  setTimeout(() => {
    // Make sure the content is fully rendered
    console.log('Content height:', tempDiv.scrollHeight)
    // Configure options for html2pdf
    const opt = {
      margin: 0, // We already have margin in the HTML
      filename: `CV_${name.replace(/\s+/g, '_')}_Harvard_Format.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        logging: true,
        allowTaint: true,
        windowHeight: tempDiv.scrollHeight + 20
      },
      jsPDF: {
        unit: 'in',
        format: 'letter',
        orientation: 'portrait',
        compress: true,
        putOnlyUsedFonts: true
      },
      pagebreak: { mode: ['avoid-all'] }
    }

    // Show loading message
    console.log('Generating PDF...')

    // Generate the PDF
    if (html2pdf && html2pdf.default) {
      // If imported as a module (ESM)
      html2pdf.default()
        .from(tempDiv)
        .set(opt)
        .save()
        .then(() => {
          console.log('PDF generated successfully')
          // Clean up after generating the PDF
          document.body.removeChild(tempDiv)
        })
        .catch(error => {
          console.error('Error generating PDF:', error)
          // Clean up in case of error
          document.body.removeChild(tempDiv)
        })
    } else {
      console.error('html2pdf is not available in the client environment')
      document.body.removeChild(tempDiv)
    }
  }, 300) // Increase the wait time to ensure the content is fully loaded
}

onMounted(() => {
  if (typeof localStorage !== 'undefined' && typeof document !== 'undefined') {
    // Initialize language from localStorage
    const savedLanguage = localStorage.getItem('language')
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'es')) {
      locale.value = savedLanguage
      currentLanguage.value = savedLanguage
      if ($i18n && $i18n.global) {
        $i18n.global.locale.value = savedLanguage
      }
    }
  }
})
</script>

<style scoped>
.harvard-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.harvard-content {
  background-color: var(--neo-surface);
  border-radius: var(--neo-radius-lg);
  padding: 3rem;
  width: 100%;
  max-width: 800px;
  text-align: center;
  box-shadow: var(--neo-shadow);
  border: 1px solid var(--neo-border);
}

.harvard-title {
  font-size: 2.5rem;
  color: var(--neo-primary);
  margin-bottom: 1.5rem;
  font-weight: 700;
  background: linear-gradient(to right, var(--neo-primary), var(--neo-secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.harvard-description {
  font-size: 1.2rem;
  color: var(--neo-text);
  margin-bottom: 2.5rem;
  line-height: 1.6;
}

.harvard-actions {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 2rem;
}

.harvard-button {
  padding: 0.8rem 1.5rem;
  border-radius: var(--neo-radius-sm);
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border: none;
}

.harvard-button.back {
  background-color: var(--neo-surface);
  color: var(--neo-text);
  border: 1px solid var(--neo-border);
}

.harvard-button.back:hover {
  background-color: var(--neo-border);
  transform: translateY(-2px);
}

.harvard-button.download {
  background-color: var(--neo-primary);
  color: white;
}

.harvard-button.download:hover {
  background-color: var(--neo-secondary);
  transform: translateY(-2px);
  box-shadow: var(--neo-glow);
}
</style>
