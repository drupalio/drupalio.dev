<script setup lang="ts">
const { $i18n } = useNuxtApp()
const t = (key: string) => $i18n?.global?.t(key) ?? key

const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-border px-6 py-12 lg:px-8">
    <div class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-sm text-text-muted sm:flex-row">
      <p>{{ t('footer.built') }}</p>
      <p class="font-mono tabular-nums">© {{ year }} Ricardo Morales</p>
    </div>
  </footer>
</template>