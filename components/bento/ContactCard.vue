<script setup lang="ts">
const { $i18n } = useNuxtApp()
const tm = (key: string) => $i18n?.global?.tm(key) ?? []
const t = (key: string) => $i18n?.global?.t(key) ?? key

const currentLocale = computed(() => $i18n?.global?.locale?.value || 'en')

const links = computed(() => {
  const raw = tm('personalInfo.links')
  return Array.isArray(raw) ? raw : []
})

const email = 'hello@drupalio.dev'
</script>

<template>
  <div class="flex flex-col gap-4">
    <SectionLabel number="09" :label="currentLocale === 'en' ? 'Contact' : 'Contacto'" />

    <h3 class="text-balance text-2xl font-medium tracking-tight text-text">
      {{ t('contact.heading') }}
    </h3>

    <p class="max-w-md text-balance text-sm leading-relaxed text-text-muted">
      {{ t('contact.body') }}
    </p>

    <a
      :href="`mailto:${email}`"
      class="inline-flex w-fit items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-all duration-150 hover:bg-accent/90"
    >
      <Icon name="lucide:mail" size="14" />
      {{ email }}
    </a>

    <div class="mt-2 flex flex-wrap gap-4">
      <a
        v-for="link in links"
        :key="link.url"
        :href="link.url"
        target="_blank"
        rel="noopener"
        class="text-sm text-text-muted transition-colors duration-150 hover:text-text"
      >
        {{ link.name }}
      </a>
    </div>
  </div>
</template>