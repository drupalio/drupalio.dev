<script setup lang="ts">
const { $i18n } = useNuxtApp()
const tm = (key: string) => $i18n?.global?.tm(key) ?? []
const t = (key: string) => $i18n?.global?.t(key) ?? key

const currentLocale = computed(() => $i18n?.global?.locale?.value || 'en')

const allSkills = computed(() => {
  const skills = tm('skills')
  if (!skills || typeof skills !== 'object') return []

  const groups: Array<{ title: string; items: Array<{ name: string; level: string }> }> = []

  const categoryMap: Record<string, string> = {
    programmingLanguages: currentLocale.value === 'en' ? 'Languages' : 'Lenguajes',
    developmentFrameworks: currentLocale.value === 'en' ? 'Frameworks' : 'Frameworks',
    cloudProviders: currentLocale.value === 'en' ? 'Cloud' : 'Nube',
    serversAndContainers: currentLocale.value === 'en' ? 'Containers' : 'Contenedores',
    frameworks: currentLocale.value === 'en' ? 'Frameworks' : 'Frameworks',
    architectureAndMethodologies: currentLocale.value === 'en' ? 'Architecture' : 'Arquitectura',
    aiAndLLMs: currentLocale.value === 'en' ? 'AI & LLMs' : 'IA y LLMs',
    developmentTools: currentLocale.value === 'en' ? 'Tools' : 'Herramientas',
  }

  for (const [key, items] of Object.entries(skills)) {
    if (!Array.isArray(items)) continue
    const title = categoryMap[key] || key
    groups.push({ title, items })
  }

  return groups
})

const topLevelSkills = computed(() => {
  return allSkills.value.slice(0, 6)
})
</script>

<template>
  <div class="flex flex-col gap-6">
    <SectionLabel number="04" :label="t('stack.title') || 'Stack'" />

    <div class="grid grid-cols-2 gap-4">
      <div
        v-for="group in topLevelSkills"
        :key="group.title"
        class="flex flex-col gap-2"
      >
        <p class="font-mono text-xs uppercase tracking-wider text-text-muted">{{ group.title }}</p>
        <div class="flex flex-col gap-1">
          <div
            v-for="skill in group.items.slice(0, 5)"
            :key="skill.name"
            class="flex items-center justify-between gap-2"
          >
            <span class="text-sm text-text">{{ skill.name }}</span>
            <span class="font-mono text-[10px] uppercase text-text-muted">{{ skill.level }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>