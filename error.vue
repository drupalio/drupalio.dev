<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{
  error: NuxtError
}>()

const is404 = computed(() => props.error?.statusCode === 404)

const { $i18n } = useNuxtApp()
const currentLocale = computed(() => $i18n?.global?.locale?.value || 'en')

const title = computed(() =>
  is404.value
    ? (currentLocale.value === 'en' ? 'Not found' : 'No encontrado')
    : (currentLocale.value === 'en' ? 'Something went wrong' : 'Algo salió mal'),
)

const message = computed(() =>
  is404.value
    ? (currentLocale.value === 'en'
      ? "The page you're looking for doesn't exist or has been moved."
      : 'La página que buscas no existe o ha sido movida.')
    : (currentLocale.value === 'en'
      ? 'An unexpected error occurred. Try going back home.'
      : 'Ocurrió un error inesperado. Intenta volver al inicio.'),
)

const backLabel = computed(() =>
  currentLocale.value === 'en' ? 'Back to home' : 'Volver al inicio',
)

useSeoMeta({
  title: () => `${title.value} — Ricardo Morales`,
  robots: 'noindex',
})
</script>

<template>
  <div class="flex min-h-screen flex-col">
    <AppHeader />

    <main class="mx-auto flex max-w-2xl flex-1 flex-col items-center justify-center px-6 pb-20 pt-32 text-center lg:px-8">
      <p class="mb-4 font-mono text-7xl font-semibold tabular-nums text-text-muted/20">
        {{ error?.statusCode || 500 }}
      </p>

      <h1 class="mb-3 text-balance text-2xl font-semibold tracking-tight text-text">
        {{ title }}
      </h1>

      <p class="mb-8 max-w-md text-balance text-sm leading-relaxed text-text-muted">
        {{ message }}
      </p>

      <NuxtLink
        to="/"
        class="inline-flex items-center gap-2 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-all duration-150 hover:bg-accent/90"
      >
        <Icon name="lucide:arrow-left" size="14" />
        {{ backLabel }}
      </NuxtLink>
    </main>

    <AppFooter />
  </div>
</template>