export default defineNuxtPlugin(() => {
  if (!import.meta.client) return
  if (import.meta.dev) return

  const domain = 'drupalio.dev'
  const script = document.createElement('script')
  script.defer = true
  script.dataset.domain = domain
  script.src = 'https://plausible.io/js/script.js'
  document.head.appendChild(script)
})