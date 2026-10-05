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
    <SectionLabel number="07" :label="currentLocale === 'en' ? 'Contact' : 'Contacto'" />

    <h3 class="font-display text-balance text-3xl font-bold tracking-tight text-text sm:text-4xl">
      {{ t('contact.heading') }}
    </h3>

    <p class="max-w-md text-balance text-sm leading-relaxed text-text-muted">
      {{ t('contact.body') }}
    </p>

    <a
      :href="`mailto:${email}`"
      class="btn-solid"
    >
      <Icon name="lucide:mail" size="15" />
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