<script setup lang="ts">
import { useLanguage } from '~/composables/useLanguage'

const { current } = useLanguage()

const showBelowFold = ref(false)

onMounted(() => {
  requestAnimationFrame(() => {
    showBelowFold.value = true
  })
})

useSeoMeta({
  title: 'Ricardo Morales — Software Engineer',
  description: 'Systems thinking, AI engineering, backend architecture, and performance work by Ricardo Morales.',
  ogTitle: 'Ricardo Morales — Software Engineer',
  ogDescription: 'Systems thinking, AI engineering, backend architecture, and performance work by Ricardo Morales.',
  ogType: 'website',
  ogUrl: 'https://drupalio.dev',
  ogImage: 'https://avatars.githubusercontent.com/u/5186093',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Ricardo Morales — Software Engineer',
  twitterDescription: 'Systems thinking, AI engineering, backend architecture, and performance work.',
  twitterImage: 'https://avatars.githubusercontent.com/u/5186093',
})

useHead({
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Ricardo Morales',
        jobTitle: 'Software Engineer',
        url: 'https://drupalio.dev',
        sameAs: [
          'https://www.linkedin.com/in/drupalio',
          'https://github.com/drupalio',
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

    <main class="mx-auto max-w-7xl px-6 pt-32 pb-20 lg:px-8">
      <section id="hero" v-animate>
        <HeroCard />
      </section>

      <div class="mt-16 grid grid-cols-1 lg:grid-cols-12">
        <section id="about" v-animate class="border-t border-border pt-8 lg:col-span-10">
          <AboutSection />
        </section>
      </div>

      <div class="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
        <section id="experience" v-animate class="border-t border-border pt-8 lg:col-span-7">
          <ExperienceTimeline />
        </section>

        <section id="stack" v-animate="80" class="border-t border-border pt-8 lg:col-span-5">
          <TechStackGrid />
        </section>
      </div>

      <div class="mt-20">
        <section id="projects" v-animate>
          <LazyFeaturedProjects v-if="showBelowFold" />
        </section>
      </div>

      <div class="mt-16 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
        <section v-animate class="border-t border-border pt-8 lg:col-span-6">
          <LazyAILabCard v-if="showBelowFold" />
        </section>

        <section v-animate="80" class="border-t border-border pt-8 lg:col-span-6">
          <LazyGitHubCard v-if="showBelowFold" />
        </section>
      </div>

      <div v-animate class="mt-12 border-t border-border pt-8">
        <LazyCareerTimeline v-if="showBelowFold" />
      </div>

      <div v-animate class="mt-12 border-t border-border pt-8">
        <LazySoftSkillsCloud v-if="showBelowFold" />
      </div>

      <div v-animate class="mt-20">
        <section id="contact" class="border-t-2 border-text pt-10">
          <LazyContactCard v-if="showBelowFold" />
        </section>
      </div>
    </main>

    <AppFooter />
  </div>
</template>
