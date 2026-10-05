<script setup lang="ts">
const { $i18n } = useNuxtApp()
const t = (key: string) => $i18n?.global?.t(key) ?? key

const year = new Date().getFullYear()

const links = computed(() => [
  { label: t('nav.projects'), href: '/#projects' },
  { label: t('nav.writing'), href: '/blog' },
  { label: t('nav.contact'), href: '/#contact' },
])
</script>

<template>
  <footer class="border-t border-border px-6 py-10 lg:px-8">
    <div class="mx-auto flex max-w-7xl flex-col gap-6">
      <div class="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <p class="font-display text-xl font-bold tracking-tight text-text">
          drupalio<span class="text-accent">.</span>dev
        </p>
        <nav class="flex items-center gap-5" aria-label="Footer">
          <NuxtLink
            v-for="link in links"
            :key="link.href"
            :to="link.href"
            class="text-sm text-text-muted transition-colors duration-150 hover:text-text"
          >
            {{ link.label }}
          </NuxtLink>
        </nav>
      </div>
      <div class="flex flex-col justify-between gap-2 text-sm text-text-muted sm:flex-row">
        <p>{{ t('footer.built') }}</p>
        <p class="font-mono tabular-nums">© {{ year }} Ricardo Morales</p>
      </div>
    </div>
  </footer>
</template>
