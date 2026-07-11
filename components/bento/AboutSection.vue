<script setup lang="ts">
const { $i18n } = useNuxtApp()
const t = (key: string) => $i18n?.global?.t(key) ?? key
</script>

<template>
  <div class="flex flex-col gap-4">
    <SectionLabel number="01" label="About" />
    <p class="max-w-3xl text-balance text-lg leading-relaxed text-text-muted">
      {{ t('summary.summaryText') }}
    </p>
  </div>
</template>