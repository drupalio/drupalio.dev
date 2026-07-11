<script setup lang="ts">
const { $i18n } = useNuxtApp()
const t = (key: string) => $i18n?.global?.t(key) ?? key

const links = computed(() => {
  const raw = $i18n?.global?.tm('personalInfo.links')
  if (!Array.isArray(raw)) return []
  return raw
})
</script>

<template>
  <div class="flex flex-col justify-between gap-6">
    <div class="flex items-center gap-2">
      <span class="relative flex h-2 w-2">
        <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75 duration-1000" />
        <span class="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
      </span>
      <p class="text-sm font-medium text-text">{{ t('status.available') }}</p>
    </div>

    <div class="flex flex-col gap-1">
      <p class="section-label">{{ t('status.location') }}</p>
      <p class="text-base text-text-muted">{{ t('status.city') }}</p>
    </div>

    <div class="flex flex-col gap-3">
      <p class="section-label">{{ t('status.connect') }}</p>
      <div class="flex flex-col gap-1.5">
        <a
          v-for="link in links"
          :key="link.url"
          :href="link.url"
          target="_blank"
          rel="noopener"
          class="inline-flex items-center gap-2 text-sm text-text-muted transition-colors duration-150 hover:text-text"
        >
          <Icon :name="`lucide:${link.name.toLowerCase() === 'linkedin' ? 'linkedin' : 'globe'}`" size="14" />
          {{ link.name }}
        </a>
      </div>
    </div>
  </div>
</template>