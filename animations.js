import { gsap } from "gsap"

export function animateHero(el) {
  gsap.from(el, {
    opacity: 0,
    y: -50,
    duration: 1.5,
    ease: "power4.out"
  })
}

export function animateSocialGrid(titleEl, profileEl, iconsEl) {
  // Animar el título con un efecto de desvanecimiento y movimiento
  gsap.from(titleEl, {
    opacity: 0,
    y: -50,
    duration: 1.5,
    ease: "elastic.out(1, 0.5)"
  })

  // Animar la imagen de perfil con un efecto de zoom y rotación
  gsap.from(profileEl, {
    opacity: 0,
    scale: 0.2,
    rotation: -10,
    duration: 1.2,
    delay: 0.4,
    ease: "back.out(2)"
  })

  // Animar los iconos sociales con un efecto de cascada
  gsap.from(iconsEl.querySelectorAll('.social-button'), {
    opacity: 0,
    scale: 0,
    y: 50,
    stagger: 0.1,
    duration: 0.8,
    delay: 0.8,
    ease: "elastic.out(1, 0.5)"
  })

  // Animar el divisor
  gsap.from(iconsEl.querySelector('.p-divider'), {
    width: 0,
    opacity: 0,
    duration: 1,
    delay: 1.5,
    ease: "power2.out"
  })
}
