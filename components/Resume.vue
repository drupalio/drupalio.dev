<template>
<div class="neo-container" ref="containerRef">
    <!-- Contenedor sticky para los botones de control -->
    <div class="controls-wrapper">
      <div class="controls-container">
        <button @click="toggleTheme" class="neo-button theme-toggle" :title="isDarkTheme ? 'Cambiar a tema claro' : 'Cambiar a tema oscuro'">
          <font-awesome-icon :icon="['fas', isDarkTheme ? 'sun' : 'moon']" />
        </button>
        <button @click="toggleLanguage" class="neo-button language-toggle" :title="currentLanguage === 'en' ? 'Cambiar a español' : 'Switch to English'">
          {{ currentLanguage === 'en' ? 'ES' : 'EN' }}
        </button>
       <!--<button @click="generateHarvardPDF" class="neo-button harvard-toggle" :title="currentLanguage === 'en' ? 'Download Harvard CV' : 'Descargar CV Harvard'">
          <font-awesome-icon :icon="['fas', 'graduation-cap']" />
        </button>-->
      </div>
    </div>

    <div class="neo-content-wrapper">

    <!-- Sección de Información Personal -->
<section class="neo-section">
  <div class="profile-container">
    <div class="profile-image-container">
      <img :src="profilePicture" alt="Profile" class="neo-profile-image" />
    </div>
    <div class="profile-info">
      <div class="title-social-container">
        <h1 class="neo-title">{{ t('personalInfo.name') }}</h1>
        <div class="social-links">
          <a v-for="(link, index) in socialLinks"
             :key="index"
             :href="link.url"
             target="_blank"
             class="neo-link">
            <font-awesome-icon :icon="link.icon" />
          </a>
        </div>
      </div>
      <h2 class="neo-subtitle">{{ t('personalInfo.title') }}</h2>
    </div>
  </div>
</section>



    <!-- Sección de Resumen -->
    <section class="neo-section">
      <h2 class="section-title">{{ t('summary.title') }}</h2>
      <p class="neo-text">{{ t('summary.summaryText') }}</p>
    </section>

    <!-- Sección de Experiencia Laboral -->
    <section class="neo-section">
      <h2 class="section-title">{{ currentLanguage === 'en' ? 'Work Experience' : 'Experiencia Laboral' }}</h2>

      <div class="carousel-container">
        <!-- Overlay para efecto de transición -->
        <div :class="['carousel-overlay', { 'active': isWorkTransitioning }]"></div>

        <div class="experience-carousel">
          <div v-for="(job, index) in workExperience"
               :key="index"
               :class="['carousel-slide', { 'active': currentWorkSlide === index }]">
            <div class="carousel-card">
              <div class="card-header">
                <div class="company-icon">
                  <font-awesome-icon :icon="job.icon || ['fas', 'briefcase']" />
                </div>
                <div class="company-info">
                  <h3 class="job-title">{{ job.title }}</h3>
                  <h4 class="company-name">{{ job.company }}</h4>
                  <p class="period">{{ job.period }}</p>
                </div>
              </div>

              <div class="card-content">
                <!-- Timeline de proyectos -->
                <div class="company-timeline-container" v-if="job.projects && job.projects.length > 0">
                  <div class="company-timeline-line"></div>

                  <div v-for="(project, pIndex) in job.projects" :key="pIndex" class="company-timeline-item">
                    <div class="project-dot"></div>
                    <div class="project-content">
                      <h4 class="project-name">{{ project.name }}</h4>
                      <p class="project-description">{{ project.description }}</p>

                      <div class="project-technologies">
                        <span v-for="(tech, tIndex) in project.technologies" :key="tIndex" class="technology-tag">
                          {{ tech }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Responsabilidades generales -->
                <ul v-if="job.responsibilities" class="responsibilities">
                  <li v-for="(resp, rIndex) in job.responsibilities" :key="rIndex">
                    {{ resp }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <!-- Controles laterales -->
        <button @click.prevent="prevWorkSlideWithTransition" class="carousel-control-side prev">
          <div class="control-icon">
            <font-awesome-icon :icon="['fas', 'chevron-left']" />
          </div>
        </button>
        <button @click.prevent="nextWorkSlideWithTransition" class="carousel-control-side next">
          <div class="control-icon">
            <font-awesome-icon :icon="['fas', 'chevron-right']" />
          </div>
        </button>

        <!-- Indicadores que se muestran temporalmente -->
        <div :class="['carousel-indicators-floating', { 'visible': isWorkIndicatorsVisible }]">
          <div class="carousel-progress">
            <span class="progress-number">{{ Math.round((currentWorkSlide + 1) / workExperience.length * 100) }}%</span>
          </div>
          <div class="indicators-container">
            <span v-for="(_, index) in workExperience"
                  :key="index"
                  :class="['indicator', { 'active': currentWorkSlide === index }]"
                  @click.prevent="goToWorkSlideWithTransition(index)"></span>
          </div>
        </div>
      </div>
    </section>

    <!-- Sección de Educación -->
    <section class="neo-section">
      <h2 class="section-title">{{ currentLanguage === 'en' ? 'Education' : 'Educación' }}</h2>

      <!-- Educación Formal -->
      <h3 class="subsection-title">{{ currentLanguage === 'en' ? 'Formal Education' : 'Educación Formal' }}</h3>
      <div class="education-container">
        <div v-for="(edu, index) in formalEducation"
             :key="index"
             class="education-item">
          <div class="education-icon">
            <font-awesome-icon :icon="['fas', 'graduation-cap']" />
          </div>
          <div class="education-details">
            <h3 class="education-degree">{{ edu.degree }}</h3>
            <h4 class="education-institution">{{ edu.institution }}</h4>
            <p class="education-period">{{ edu.period }}</p>
          </div>
        </div>
      </div>

      <!-- Certificaciones -->
      <h3 class="subsection-title">{{ currentLanguage === 'en' ? 'Certifications' : 'Certificaciones' }}</h3>
      <div class="education-container">
        <div v-for="(cert, index) in educationCertifications"
             :key="index"
             class="education-item">
          <div class="education-icon">
            <font-awesome-icon :icon="cert.icon || ['fas', 'certificate']" />
          </div>
          <div class="education-details">
            <h3 class="education-degree">{{ cert.title }}</h3>
            <h4 class="education-institution">{{ cert.platform }}</h4>
            <p class="education-period">{{ cert.issue_date }}</p>
            <p v-if="cert.credential_id" class="credential-id">ID: {{ cert.credential_id }}</p>
          </div>
        </div>
      </div>

      <!-- Cursos -->
      <h3 class="subsection-title">{{ currentLanguage === 'en' ? 'Courses' : 'Cursos' }}</h3>
      <div class="education-container">
        <div v-for="(course, index) in showAllCourses ? educationCourses : educationCourses.slice(0, 5)"
             :key="index"
             class="education-item">
          <div class="education-icon">
            <font-awesome-icon :icon="course.icon || ['fas', 'book']" />
          </div>
          <div class="education-details">
            <h3 class="education-degree">{{ course.title }}</h3>
            <h4 class="education-institution">{{ course.platform }}</h4>
            <p class="education-period">{{ course.completion_date }}</p>
            <a v-if="course.link" :href="course.link" target="_blank" class="course-link">
              <font-awesome-icon :icon="['fas', 'external-link-alt']" /> {{ currentLanguage === 'en' ? 'View Certificate' : 'Ver Certificado' }}
            </a>
          </div>
        </div>
      </div>

      <div class="view-more-container">
        <button @click="toggleShowAllCourses" class="view-more-button">
          <font-awesome-icon :icon="['fas', showAllCourses ? 'chevron-up' : 'chevron-down']" />
          {{ showAllCourses
            ? (currentLanguage === 'en' ? 'Show Less' : 'Mostrar Menos')
            : (currentLanguage === 'en' ? 'View All Courses' : 'Ver Todos los Cursos')
          }}
        </button>
      </div>
    </section>

    <!-- Sección de Habilidades -->
    <section class="neo-section">
      <h2 class="section-title">{{ currentLanguage === 'en' ? 'Skills' : 'Habilidades' }}</h2>

      <div class="carousel-container skills-carousel-container">
        <!-- Overlay para efecto de transición -->
        <div :class="['carousel-overlay', { 'active': isSkillsTransitioning }]"></div>

        <div class="experience-carousel skills-carousel">
          <!-- Carrusel de habilidades -->
          <div v-for="(category, index) in skillCategories"
               :key="category.id"
               :class="['carousel-slide', { 'active': currentSkillsSlide === index }]">
            <div class="carousel-card skills-card">
              <div class="card-header">
                <h3 class="skill-category-title">{{ category.title }}</h3>
              </div>
              <div class="card-content">
                <div class="skill-grid">
                  <div v-for="(skill, skillIndex) in getSkillsData(category.data)"
                       :key="skillIndex"
                       class="skill-item">
                    <div class="skill-info">
                      <div class="skill-icon">
                        <font-awesome-icon :icon="skill.icon || ['fas', 'code']" />
                      </div>
                      <span class="skill-name">{{ skill.name }}</span>
                    </div>
                    <span class="skill-level">{{ skill.level }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Controles laterales -->
        <button @click.prevent="prevSkillsSlideWithTransition" class="carousel-control-side prev">
          <div class="control-icon">
            <font-awesome-icon :icon="['fas', 'chevron-left']" />
          </div>
        </button>
        <button @click.prevent="nextSkillsSlideWithTransition" class="carousel-control-side next">
          <div class="control-icon">
            <font-awesome-icon :icon="['fas', 'chevron-right']" />
          </div>
        </button>

        <!-- Indicadores que se muestran temporalmente -->
        <div :class="['carousel-indicators-floating', { 'visible': isSkillsIndicatorsVisible }]">
          <div class="carousel-progress">
            <span class="progress-number">{{ Math.round((currentSkillsSlide + 1) / skillCategories.length * 100) }}%</span>
          </div>
          <div class="indicators-container">
            <span v-for="(category, index) in skillCategories"
                  :key="category.id"
                  :class="['indicator', { 'active': currentSkillsSlide === index }]"
                  @click.prevent="goToSkillsSlideWithTransition(index)"></span>
          </div>
        </div>
      </div>
    </section>

    <!-- Sección de Habilidades Blandas -->
    <section class="neo-section">
      <h2 class="section-title">{{ t('softSkillsSection.title') }}</h2>
      <p class="section-description">
        {{ t('softSkillsSection.description') }}
      </p>
      <div class="soft-skills-container">
        <div v-for="(skill, index) in softSkills"
             :key="index"
             class="soft-skill-item">
          <div class="soft-skill-icon">
            <font-awesome-icon :icon="skill.icon" />
          </div>
          <div class="soft-skill-name">{{ skill.name }}</div>
        </div>
      </div>
    </section>
  </div>
</div>
</template>

<script setup>
import { inject } from 'vue'
import { onMounted, ref, computed } from 'vue'
import { animateHero } from '../animations'

// Import html2pdf only on client-side
let html2pdf = null
if (process.client) {
  html2pdf = await import('html2pdf.js')
}

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
const isDarkTheme = ref(true)
const currentWorkSlide = ref(0)
const currentSkillsSlide = ref(0)
const isWorkTransitioning = ref(false)
const isSkillsTransitioning = ref(false)
const isWorkIndicatorsVisible = ref(false)
const isSkillsIndicatorsVisible = ref(false)
const showAllCourses = ref(false)

// Temporizadores para ocultar los indicadores
let workIndicatorsTimer = null
let skillsIndicatorsTimer = null

// Función para mostrar/ocultar todos los cursos
const toggleShowAllCourses = () => {
  showAllCourses.value = !showAllCourses.value
}

// Métodos para controlar el carrusel de experiencia laboral con transición
const showWorkIndicators = () => {
  isWorkIndicatorsVisible.value = true

  // Limpiar el temporizador anterior si existe
  if (workIndicatorsTimer) {
    clearTimeout(workIndicatorsTimer)
  }

  // Configurar un nuevo temporizador para ocultar los indicadores después de 800ms
  workIndicatorsTimer = setTimeout(() => {
    isWorkIndicatorsVisible.value = false
  }, 800)
}

const nextWorkSlideWithTransition = () => {
  // Si ya está en transición, no hacer nada
  if (isWorkTransitioning.value) return

  isWorkTransitioning.value = true
  showWorkIndicators()

  // Cambiar inmediatamente el slide
  if (currentWorkSlide.value < workExperience.value.length - 1) {
    currentWorkSlide.value++
  } else {
    currentWorkSlide.value = 0
  }

  // Restablecer el estado de transición después de un tiempo
  setTimeout(() => {
    isWorkTransitioning.value = false
  }, 300)
}

const prevWorkSlideWithTransition = () => {
  // Si ya está en transición, no hacer nada
  if (isWorkTransitioning.value) return

  isWorkTransitioning.value = true
  showWorkIndicators()

  // Cambiar inmediatamente el slide
  if (currentWorkSlide.value > 0) {
    currentWorkSlide.value--
  } else {
    currentWorkSlide.value = workExperience.value.length - 1
  }

  // Restablecer el estado de transición después de un tiempo
  setTimeout(() => {
    isWorkTransitioning.value = false
  }, 300)
}

const goToWorkSlideWithTransition = (index) => {
  // Si ya está en transición o es el mismo slide, no hacer nada
  if (isWorkTransitioning.value || index === currentWorkSlide.value) return

  isWorkTransitioning.value = true
  showWorkIndicators()

  // Cambiar inmediatamente el slide
  currentWorkSlide.value = index

  // Restablecer el estado de transición después de un tiempo
  setTimeout(() => {
    isWorkTransitioning.value = false
  }, 300)
}

// Definir las categorías de habilidades directamente en el componente
const skillCategories = [
  { id: 'programmingLanguages', title: 'Programming Languages', data: 'programmingLanguages' },
  { id: 'developmentFrameworks', title: 'Development Frameworks', data: 'developmentFrameworks' },
  { id: 'testingFrameworks', title: 'Testing Frameworks', data: 'testingFrameworks' },
  { id: 'databases', title: 'Databases', data: 'databases' },
  { id: 'cloudProviders', title: 'Cloud Providers', data: 'cloudProviders' },
  { id: 'serversAndContainers', title: 'Servers & Containers', data: 'serversAndContainers' }
]

// Ya no necesitamos skillCategoriesLength porque accedemos directamente a skillCategories.length



// Métodos para controlar el carrusel de habilidades con transición
const showSkillsIndicators = () => {
  isSkillsIndicatorsVisible.value = true

  // Limpiar el temporizador anterior si existe
  if (skillsIndicatorsTimer) {
    clearTimeout(skillsIndicatorsTimer)
  }

  // Configurar un nuevo temporizador para ocultar los indicadores después de 800ms
  skillsIndicatorsTimer = setTimeout(() => {
    isSkillsIndicatorsVisible.value = false
  }, 800)
}

const nextSkillsSlideWithTransition = () => {
  // Si ya está en transición, no hacer nada
  if (isSkillsTransitioning.value) return

  isSkillsTransitioning.value = true
  showSkillsIndicators()

  // Cambiar inmediatamente el slide
  console.log('Avanzando slide, actual:', currentSkillsSlide.value, 'total:', skillCategories.length)
  if (currentSkillsSlide.value < skillCategories.length - 1) {
    currentSkillsSlide.value++
  } else {
    currentSkillsSlide.value = 0
  }
  console.log('Nuevo slide:', currentSkillsSlide.value)

  // Restablecer el estado de transición después de un tiempo
  setTimeout(() => {
    isSkillsTransitioning.value = false
  }, 300)
}

const prevSkillsSlideWithTransition = () => {
  // Si ya está en transición, no hacer nada
  if (isSkillsTransitioning.value) return

  isSkillsTransitioning.value = true
  showSkillsIndicators()

  // Cambiar inmediatamente el slide
  console.log('Retrocediendo slide, actual:', currentSkillsSlide.value, 'total:', skillCategories.length)
  if (currentSkillsSlide.value > 0) {
    currentSkillsSlide.value--
  } else {
    currentSkillsSlide.value = skillCategories.length - 1
  }
  console.log('Nuevo slide:', currentSkillsSlide.value)

  // Restablecer el estado de transición después de un tiempo
  setTimeout(() => {
    isSkillsTransitioning.value = false
  }, 300)
}

const goToSkillsSlideWithTransition = (index) => {
  // Si ya está en transición o es el mismo slide, no hacer nada
  if (isSkillsTransitioning.value || index === currentSkillsSlide.value) return

  isSkillsTransitioning.value = true
  showSkillsIndicators()

  // Cambiar inmediatamente el slide
  console.log('Yendo al slide:', index, 'desde:', currentSkillsSlide.value)
  currentSkillsSlide.value = index
  console.log('Nuevo slide:', currentSkillsSlide.value)

  // Restablecer el estado de transición después de un tiempo
  setTimeout(() => {
    isSkillsTransitioning.value = false
  }, 300)
}

// Función para obtener los datos de habilidades de forma dinámica
const getSkillsData = (dataKey) => {
  // Acceder directamente a los datos del JSON
  const skills = tm(`skills.${dataKey}`)
  return Array.isArray(skills) ? skills : []
}

// Propiedades computadas para acceder a datos complejos
const personalInfo = computed(() => {
  return t('personalInfo') || {}
})

const profilePicture = computed(() => {
  return personalInfo.value.picture || "https://avatars.githubusercontent.com/u/5186093"
})

const socialLinks = computed(() => {
  const links = tm('personalInfo.links')
  return Array.isArray(links) ? links : []
})

const workExperience = computed(() => {
  const experience = tm('workExperience')
  return Array.isArray(experience) ? experience : []
})





const educationData = computed(() => {
  const education = tm('education')
  return education || {}
})

const educationCertifications = computed(() => {
  const certs = educationData.value?.certifications
  return Array.isArray(certs) ? certs : []
})

const educationCourses = computed(() => {
  const courses = educationData.value?.courses
  return Array.isArray(courses) ? courses : []
})

const formalEducation = computed(() => {
  const education = educationData.value?.formalEducation
  return Array.isArray(education) ? education : []
})

// Las propiedades computadas para las habilidades se han eliminado
// ya que ahora accedemos directamente a los datos del JSON

const softSkills = computed(() => {
  const skills = tm('softSkills')
  return Array.isArray(skills) ? skills : []
})










// Función para cambiar el tema
const toggleTheme = () => {
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
}

// Función para cambiar el idioma
const toggleLanguage = () => {
  const newLanguage = locale.value === 'en' ? 'es' : 'en'
  locale.value = newLanguage
  currentLanguage.value = newLanguage

  if (process.client) {
    $i18n.global.locale.value = newLanguage
    localStorage.setItem('language', newLanguage)
  }
}

// Función para imprimir a PDF normal
const printToPdf = () => {
  if (process.client) {
    window.print()
  }
}



// Función para generar y descargar el PDF con formato Harvard
const generateHarvardPDF = () => {
  if (!process.client) return;
  // Crear un elemento div temporal para contener el CV de Harvard
  const tempDiv = document.createElement('div')
  tempDiv.id = 'harvard-cv-container'
  tempDiv.style.width = '8.5in'
  tempDiv.style.padding = '0'
  tempDiv.style.backgroundColor = 'white'
  tempDiv.style.color = 'black'
  tempDiv.style.fontFamily = 'Calibri, Arial, sans-serif'

  // Generar HTML directamente
  const name = t('personalInfo.name')
  const title = t('personalInfo.title')
  const summary = t('summary.summaryText')

  // Crear HTML para el CV de Harvard
  // Usar el mismo padding para ambos idiomas
  const padding = '1in'

  let htmlContent = `
    <div style="padding: ${padding}; font-family: Calibri, Arial, sans-serif; color: black; background-color: white; line-height: 1.4; max-width: 8.5in; margin: 0 auto; box-sizing: border-box; border-top: 4px solid #333; border-bottom: 4px solid #333; position: relative;">
      <!-- Bordes laterales decorativos -->
      <div style="position: absolute; top: 0; left: 0.25in; bottom: 0; border-left: 1px solid #999; z-index: 1;"></div>
      <div style="position: absolute; top: 0; right: 0.25in; bottom: 0; border-left: 1px solid #999; z-index: 1;"></div>
      <!-- Encabezado -->
      <div style="text-align: center; margin-bottom: 0.5in; border-bottom: 2px solid #333; padding-bottom: 0.2in; border-top: 2px solid #333; padding-top: 0.2in;">
        <h1 style="font-size: 24pt; margin: 0 0 0.1in 0; color: #000; font-family: Calibri, Arial, sans-serif;">${name}</h1>
        <h2 style="font-size: 14pt; margin: 0; color: #333; font-weight: 500; font-family: Calibri, Arial, sans-serif;">${title}</h2>
      </div>

      <!-- Resumen -->
      <div style="margin-bottom: 0.4in;">
        <h2 style="font-size: 14pt; color: #000; border-bottom: 1px solid #333; border-top: 1px solid #333; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 0.15in; padding: 0.05in 0; font-family: Calibri, Arial, sans-serif;">${t('summary.title')}</h2>
        <p style="line-height: 1.5; font-size: 11pt;">${summary}</p>
      </div>

      <!-- Experiencia Laboral -->
      <div style="margin-bottom: 0.4in;">
        <h2 style="font-size: 14pt; color: #000; border-bottom: 1px solid #333; border-top: 1px solid #333; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 0.15in; padding: 0.05in 0; font-family: Calibri, Arial, sans-serif;">${t('workExperienceSection.title')}</h2>

        ${generateWorkExperienceHTML()}
      </div>

      <!-- Educación -->
      <div style="margin-bottom: 0.4in;">
        <h2 style="font-size: 14pt; color: #000; border-bottom: 1px solid #333; border-top: 1px solid #333; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 0.15in; padding: 0.05in 0; font-family: Calibri, Arial, sans-serif;">${t('educationSection.title')}</h2>

        <!-- Educación Formal -->
        <div style="margin-bottom: 0.25in;">
          <h3 style="font-size: 12pt; color: #000; margin-bottom: 0.1in; font-weight: 600; border-bottom: 1px dotted #999; padding-bottom: 0.05in; font-family: Calibri, Arial, sans-serif;">${t('educationSection.formalEducation')}</h3>
          ${generateFormalEducationHTML()}
        </div>

        <!-- Certificaciones -->
        <div style="margin-bottom: 0.25in;">
          <h3 style="font-size: 12pt; color: #000; margin-bottom: 0.1in; font-weight: 600; border-bottom: 1px dotted #999; padding-bottom: 0.05in; font-family: Calibri, Arial, sans-serif;">${t('educationSection.certifications')}</h3>
          ${generateCertificationsHTML()}
        </div>

        <!-- Cursos -->
        <div style="margin-bottom: 0.25in;">
          <h3 style="font-size: 12pt; color: #000; margin-bottom: 0.1in; font-weight: 600; border-bottom: 1px dotted #999; padding-bottom: 0.05in; font-family: Calibri, Arial, sans-serif;">${t('educationSection.courses')}</h3>
          ${generateCoursesHTML()}
        </div>
      </div>

      <!-- Habilidades -->
      <div style="margin-bottom: 0.4in;">
        <h2 style="font-size: 14pt; color: #000; border-bottom: 1px solid #333; border-top: 1px solid #333; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 0.15in; padding: 0.05in 0; font-family: Calibri, Arial, sans-serif;">${t('skillsSection.title')}</h2>

        ${generateSkillsHTML()}
      </div>

      <!-- Habilidades Blandas -->
      <div style="margin-bottom: 0.4in;">
        <h2 style="font-size: 14pt; color: #000; border-bottom: 1px solid #333; border-top: 1px solid #333; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 0.15in; padding: 0.05in 0; font-family: Calibri, Arial, sans-serif;">${t('softSkillsSection.title')}</h2>

        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.15in;">
          ${generateSoftSkillsHTML()}
        </div>
      </div>
    </div>
  `

  // Establecer el HTML en el div temporal
  tempDiv.innerHTML = htmlContent

  // Añadir el div temporal al documento
  document.body.appendChild(tempDiv)

  // Esperar a que el DOM se actualice completamente
  setTimeout(() => {
    // Asegurarse de que el contenido esté completamente renderizado
    console.log('Altura del contenido:', tempDiv.scrollHeight)
    // Configurar opciones para html2pdf
    const opt = {
      margin: 0, // Ya tenemos margen en el HTML
      filename: `CV_${name.replace(/\s+/g, '_')}_Harvard_${currentLanguage.value.toUpperCase()}.pdf`,
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

    // Ajustes específicos para español para evitar página en blanco
    if (currentLanguage.value === 'es') {
      // Solo ajustar el tamaño del papel para español, manteniendo el mismo formato
      opt.jsPDF.format = [8.5, 11.0] // Tamaño personalizado para evitar página en blanco

      // Añadir un estilo para ajustar solo el tamaño de los textos más largos en español
      // y eliminar cualquier espacio en blanco no deseado
      const spanishStyles = document.createElement('style')
      spanishStyles.textContent = `
        #harvard-cv-container p {
          font-size: 0.98em !important;
          line-height: 1.35 !important;
        }

        /* Eliminar cualquier espacio en blanco no deseado */
        #harvard-cv-container div:empty,
        #harvard-cv-container p:empty,
        #harvard-cv-container span:empty {
          display: none !important;
          margin: 0 !important;
          padding: 0 !important;
          height: 0 !important;
        }

        /* Ajustar espaciado entre secciones */
        #harvard-cv-container div[style*="margin-bottom"] {
          margin-bottom: 0.3in !important;
        }

        /* Ajustar espaciado entre elementos */
        #harvard-cv-container div[style*="margin-bottom: 0.2in"] {
          margin-bottom: 0.15in !important;
        }
      `
      tempDiv.appendChild(spanishStyles)

      // Limpiar cualquier texto o elemento invisible
      setTimeout(() => {
        const emptyElements = tempDiv.querySelectorAll('div:empty, p:empty, span:empty');
        emptyElements.forEach(el => el.remove());
      }, 50);
    }

    // Mostrar mensaje de carga
    console.log('Generando PDF...')

    // Generar el PDF
    if (html2pdf && html2pdf.default) {
      // If imported as a module (ESM)
      html2pdf.default()
        .from(tempDiv)
        .set(opt)
        .save()
        .then(() => {
          console.log('PDF generado con éxito')
          // Limpiar después de generar el PDF
          document.body.removeChild(tempDiv)
        })
        .catch(error => {
          console.error('Error al generar el PDF:', error)
          // Limpiar en caso de error
          document.body.removeChild(tempDiv)
        })
    } else {
      console.error('html2pdf no está disponible en el entorno del cliente')
      document.body.removeChild(tempDiv)
    }
  }, 300) // Aumentar el tiempo de espera para asegurar que el contenido se cargue completamente
}

// Función para generar HTML de experiencia laboral
const generateWorkExperienceHTML = () => {
  let html = ''

  workExperience.value.forEach(job => {
    html += `<div style="margin-bottom: 0.25in; break-inside: avoid; page-break-inside: avoid;">
        <div style="margin-bottom: 0.15in; border-bottom: 1px dotted #ccc; padding-bottom: 0.1in;">
          <h3 style="font-size: 13pt; font-weight: bold; margin: 0 0 0.05in 0; font-family: Calibri, Arial, sans-serif;">${job.title}</h3>
          <h4 style="font-size: 12pt; font-weight: normal; margin: 0 0 0.05in 0; font-family: Calibri, Arial, sans-serif;">${job.company}</h4>
          <p style="font-size: 10pt; font-style: italic; color: #555; margin: 0; font-family: Calibri, Arial, sans-serif;">${job.period}</p>
        </div>`

    // Añadir proyectos si existen
    if (job.projects && job.projects.length > 0) {
      html += `<div style="margin-bottom: 0.15in;">`

      job.projects.forEach(project => {
        html += `<div style="margin-bottom: 0.2in; padding-left: 0.15in; border-left: 2px solid #999; page-break-inside: avoid;">
            <h4 style="font-size: 11pt; font-weight: 600; margin: 0 0 0.05in 0; font-family: Calibri, Arial, sans-serif;">${project.name}</h4>
            <p style="font-size: 10pt; margin: 0 0 0.1in 0; line-height: 1.5; font-family: Calibri, Arial, sans-serif;">${project.description}</p>`

        // Añadir tecnologías si existen
        if (project.technologies && project.technologies.length > 0) {
          html += `<div style="display: flex; flex-wrap: wrap; gap: 0.1in; margin-top: 0.1in;">`

          project.technologies.forEach(tech => {
            html += `<span style="font-size: 9pt; padding: 0.03in 0.08in; background-color: #f0f0f0; border-radius: 0.05in; font-family: Calibri, Arial, sans-serif;">${tech}</span>`
          })

          html += `</div>`
        }

        html += `</div>`
      })

      html += `</div>`
    }

    // Añadir responsabilidades si existen
    if (job.responsibilities && job.responsibilities.length > 0) {
      html += `<ul style="margin: 0.1in 0; padding-left: 0.25in;">`

      job.responsibilities.forEach(resp => {
        html += `<li style="font-size: 10pt; line-height: 1.5; margin-bottom: 0.08in; font-family: Calibri, Arial, sans-serif;">${resp}</li>`
      })

      html += `</ul>`
    }

    html += `</div>`
  })

  return html
}

// Función para generar HTML de educación formal
const generateFormalEducationHTML = () => {
  let html = ''

  formalEducation.value.forEach(edu => {
    html += `<div style="margin-bottom: 0.2in; break-inside: avoid; page-break-inside: avoid; border-bottom: 1px dotted #eee; padding-bottom: 0.1in;">
        <h4 style="font-size: 11pt; font-weight: 600; margin: 0 0 0.05in 0; font-family: Calibri, Arial, sans-serif;">${edu.degree}</h4>
        <h5 style="font-size: 10pt; font-weight: normal; margin: 0 0 0.05in 0; font-family: Calibri, Arial, sans-serif;">${edu.institution}</h5>
        <p style="font-size: 9pt; font-style: italic; color: #555; margin: 0; font-family: Calibri, Arial, sans-serif;">${edu.period}</p>
      </div>`
  })

  return html
}

// Función para generar HTML de certificaciones
const generateCertificationsHTML = () => {
  let html = ''

  educationCertifications.value.forEach(cert => {
    html += `<div style="margin-bottom: 0.2in; break-inside: avoid; page-break-inside: avoid; border-bottom: 1px dotted #eee; padding-bottom: 0.1in;">
        <h4 style="font-size: 11pt; font-weight: 600; margin: 0 0 0.05in 0; font-family: Calibri, Arial, sans-serif;">${cert.title}</h4>
        <h5 style="font-size: 10pt; font-weight: normal; margin: 0 0 0.05in 0; font-family: Calibri, Arial, sans-serif;">${cert.platform}</h5>
        <p style="font-size: 9pt; font-style: italic; color: #555; margin: 0; font-family: Calibri, Arial, sans-serif;">${cert.issue_date}</p>
        ${cert.credential_id ? `<p style="font-size: 9pt; color: #555; margin: 0.05in 0 0 0; font-family: Calibri, Arial, sans-serif;">ID: ${cert.credential_id}</p>` : ''}
      </div>`
  })

  return html
}

// Función para generar HTML de cursos
const generateCoursesHTML = () => {
  let html = ''

  // Mostrar solo los primeros 5 cursos
  educationCourses.value.slice(0, 5).forEach(course => {
    html += `<div style="margin-bottom: 0.2in; break-inside: avoid; page-break-inside: avoid; border-bottom: 1px dotted #eee; padding-bottom: 0.1in;">
        <h4 style="font-size: 11pt; font-weight: 600; margin: 0 0 0.05in 0; font-family: Calibri, Arial, sans-serif;">${course.title}</h4>
        <h5 style="font-size: 10pt; font-weight: normal; margin: 0 0 0.05in 0; font-family: Calibri, Arial, sans-serif;">${course.platform}</h5>
        <p style="font-size: 9pt; font-style: italic; color: #555; margin: 0; font-family: Calibri, Arial, sans-serif;">${course.completion_date}</p>
      </div>`
  })

  return html
}

// Función para generar HTML de habilidades
const generateSkillsHTML = () => {
  let html = ''

  skillCategories.forEach(category => {
    html += `<div style="margin-bottom: 0.25in; break-inside: avoid; page-break-inside: avoid;">
        <h3 style="font-size: 12pt; color: #000; margin-bottom: 0.15in; font-weight: 600; border-bottom: 1px dotted #999; padding-bottom: 0.05in; font-family: Calibri, Arial, sans-serif;">${category.title}</h3>
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.15in;">`

    // Obtener habilidades para esta categoría
    const skills = getSkillsData(category.data)

    skills.forEach(skill => {
      html += `<div style="display: flex; justify-content: space-between; padding: 0.08in 0; border-bottom: 1px dotted #ddd; align-items: center;">
          <span style="font-weight: 600; font-family: Calibri, Arial, sans-serif; font-size: 10pt;">${skill.name}</span>
          <span style="font-style: italic; color: #555; font-family: Calibri, Arial, sans-serif; font-size: 10pt;">${skill.level}</span>
        </div>`
    })

    html += `</div>
      </div>`
  })

  return html
}

// Función para generar HTML de habilidades blandas
const generateSoftSkillsHTML = () => {
  let html = ''

  softSkills.value.forEach(skill => {
    html += `<div style="padding: 0.08in; text-align: center; background-color: #f9f9f9; border-radius: 0.05in; margin-bottom: 0.1in;">
        <span style="font-weight: 500; font-family: Calibri, Arial, sans-serif; font-size: 10pt;">${skill.name}</span>
      </div>`
  })

  return html
}



onMounted(() => {
  if (typeof localStorage !== 'undefined' && typeof document !== 'undefined') {
    // Inicializar tema desde localStorage
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'light') {
      isDarkTheme.value = false
      document.body.classList.add('neo-theme-light')
    } else {
      isDarkTheme.value = true
      document.body.classList.add('neo-theme-tokyo-night')
    }

    // Inicializar idioma desde localStorage
    const savedLanguage = localStorage.getItem('language')
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'es')) {
      locale.value = savedLanguage
      currentLanguage.value = savedLanguage
      if ($i18n && $i18n.global) {
        $i18n.global.locale.value = savedLanguage
      }
    } else {
      // Establecer un valor predeterminado si no hay un idioma válido guardado
      locale.value = 'en'
      currentLanguage.value = 'en'
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('language', 'en')
      }
      if ($i18n && $i18n.global) {
        $i18n.global.locale.value = 'en'
      }
    }

    // Iniciar animaciones
    const container = document.querySelector('.neo-container')
    if (container) {
      animateHero(container)
    }
  }
})
</script>

<style scoped>
.neo-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.neo-content-wrapper {
  max-width: 1200px;
  margin: 0 auto;
  padding-bottom: 2rem;
  position: relative;
  z-index: 10;
}

.neo-section {
  background-color: var(--neo-surface);
  border-radius: var(--neo-radius-lg);
  padding: 2rem;
  margin-bottom: 2rem;
  border: 1px solid var(--neo-border);
  box-shadow: var(--neo-shadow);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.neo-section:hover {
  box-shadow: var(--neo-glow);
}

.profile-container {
  display: flex;
  align-items: center;
  gap: 2rem;
  padding: 1rem 0;
}

.profile-image-container {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  flex-shrink: 0;
  background: linear-gradient(135deg, var(--neo-primary), var(--neo-secondary));
  padding: 4px;
}

.profile-image-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--neo-primary), var(--neo-secondary));
  z-index: -1;
  opacity: 0.7;
  filter: blur(8px);
}

.neo-profile-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  display: block;
  transition: transform 0.3s ease;
}

.profile-image-container:hover .neo-profile-image {
  transform: scale(1.05);
}

.profile-info {
  flex: 1;
}

.title-social-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.neo-title {
  font-size: 3rem;
  font-weight: 700;
  color: var(--neo-primary);
  letter-spacing: -0.5px;
  line-height: 1.2;
  background: linear-gradient(to right, var(--neo-primary), var(--neo-secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  margin: 0;
}

.neo-subtitle {
  font-size: 1.6rem;
  color: var(--neo-text-secondary);
  margin-bottom: 1.5rem;
  font-weight: 500;
}

.social-links {
  display: flex;
  gap: 1.2rem;
}

.neo-link {
  color: var(--neo-primary);
  font-size: 1.8rem;
  transition: all 0.3s ease;
  width: 3rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: rgba(var(--neo-primary-rgb), 0.1);
}

.neo-link:hover {
  color: var(--neo-accent);
  background-color: rgba(var(--neo-accent-rgb), 0.1);
  transform: translateY(-3px);
}

.neo-text {
  font-size: 1.1rem;
  line-height: 1.7;
  color: var(--neo-text);
  margin-top: 1rem;
}

.section-title {
  font-size: 1.8rem;
  color: var(--neo-text);
  margin-bottom: 1rem;
  border-bottom: 2px solid var(--neo-border);
  padding-bottom: 0.5rem;
}

.subsection-title {
  font-size: 1.4rem;
  color: var(--neo-primary);
  margin: 1.5rem 0 1rem 0;
  padding-left: 1rem;
  position: relative;
}

.subsection-title::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.2rem;
  bottom: 0.2rem;
  width: 4px;
  background-color: var(--neo-primary);
  border-radius: 2px;
}

.section-description {
  color: var(--neo-text-secondary);
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
  line-height: 1.5;
  font-style: italic;
}

.carousel-container {
  position: relative;
  width: 100%;
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
}

.carousel-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
  pointer-events: none;
  backdrop-filter: blur(3px);
}

.carousel-overlay.active {
  opacity: 1;
  visibility: visible;
}

.experience-carousel {
  display: flex;
  width: 100%;
  position: relative;
  min-height: auto; /* Ajustar automáticamente a la altura del contenido */
  flex: 1;
}

.carousel-slide {
  width: 100%;
  flex-shrink: 0;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.5s ease, transform 0.5s ease;
  position: absolute;
  left: 0;
  top: 0;
  transform: translateX(100px);
  height: 100%;
}

.carousel-slide.active {
  opacity: 1;
  visibility: visible;
  z-index: 1;
  transform: translateX(0);
  position: relative; /* Permitir que determine la altura del contenedor */
}

.carousel-control-side {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 5rem; /* Doble del ancho del icono (2.5rem * 2) */
  background-color: transparent;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: var(--neo-primary);
  opacity: 1;
  z-index: 10;
  height: 100%;
  padding: 0; /* Eliminar padding para asegurar que el círculo sea redondo */
}

.carousel-control-side .control-icon {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: rgba(var(--neo-primary-rgb), 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  border: 1px solid rgba(var(--neo-primary-rgb), 0.2);
  position: absolute; /* Posición absoluta para colocarlo exactamente */
  box-sizing: border-box; /* Asegurar que el borde no afecte el tamaño */
}

.carousel-control-side.prev {
  left: -5rem; /* Extender hasta el borde izquierdo de la pantalla */
  width: 5rem; /* Ancho fijo para el área de clic */
}

.carousel-control-side.prev .control-icon {
  right: 0.5rem; /* Alinear el icono ligeramente detrás del borde derecho del área de clic */
}

.carousel-control-side.next {
  right: -5rem; /* Extender hasta el borde derecho de la pantalla */
  width: 5rem; /* Ancho fijo para el área de clic */
}

.carousel-control-side.next .control-icon {
  left: 0.5rem; /* Alinear el icono ligeramente detrás del borde izquierdo del área de clic */
}

.carousel-control-side:hover .control-icon {
  background-color: rgba(var(--neo-primary-rgb), 0.2);
  color: var(--neo-secondary);
  box-shadow: 0 0 15px rgba(var(--neo-primary-rgb), 0.3);
  transform: scale(1.1);
}

.carousel-indicators-floating {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(var(--neo-surface-rgb), 0.8);
  padding: 1rem;
  border-radius: var(--neo-radius-md);
  opacity: 0;
  transition: opacity 0.2s ease;
  z-index: 10;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(5px);
}

.carousel-indicators-floating.visible {
  opacity: 1;
}

.carousel-progress {
  margin-bottom: 0.8rem;
}

.progress-number {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--neo-primary);
  text-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.indicators-container {
  display: flex;
  gap: 0.5rem;
}

.indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: var(--neo-border);
  border: 1px solid var(--neo-primary);
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 0 3px;
}

.indicator.active {
  background-color: var(--neo-primary);
  transform: scale(1.2);
  box-shadow: 0 0 5px var(--neo-primary);
}

.neo-card {
  background-color: var(--neo-surface);
  border-radius: var(--neo-radius-md);
  padding: 1.5rem;
  border: 1px solid var(--neo-border);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.neo-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--neo-glow);
}

.carousel-card {
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
  background: transparent;
  padding: 1rem;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.carousel-card:hover {
  transform: translateY(-3px);
}

.card-header {
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px dashed var(--neo-border);
  background: inherit;
}

.card-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.job-title {
  color: var(--neo-primary);
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.company-name {
  color: var(--neo-text);
  font-size: 1.1rem;
  margin-bottom: 0.3rem;
  font-weight: 500;
}

.period {
  color: var(--neo-text-secondary);
  font-size: 0.9rem;
  margin-bottom: 1rem;
  font-style: italic;
}

.responsibilities {
  padding-left: 1.2rem;
  margin-top: 0.8rem;
  list-style-type: none;
}

.responsibilities li {
  margin-bottom: 0.8rem;
  line-height: 1.6;
  position: relative;
  padding-left: 1.5rem;
}

.responsibilities li::before {
  content: '•';
  color: var(--neo-primary);
  font-weight: bold;
  position: absolute;
  left: 0;
  font-size: 1.2rem;
}

.education-container {
  margin-top: 1.5rem;
}

.education-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px dashed var(--neo-border);
}

.education-item:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.education-icon {
  font-size: 2rem;
  color: var(--neo-primary);
  margin-right: 1.5rem;
  background-color: rgba(var(--neo-primary-rgb), 0.1);
  width: 4rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  flex-shrink: 0;
}

.education-details {
  flex: 1;
}

.education-degree {
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--neo-primary);
  margin-bottom: 0.5rem;
}

.education-institution {
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--neo-text);
  margin-bottom: 0.3rem;
}

.education-period {
  font-size: 0.9rem;
  color: var(--neo-text-secondary);
  font-style: italic;
}

.credential-id {
  color: var(--neo-text-secondary);
  font-size: 0.8rem;
  margin-top: 0.25rem;
}

.course-link {
  display: inline-block;
  margin-top: 0.5rem;
  color: var(--neo-primary);
  font-size: 0.9rem;
  text-decoration: none;
  transition: color 0.2s ease;
}

.course-link:hover {
  color: var(--neo-secondary);
  text-decoration: underline;
}

.view-more-container {
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
}

.view-more-button {
  background-color: transparent;
  border: 1px solid var(--neo-primary);
  color: var(--neo-primary);
  padding: 0.7rem 1.5rem;
  border-radius: var(--neo-radius-sm);
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-weight: 500;
  font-size: 0.95rem;
  min-width: 180px;
}

.view-more-button:hover {
  background-color: var(--neo-primary);
  color: var(--neo-surface);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.skills-carousel-container {
  margin-top: 2rem;
}

.skills-carousel {
  min-height: 400px;
}

.skills-card {
  padding: 1.5rem;
}

.skill-category-title {
  font-size: 1.6rem;
  color: var(--neo-primary);
  margin-bottom: 1.5rem;
  font-weight: 600;
  text-align: center;
  position: relative;
}

.skill-category-title::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: -0.5rem;
  width: 100px;
  height: 3px;
  background: linear-gradient(to right, var(--neo-primary), var(--neo-secondary));
  transform: translateX(-50%);
  border-radius: 3px;
}

.skill-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
  margin-top: 1.5rem;
  max-width: 100%;
  overflow: hidden;
}

.skill-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.8rem 1rem;
  background-color: rgba(var(--neo-surface-rgb), 0.5);
  border-radius: var(--neo-radius-sm);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  margin-bottom: 0.8rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  flex-wrap: nowrap;
  gap: 0.5rem;
  min-height: 60px;
  width: 100%;
}

.skill-item:hover {
  transform: translateY(-2px);
  background-color: rgba(var(--neo-primary-rgb), 0.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.skill-info {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  flex: 1;
  min-width: 0;
}

.skill-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  min-width: 36px;
  min-height: 36px;
  background-color: rgba(var(--neo-primary-rgb), 0.1);
  border-radius: 50%;
  color: var(--neo-primary);
  padding: 8px;
  box-sizing: border-box;
  flex-shrink: 0;
}

.skill-icon svg {
  width: 18px !important;
  height: 18px !important;
  font-size: 18px !important;
  min-width: 18px !important;
  min-height: 18px !important;
}

.skill-name {
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.skill-level {
  color: var(--neo-primary);
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.6rem;
  background-color: rgba(var(--neo-primary-rgb), 0.15);
  border-radius: 12px;
  white-space: nowrap;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  min-width: 110px;
  max-width: 110px;
  text-align: center;
  display: inline-block;
  flex-shrink: 0;
}

.soft-skills-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.soft-skill-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1.8rem 1.2rem;
  background-color: var(--neo-surface);
  border-radius: var(--neo-radius-md);
  border: 1px solid var(--neo-border);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.soft-skill-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(var(--neo-primary-rgb), 0.1) 0%, rgba(var(--neo-secondary-rgb), 0.05) 100%);
  z-index: -1;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.soft-skill-item:hover {
  transform: translateY(-5px);
  box-shadow: var(--neo-glow);
  border-color: var(--neo-primary);
}

.soft-skill-item:hover::before {
  opacity: 1;
}

.soft-skill-icon {
  font-size: 2.2rem;
  color: var(--neo-primary);
  margin-bottom: 1.2rem;
  transition: transform 0.3s ease, color 0.3s ease;
  width: 4rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(var(--neo-primary-rgb), 0.1);
  border-radius: 50%;
}

.soft-skill-item:hover .soft-skill-icon {
  transform: scale(1.1);
  color: var(--neo-secondary);
  background-color: rgba(var(--neo-secondary-rgb), 0.1);
}

.soft-skill-name {
  font-weight: 600;
  color: var(--neo-text);
  font-size: 1.1rem;
}

.controls-wrapper {
  position: sticky;
  top: 2rem;
  width: 100%;
  height: 0;
  z-index: 100;
  pointer-events: none;
  max-width: 1200px;
  margin: 0 auto;
}

.controls-container {
  position: absolute;
  right: 0; /* Alineado al borde derecho */
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  pointer-events: auto;
  transform: translateX(50%); /* Centrar horizontalmente con respecto al borde */
}

.neo-button {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: var(--neo-surface);
  border: 1px solid var(--neo-border);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.theme-toggle {
  color: var(--neo-primary);
}

.language-toggle {
  color: var(--neo-secondary);
  font-family: var(--neo-font-sans);
  font-weight: 600;
  font-size: 0.8rem;
}

.neo-button:hover {
  transform: translateY(-2px);
  box-shadow: var(--neo-glow);
}

.theme-toggle:hover {
  color: var(--neo-secondary);
}

.language-toggle:hover {
  color: var(--neo-secondary);
}

.pdf-toggle {
  color: var(--neo-primary);
}

.pdf-toggle:hover {
  color: var(--neo-secondary);
}

.harvard-toggle {
  color: #8e44ad;
}

.harvard-toggle:hover {
  color: #6c3483;
}

/* Ajustes responsivos */
@media (min-width: 1250px) {
  .controls-wrapper {
    max-width: 100%;
    padding-right: calc((100% - 1200px) / 2);
  }

  .controls-container {
    right: 0;
    transform: translateX(50%);
  }
}

@media (max-width: 1200px) {
  .controls-container {
    right: 0;
    transform: translateX(50%);
  }
}

@media (max-width: 768px) {
  .controls-wrapper {
    top: 1rem;
    display: flex;
    justify-content: center;
  }

  .controls-container {
    flex-direction: row;
    position: relative;
    right: auto;
    gap: 1rem;
    transform: none;
  }

  .neo-button {
    width: 2rem;
    height: 2rem;
    font-size: 0.7rem;
  }

  .carousel-control-side {
    height: 100%;
    width: 4rem; /* Doble del ancho del icono (2rem * 2) */
  }

  .carousel-control-side .control-icon {
    width: 2rem;
    height: 2rem;
    font-size: 1rem;
  }

  .carousel-control-side.prev {
    left: -4rem; /* Extender hasta el borde izquierdo de la pantalla */
    width: 4rem; /* Ancho fijo para el área de clic */
  }

  .carousel-control-side.next {
    right: -4rem; /* Extender hasta el borde derecho de la pantalla */
    width: 4rem; /* Ancho fijo para el área de clic */
  }

  .carousel-indicators-floating {
    padding: 0.8rem;
  }

  .progress-number {
    font-size: 2rem;
  }

  .indicator {
    width: 10px;
    height: 10px;
  }
}

@media (max-width: 768px) {
  .neo-container {
    padding: 1rem;
    width: 100%;
    box-sizing: border-box;
  }

  .neo-section {
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    width: 100%;
    box-sizing: border-box;
  }

  .profile-container {
    flex-direction: column;
    text-align: center;
  }

  .profile-image-container {
    margin-bottom: 1.5rem;
  }

  .title-social-container {
    flex-direction: column;
    gap: 1rem;
  }

  .social-links {
    justify-content: center;
  }

  .neo-title {
    font-size: 2.2rem;
  }

  .neo-subtitle {
    font-size: 1.3rem;
  }

  .section-title {
    font-size: 1.5rem;
  }

  .skill-category-title {
    font-size: 1.2rem;
  }

  .skills-wrapper {
    grid-template-columns: 1fr;
    gap: 1rem;
    width: 100%;
  }

  .skills-column {
    margin-bottom: 1rem;
    width: 100%;
  }

  .skill-category {
    margin-bottom: 1.5rem;
    padding-bottom: 1rem;
    width: 100%;
  }

  .skill-grid {
    width: 100%;
  }

  .skill-item {
    width: 100%;
    box-sizing: border-box;
  }

  .soft-skills-container {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
    width: 100%;
  }

  .education-item {
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 1.5rem;
    background-color: rgba(var(--neo-primary-rgb), 0.05);
    border-radius: var(--neo-radius-md);
    width: 100%;
    box-sizing: border-box;
  }

  .education-icon {
    margin-right: 0;
    margin-bottom: 1rem;
  }

  .experience-grid {
    width: 100%;
  }

  .neo-card {
    width: 100%;
    box-sizing: border-box;
  }
}

@media (max-width: 480px) {
  .controls-container {
    gap: 0.5rem;
  }

  .carousel-control-side {
    width: 3.6rem; /* Doble del ancho del icono (1.8rem * 2) */
  }

  .carousel-control-side .control-icon {
    width: 1.8rem;
    height: 1.8rem;
    font-size: 0.9rem;
  }

  .carousel-control-side.prev {
    left: -3.6rem; /* Extender hasta el borde izquierdo de la pantalla */
    width: 3.6rem; /* Ancho fijo para el área de clic */
  }

  .carousel-control-side.next {
    right: -3.6rem; /* Extender hasta el borde derecho de la pantalla */
    width: 3.6rem; /* Ancho fijo para el área de clic */
  }

  .carousel-indicators-floating {
    padding: 0.6rem;
  }

  .progress-number {
    font-size: 1.5rem;
  }

  .indicator {
    width: 8px;
    height: 8px;
    margin: 0 2px;
  }

  .neo-container {
    padding: 0.8rem;
  }

  .neo-section {
    padding: 1.2rem;
    margin-bottom: 1rem;
  }

  .experience-grid {
    grid-template-columns: 1fr;
  }

  .neo-title {
    font-size: 1.8rem;
  }

  .neo-subtitle {
    font-size: 1.1rem;
    margin-bottom: 1rem;
  }

  .social-links {
    gap: 0.8rem;
  }

  .neo-link {
    width: 2.5rem;
    height: 2.5rem;
    font-size: 1.4rem;
  }

  .soft-skills-container {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  }

  .soft-skill-item {
    padding: 1.2rem 0.8rem;
  }

  .soft-skill-icon {
    font-size: 1.8rem;
    width: 3rem;
    height: 3rem;
  }

  .soft-skill-name {
    font-size: 0.9rem;
  }
}

/* Estilos para impresión */
@media print {
  .controls-wrapper {
    display: none;
  }

  .neo-container {
    padding: 0;
    max-width: 100%;
  }

  .neo-section {
    break-inside: avoid;
    page-break-inside: avoid;
    border: none;
    box-shadow: none;
    margin-bottom: 1rem;
  }

  .view-more-button {
    display: none;
  }
}

/* Estilos para el carrusel de experiencia */
.card-header {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(var(--neo-primary-rgb), 0.2);
}

.company-icon {
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  background-color: var(--neo-surface);
  border: 2px solid var(--neo-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--neo-primary);
  font-size: 1.5rem;
  box-shadow: 0 0 10px rgba(var(--neo-primary-rgb), 0.3);
  margin-right: 1.5rem;
  flex-shrink: 0;
}

.company-info {
  flex: 1;
}

/* Estilos para el timeline dentro del carrusel */
.company-timeline-container {
  position: relative;
  padding: 1rem 0;
  margin-left: 1rem;
}

.company-timeline-line {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0.5rem;
  width: 3px;
  background-color: var(--neo-primary);
  border-radius: 2px;
  opacity: 0.6;
}

.company-timeline-item {
  position: relative;
  display: flex;
  margin-bottom: 2rem;
  padding-left: 2rem;
}

.company-timeline-item:last-child {
  margin-bottom: 0;
}

.project-dot {
  position: absolute;
  left: 0;
  top: 0.5rem;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background-color: var(--neo-primary);
  z-index: 2;
}

.project-content {
  flex: 1;
  background-color: rgba(var(--neo-primary-rgb), 0.05);
  border-radius: var(--neo-radius-md);
  padding: 1.2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.project-content:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.project-name {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--neo-primary);
  margin-bottom: 0.5rem;
}

.project-description {
  font-size: 0.95rem;
  margin-bottom: 1rem;
  line-height: 1.5;
}

.project-technologies {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.technology-tag {
  background-color: rgba(var(--neo-primary-rgb), 0.1);
  color: var(--neo-primary);
  padding: 0.3rem 0.7rem;
  border-radius: var(--neo-radius-sm);
  font-size: 0.8rem;
  font-weight: 500;
}

/* Estilos responsivos para el timeline dentro del carrusel */
@media (max-width: 768px) {
  .company-icon {
    width: 3rem;
    height: 3rem;
    font-size: 1.2rem;
    margin-right: 1rem;
  }

  .company-timeline-container {
    margin-left: 0.5rem;
  }

  .company-timeline-line {
    left: 0.4rem;
  }

  .company-timeline-item {
    padding-left: 1.5rem;
  }

  .project-dot {
    width: 0.8rem;
    height: 0.8rem;
  }

  .project-content {
    padding: 1rem;
  }
}

@media (max-width: 480px) {
  .card-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .company-icon {
    margin-bottom: 1rem;
  }

  .company-timeline-container {
    margin-left: 0;
  }

  .company-timeline-line {
    left: 0.3rem;
    width: 2px;
  }

  .company-timeline-item {
    padding-left: 1.2rem;
  }

  .project-dot {
    width: 0.6rem;
    height: 0.6rem;
  }

  .project-content {
    padding: 0.8rem;
  }

  .project-name {
    font-size: 1rem;
  }

  .project-description {
    font-size: 0.9rem;
  }

  .technology-tag {
    font-size: 0.75rem;
    padding: 0.25rem 0.5rem;
  }
}
</style>
