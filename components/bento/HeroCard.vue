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
const firstName = computed(() => name.value.split(' ')[0] ?? name.value)
const restName = computed(() => name.value.split(' ').slice(1).join(' '))
</script>

<template>
  <div class="flex flex-col gap-6">
    <p class="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs uppercase tracking-wider text-text-muted">
      <span class="inline-flex items-center gap-2">
        <span class="inline-flex h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
        {{ t('status.available') }}
      </span>
      <span aria-hidden="true">·</span>
      <span>{{ t('status.city') }}</span>
    </p>

    <h1 class="max-w-5xl font-display text-6xl leading-[0.95] font-bold tracking-tight text-balance text-text sm:text-7xl lg:text-8xl">
      {{ firstName }}
      <span class="text-accent">{{ restName }}</span>
    </h1>

    <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
      <p class="max-w-xl text-lg leading-relaxed text-text-muted">
        {{ t('personalInfo.title') }}. {{ t('hero.tagline') }}
      </p>

      <div class="flex shrink-0 flex-wrap items-center gap-3">
        <NuxtLink
          to="/#projects"
          class="inline-flex h-11 items-center rounded-xl bg-text px-5 text-sm font-medium text-bg transition-colors duration-150 hover:bg-accent hover:text-white dark:hover:text-[#17122b]"
        >
          {{ t('hero.workCta') }}
        </NuxtLink>
        <NuxtLink
          to="/#contact"
          class="inline-flex h-11 items-center gap-1.5 rounded-xl px-2 text-sm font-medium text-text-muted transition-colors duration-150 hover:text-text"
        >
          {{ t('hero.contactCta') }}
          <Icon name="lucide:arrow-down-right" size="15" aria-hidden="true" />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
