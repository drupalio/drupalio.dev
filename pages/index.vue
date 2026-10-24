<script setup lang="ts">
import { useLanguage } from '~/composables/useLanguage'

const { current } = useLanguage()

const showBelowFold = ref(false)

onMounted(() => {
  requestAnimationFrame(() => {
    showBelowFold.value = true
  })
})

const title = 'Ricardo Morales, Senior Backend Engineer'
const description = 'Senior backend engineer with 12+ years in banking, payments, insurance, and media: Java and Spring Boot microservices, Kubernetes, Apache Kafka, Google Cloud, and LLM integration.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogType: 'profile',
  ogUrl: 'https://drupalio.dev',
  ogImage: 'https://avatars.githubusercontent.com/u/5186093',
  twitterCard: 'summary_large_image',
  twitterTitle: title,
  twitterDescription: description,
  twitterImage: 'https://avatars.githubusercontent.com/u/5186093',
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        '@id': 'https://drupalio.dev/#person',
        name: 'Ricardo Morales',
        jobTitle: 'Senior Backend Engineer',
        description,
        url: 'https://drupalio.dev',
        image: 'https://avatars.githubusercontent.com/u/5186093',
        email: 'mailto:hello@drupalio.dev',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Mexico City',
          addressCountry: 'MX',
        },
        sameAs: [
          'https://www.linkedin.com/in/drupalio',
          'https://github.com/drupalio',
        ],
        knowsLanguage: ['es', 'en'],
        hasOccupation: {
          '@type': 'Occupation',
          name: 'Senior Backend Engineer',
        },
        knowsAbout: [
          'Java',
          'Spring Boot',
          'Quarkus',
          'Microservices',
          'Event-driven architecture',
          'Apache Kafka',
          'Kubernetes',
          'Docker',
          'Google Cloud Platform',
          'Amazon Web Services',
          'CI/CD',
          'GitHub Actions',
          'Oracle Database',
          'PostgreSQL',
          'Redis',
          'Angular',
          'TypeScript',
          'Large Language Models',
          'Prompt engineering',
          'Software architecture',
        ],
        alumniOf: {
          '@type': 'CollegeOrUniversity',
          name: 'Tecnológico de Estudios Superiores de Ecatepec',
        },
        hasCredential: [
          {
            '@type': 'EducationalOccupationalCredential',
            name: 'Oracle Certified Associate Java',
            credentialCategory: 'certification',
            identifier: '237614080OCAJSE7',
            recognizedBy: { '@type': 'Organization', name: 'Oracle' },
          },
          {
            '@type': 'EducationalOccupationalCredential',
            name: 'Scrum Fundamentals Certified',
            credentialCategory: 'certification',
            identifier: '623619',
            recognizedBy: { '@type': 'Organization', name: 'VMEdu Inc.' },
          },
          {
            '@type': 'EducationalOccupationalCredential',
            name: 'Introduction to Containers and Kubernetes',
            credentialCategory: 'certification',
            recognizedBy: { '@type': 'Organization', name: 'Cloudevel' },
          },
        ],
      }),
    },
  ],
  htmlAttrs: {
    lang: () => current.value,
  },
})
</script>

<template>
  <div class="min-h-screen">
    <ScrollProgress />
    <AppHeader />

    <main class="mx-auto max-w-7xl px-6 pb-20 pt-32 lg:px-8">
      <section id="hero">
        <HeroCard />
      </section>

      <div class="mt-20 grid grid-cols-1 lg:grid-cols-12">
        <section id="about" class="border-t border-border pt-8 lg:col-span-10">
          <AboutSection />
        </section>
      </div>

      <div class="mt-24">
        <section id="projects">
          <LazyFeaturedProjects />
        </section>
      </div>

      <div class="mt-24 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
        <section id="experience" class="border-t border-border pt-8 lg:col-span-7">
          <ExperienceTimeline />
        </section>

        <section id="stack" class="border-t border-border pt-8 lg:col-span-5">
          <TechStackGrid />
        </section>
      </div>

      <div class="mt-24 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
        <section class="border-t border-border pt-8 lg:col-span-7">
          <LazyGitHubCard v-if="showBelowFold" />
        </section>

        <section class="border-t border-border pt-8 lg:col-span-5">
          <LazyWritingStrip v-if="showBelowFold" />
        </section>
      </div>

      <div class="mt-28 grid grid-cols-1 lg:grid-cols-12">
        <section id="contact" class="border-t-2 border-text pt-10 lg:col-span-8">
          <LazyContactCard />
        </section>
      </div>
    </main>

    <AppFooter />
  </div>
</template>
