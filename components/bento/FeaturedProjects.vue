<script setup lang="ts">
const { featuredProjects } = useContentQueries()

const { data: projects } = await featuredProjects()

const layouts = ['wide', 'tall', 'compact', 'compact'] as const

const { $i18n } = useNuxtApp()
const currentLocale = computed(() => $i18n?.global?.locale?.value || 'en')

const sectionTitle = computed(() =>
  currentLocale.value === 'en' ? 'Featured Projects' : 'Proyectos Destacados',
)
</script>

<template>
  <div class="flex flex-col gap-6">
    <SectionLabel number="03" :label="sectionTitle" />

    <div v-if="projects?.length" class="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <FeaturedProjectCard
        v-for="(project, index) in projects"
        :key="project.path || project.title"
        :project="project"
        :index="index"
        :layout="layouts[index] || 'compact'"
      />
    </div>
  </div>
</template>