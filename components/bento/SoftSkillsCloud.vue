<script setup lang="ts">
const { $i18n } = useNuxtApp()
const tm = (key: string) => $i18n?.global?.tm(key) ?? []

const currentLocale = computed(() => $i18n?.global?.locale?.value || 'en')

const softSkills = computed(() => {
  const data = tm('softSkills')
  return Array.isArray(data) ? data : []
})

const sectionTitle = computed(() =>
  currentLocale.value === 'en' ? 'Soft Skills' : 'Habilidades Blandas',
)
</script>

<template>
  <div class="flex flex-col gap-6">
    <SectionLabel number="08" :label="sectionTitle" />

    <div class="flex flex-wrap gap-2">
      <span
        v-for="skill in softSkills"
        :key="skill.name"
        class="rounded-full border border-border bg-surface-2 px-3 py-1.5 text-sm text-text-muted transition-colors duration-150 hover:border-accent/30 hover:text-text"
      >
        {{ skill.name }}
      </span>
    </div>
  </div>
</template>