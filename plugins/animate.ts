import type { DirectiveBinding, ObjectDirective } from 'vue'

interface AnimateElement extends HTMLElement {
  __animateObserver?: IntersectionObserver
}

const animateDirective: ObjectDirective<AnimateElement> = {
  getSSRProps() {
    return {}
  },
  mounted(el: AnimateElement, binding: DirectiveBinding) {
    if (!import.meta.client) return

    el.classList.add('animate-in')

    const delay = binding.value as number | undefined
    if (delay) {
      el.style.transitionDelay = `${delay}ms`
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -5% 0px' },
    )

    observer.observe(el)
    el.__animateObserver = observer
  },
  unmounted(el: AnimateElement) {
    el.__animateObserver?.disconnect()
    delete el.__animateObserver
  },
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive('animate', animateDirective)
})