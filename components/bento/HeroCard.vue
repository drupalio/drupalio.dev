<script setup lang="ts">
const { $i18n } = useNuxtApp()
const t = (key: string) => {
  if (!$i18n?.global?.t) return key
  try {
    return $i18n.global.t(key)
  } catch {
    return key
  }
}

const name = computed(() => t('personalInfo.name'))
const title = computed(() => t('personalInfo.title'))
const avatarUrl = 'https://avatars.githubusercontent.com/u/5186093'
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="flex items-center gap-4">
      <NuxtImg
        :src="avatarUrl"
        :alt="name"
        width="56"
        height="56"
        format="avif"
        sizes="56px sm:56px"
        class="h-14 w-14 rounded-full ring-1 ring-border"
        loading="eager"
      />
      <p class="section-label">{{ t('hero.greeting') }}</p>
    </div>
    <h1 class="text-balance text-5xl font-semibold leading-[1.05] tracking-tight text-text sm:text-6xl lg:text-7xl">
      {{ name }}
    </h1>
    <p class="text-balance text-xl text-text-muted sm:text-2xl">
      {{ title }}
    </p>
    <p class="max-w-xl text-base leading-relaxed text-text-muted">
      {{ t('hero.tagline') }}
    </p>
  </div>
</template>