<script setup lang="ts">
const { $i18n } = useNuxtApp()
const tm = (key: string) => $i18n?.global?.tm(key) ?? []
const currentLocale = computed(() => $i18n?.global?.locale?.value || 'en')

const workExperience = computed(() => {
  const data = tm('workExperience')
  return Array.isArray(data) ? data : []
})

const sectionTitle = computed(() =>
  currentLocale.value === 'en' ? 'Career Timeline' : 'Trayectoria',
)

function yearFromPeriod(period: string): string {
  if (!period) return ''
  const match = period.match(/(\d{4})/)
  return match ? match[1] : ''
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <SectionLabel number="07" :label="sectionTitle" />

    <div class="relative flex items-center gap-4 overflow-x-auto pb-2">
      <div
        v-for="(job, index) in workExperience"
        :key="index"
        class="flex min-w-[180px] flex-col gap-1"
      >
        <div class="flex items-center gap-2">
          <span class="font-mono text-sm font-medium text-accent tabular-nums">{{ yearFromPeriod(job.period) }}</span>
          <div v-if="index < workExperience.length - 1" class="h-px flex-1 bg-border" />
        </div>
        <p class="text-sm font-medium text-text">{{ job.company }}</p>
        <p class="text-xs text-text-muted">{{ job.title }}</p>
      </div>
    </div>
  </div>
</template>