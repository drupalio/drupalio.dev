<script setup lang="ts">
const { $i18n } = useNuxtApp()

const currentLocale = computed(() => $i18n?.global?.locale?.value || 'en')

const items = computed(() => {
  const skills = $i18n?.global?.tm('skills') as Record<string, unknown> | undefined
  if (!skills) return []
  const aiSkills = (skills.aiAndLLMs || skills.aiAndMls || []) as Array<{ name: string; level: string }>
  return Array.isArray(aiSkills) ? aiSkills : []
})

const sectionTitle = computed(() =>
  currentLocale.value === 'en' ? 'AI Lab' : 'Laboratorio de IA',
)

const codeSnippet = [
  { line: 1, content: '// AI exploration', muted: true },
  { line: 2, content: 'const prompt = "design resilient systems"', muted: false },
  { line: 3, content: 'const output = await model.generate({', muted: false },
  { line: 4, content: '  prompt,', muted: false },
  { line: 5, content: '  temperature: 0.7,', muted: false },
  { line: 6, content: '  max_tokens: 2048,', muted: false },
  { line: 7, content: '})', muted: false },
]
</script>

<template>
  <div class="flex flex-col gap-4">
    <SectionLabel number="05" :label="sectionTitle" />

    <div class="rounded-xl bg-[#0d0d0f] p-4 font-mono text-xs leading-relaxed">
      <div v-for="line in codeSnippet" :key="line.line" class="flex gap-4">
        <span class="select-none text-text-muted/40 tabular-nums">{{ line.line }}</span>
        <span :class="line.muted ? 'text-text-muted/60' : 'text-text/90'">{{ line.content }}</span>
      </div>
    </div>

    <div v-if="items.length" class="flex flex-col gap-2">
      <div
        v-for="item in items.slice(0, 6)"
        :key="item.name"
        class="flex items-center justify-between gap-2"
      >
        <span class="text-sm text-text">{{ item.name }}</span>
        <span class="font-mono text-[10px] uppercase text-text-muted">{{ item.level }}</span>
      </div>
    </div>
  </div>
</template>