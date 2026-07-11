<script setup lang="ts">
const { allExperience } = useContentQueries()

const workExperience = await allExperience()

const { $i18n } = useNuxtApp()
const currentLocale = computed(() => $i18n?.global?.locale?.value || 'en')

const sectionTitle = computed(() =>
  currentLocale.value === 'en' ? 'Work Experience' : 'Experiencia Laboral',
)
</script>

<template>
  <div class="flex flex-col gap-6">
    <SectionLabel number="02" :label="sectionTitle" />

    <div class="flex flex-col gap-1">
      <div
        v-for="job in workExperience"
        :key="job.company"
        class="group relative border-l border-border pl-6 pb-6 last:pb-0"
      >
        <div class="absolute left-[-5px] top-1 h-2.5 w-2.5 rounded-full bg-border transition-colors duration-200 group-hover:bg-accent" />

        <div class="flex flex-col gap-1">
          <div class="flex flex-wrap items-baseline justify-between gap-2">
            <h3 class="text-base font-medium text-text">{{ job.title }}</h3>
            <span class="font-mono text-xs text-text-muted tabular-nums">{{ job.period }}</span>
          </div>
          <p class="text-sm text-text-muted">{{ job.company }}</p>

          <div v-if="job.projects?.length" class="mt-3 flex flex-col gap-2">
            <div
              v-for="(project, pIndex) in job.projects"
              :key="pIndex"
              class="rounded-lg bg-surface-2 px-3 py-2"
            >
              <p class="text-sm font-medium text-text">{{ project.name }}</p>
              <p class="mt-0.5 text-xs leading-relaxed text-text-muted">{{ project.description }}</p>
              <div v-if="project.technologies?.length" class="mt-2 flex flex-wrap gap-1">
                <span
                  v-for="tech in project.technologies"
                  :key="tech"
                  class="rounded-md bg-accent/5 px-1.5 py-0.5 font-mono text-[10px] text-accent"
                >
                  {{ tech }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>