<script setup lang="ts">
const { $i18n } = useNuxtApp()
const currentLocale = computed(() => $i18n?.global?.locale?.value || 'en')

const sectionTitle = computed(() =>
  currentLocale.value === 'en' ? 'GitHub Activity' : 'Actividad en GitHub',
)
const loadingLabel = computed(() =>
  currentLocale.value === 'en' ? 'Loading GitHub activity…' : 'Cargando actividad de GitHub…',
)
const errorLabel = computed(() =>
  currentLocale.value === 'en'
    ? 'Live stats unavailable. See the full profile on GitHub.'
    : 'Estadísticas no disponibles. Mira el perfil completo en GitHub.',
)
const emptyLabel = computed(() =>
  currentLocale.value === 'en'
    ? 'No public activity in the last year.'
    : 'Sin actividad pública en el último año.',
)
const staleLabel = computed(() =>
  currentLocale.value === 'en' ? 'Cached snapshot' : 'Datos en caché',
)

const githubUrl = 'https://github.com/drupalio'

const { data: profile, pending: profilePending, error: profileError } = await useFetch('/api/github')
const { data: contributions, pending: gridPending, error: gridError } = await useFetch('/api/github/contributions')

const stats = computed(() => [
  { label: currentLocale.value === 'en' ? 'Repos' : 'Repos', value: profile.value?.publicRepos ?? null },
  { label: currentLocale.value === 'en' ? 'Followers' : 'Seguidores', value: profile.value?.followers ?? null },
  { label: currentLocale.value === 'en' ? 'Contributions' : 'Contribs', value: contributions.value?.total ?? null },
])

const grid = computed(() => contributions.value?.days || [])
const weeks = computed(() => {
  const days = grid.value
  if (!days.length) return []
  const result: typeof days[] = []
  for (let i = 0; i < days.length; i += 7) {
    result.push(days.slice(i, i + 7))
  }
  return result
})

const showStats = computed(() => !profilePending.value && !profileError.value && profile.value)
const showGrid = computed(() => !gridPending.value && !gridError.value && (contributions.value?.days?.length ?? 0) > 0)
const showStale = computed(() => profile.value?.stale || contributions.value?.stale)
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex items-center justify-between">
      <SectionLabel number="05" :label="sectionTitle" />
      <a
        :href="githubUrl"
        target="_blank"
        rel="noopener"
        class="text-sm text-accent transition-colors duration-150 hover:text-accent/80"
      >
        @drupalio
      </a>
    </div>

    <p v-if="profilePending || gridPending" class="text-sm text-text-muted" role="status">
      {{ loadingLabel }}
    </p>

    <template v-else-if="showStats">
      <div class="grid grid-cols-3 gap-4">
        <div v-for="stat in stats" :key="stat.label" class="flex flex-col gap-1">
          <AnimatedNumber :value="stat.value ?? 0" class="text-2xl font-semibold text-text" />
          <span class="font-mono text-xs uppercase tracking-wider text-text-muted">{{ stat.label }}</span>
        </div>
      </div>

      <div v-if="showGrid" class="overflow-x-auto pb-2">
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
      <p v-else class="text-sm text-text-muted">
        {{ emptyLabel }}
      </p>

      <p v-if="showStale" class="font-mono text-[11px] uppercase tracking-wider text-text-muted">
        {{ staleLabel }}
      </p>
    </template>

    <p v-else class="max-w-md text-sm leading-relaxed text-text-muted">
      {{ profileError || gridError ? errorLabel : emptyLabel }}
      <a :href="githubUrl" target="_blank" rel="noopener" class="text-accent hover:text-accent/80">GitHub</a>.
    </p>
  </div>
</template>
