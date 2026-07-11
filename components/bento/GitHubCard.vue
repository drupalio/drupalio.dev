<script setup lang="ts">
const { $i18n } = useNuxtApp()
const currentLocale = computed(() => $i18n?.global?.locale?.value || 'en')

const sectionTitle = computed(() =>
  currentLocale.value === 'en' ? 'GitHub Activity' : 'Actividad en GitHub',
)

const githubUrl = 'https://github.com/drupalio'

const { data: profile } = await useFetch('/api/github')
const { data: contributions } = await useFetch('/api/github/contributions')

const stats = computed(() => [
  { label: currentLocale.value === 'en' ? 'Repos' : 'Repos', value: profile.value?.publicRepos || 0 },
  { label: currentLocale.value === 'en' ? 'Followers' : 'Seguidores', value: profile.value?.followers || 0 },
  { label: currentLocale.value === 'en' ? 'Contributions' : 'Contribs', value: contributions.value?.total || 0 },
])

const grid = computed(() => contributions.value?.days || [])
const weeks = computed(() => {
  const days = grid.value
  if (!days.length) return []
  const weeks: typeof days[] = []
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7))
  }
  return weeks
})
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex items-center justify-between">
      <SectionLabel number="06" :label="sectionTitle" />
      <a
        :href="githubUrl"
        target="_blank"
        rel="noopener"
        class="text-sm text-accent transition-colors duration-150 hover:text-accent/80"
      >
        @drupalio
      </a>
    </div>

    <div class="grid grid-cols-3 gap-4">
      <div v-for="stat in stats" :key="stat.label" class="flex flex-col gap-1">
        <AnimatedNumber :value="stat.value" class="text-2xl font-semibold text-text" />
        <span class="font-mono text-xs uppercase tracking-wider text-text-muted">{{ stat.label }}</span>
      </div>
    </div>

    <div class="overflow-x-auto pb-2">
      <div class="flex gap-0.5" style="min-width: fit-content">
        <div v-for="(week, wi) in weeks" :key="wi" class="flex flex-col gap-0.5">
          <div
            v-for="day in week"
            :key="day.date"
            class="h-2.5 w-2.5 rounded-sm transition-colors duration-150"
            :class="{
              'bg-border': day.level === 0,
              'bg-accent/20': day.level === 1,
              'bg-accent/40': day.level === 2,
              'bg-accent/60': day.level === 3,
              'bg-accent': day.level === 4,
            }"
            :title="`${day.date}: ${day.count} contributions`"
          />
        </div>
      </div>
    </div>
  </div>
</template>