<script setup lang="ts">
const { $i18n } = useNuxtApp()
const t = (key: string) => {
  if (!$i18n?.global?.t) return key
  try { return $i18n.global.t(key) } catch { return key }
}

const navItems = computed(() => [
  { label: t('nav.about'), href: '/#about' },
  { label: t('nav.experience'), href: '/#experience' },
  { label: t('nav.projects'), href: '/#projects' },
  { label: t('nav.stack'), href: '/#stack' },
  { label: t('nav.writing'), href: '/blog' },
  { label: t('nav.contact'), href: '/#contact' },
])

const scrolled = ref(false)

onMounted(() => {
  const handler = () => {
    scrolled.value = window.scrollY > 20
  }
  window.addEventListener('scroll', handler, { passive: true })
  onBeforeUnmount(() => window.removeEventListener('scroll', handler))
})
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 transition-colors duration-200"
    :class="scrolled ? 'border-b border-border bg-bg' : 'border-b border-transparent bg-transparent'"
  >
    <nav class="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8" aria-label="Primary">
      <NuxtLink to="/" class="font-display text-[15px] font-bold tracking-tight text-text" aria-label="drupalio.dev home">
        drupalio<span class="text-accent">.</span>dev
      </NuxtLink>

      <div class="hidden items-center gap-6 md:flex">
        <NuxtLink
          v-for="item in navItems"
          :key="item.href"
          :to="item.href"
          class="text-sm text-text-muted transition-colors duration-150 hover:text-text"
        >
          {{ item.label }}
        </NuxtLink>
      </div>

      <div class="flex items-center gap-2">
        <LanguageToggle />
        <ThemeToggle />
      </div>
    </nav>
  </header>
</template>
