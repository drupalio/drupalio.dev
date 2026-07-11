<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script setup lang="ts">
onMounted(() => {
  const saved = localStorage.getItem('language')
  const { $i18n } = useNuxtApp()
  if (saved && (saved === 'en' || saved === 'es') && $i18n?.global) {
    $i18n.global.locale.value = saved
  }
})
</script>