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
      <!-- Row 1: Hero + Status -->
      <div class="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-6">
        <section id="hero" v-animate class="lg:col-span-7 lg:row-span-1 flex items-center">
          <HeroCard />
        </section>

        <section v-animate="80" class="lg:col-span-5">
          <BentoCard variant="hover" padding="lg">
            <StatusCard />
          </BentoCard>
        </section>
      </div>

      <!-- Row 2: About -->
      <div class="mt-6 grid grid-cols-1 lg:grid-cols-12">
        <section id="about" v-animate class="lg:col-span-12">
          <AboutSection />
        </section>
      </div>

      <!-- Row 3: Experience + Tech Stack -->
      <div class="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-6">
        <section id="experience" v-animate class="lg:col-span-8">
          <BentoCard variant="default" padding="lg">
            <ExperienceTimeline />
          </BentoCard>
        </section>

        <section id="stack" v-animate="80" class="lg:col-span-4">
          <BentoCard variant="default" padding="lg">
            <TechStackGrid />
          </BentoCard>
        </section>
      </div>

      <!-- Row 4: Featured Projects -->
      <div class="mt-6">
        <section id="projects" v-animate>
          <LazyFeaturedProjects v-if="showBelowFold" />
        </section>
      </div>

      <!-- Row 5: AI Lab + GitHub -->
      <div class="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-6">
        <section v-animate class="lg:col-span-6">
          <BentoCard variant="default" padding="lg">
            <LazyAILabCard v-if="showBelowFold" />
          </BentoCard>
        </section>

        <section v-animate="80" class="lg:col-span-6">
          <BentoCard variant="default" padding="lg">
            <LazyGitHubCard v-if="showBelowFold" />
          </BentoCard>
        </section>
      </div>

      <!-- Row 6: Career Timeline -->
      <div v-animate class="mt-6">
        <BentoCard variant="default" padding="lg">
          <LazyCareerTimeline v-if="showBelowFold" />
        </BentoCard>
      </div>

      <!-- Row 7: Soft Skills -->
      <div v-animate class="mt-6">
        <BentoCard variant="default" padding="lg">
          <LazySoftSkillsCloud v-if="showBelowFold" />
        </BentoCard>
      </div>

      <!-- Row 8: Contact -->
      <div v-animate class="mt-6">
        <section id="contact">
          <BentoCard variant="default" padding="lg">
            <LazyContactCard v-if="showBelowFold" />
          </BentoCard>
        </section>
      </div>
    </main>

    <AppFooter />
  </div>
</template>