import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

gsap.registerPlugin(ScrollTrigger)

const EXPO = 'expo.out'
const HEADER_H = 72

// `?static` renders every page settled, with no smooth scroll or entrances.
export const still =
  window.matchMedia('(prefers-reduced-motion: reduce)').matches || new URLSearchParams(location.search).has('static')

let lenis

// App-wide: smooth scroll and the header that gets out of the way going down.
export function setupApp() {
  const header = document.querySelector('[data-header]')

  if (!still) {
    lenis = new Lenis({ lerp: 0.11 })
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)
  }

  const headerTrigger = ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate(self) {
      const past = self.scroll() > window.innerHeight * 0.6
      header.classList.toggle('is-hidden', past && self.direction === 1)
    },
  })

  // Webfonts change section heights; re-measure once they land.
  document.fonts?.ready.then(() => ScrollTrigger.refresh())

  return () => {
    headerTrigger.kill()
    if (lenis) {
      gsap.ticker.remove(raf)
      lenis.destroy()
      lenis = null
    }
  }
}

function raf(time) {
  lenis?.raf(time * 1000)
}

export function scrollToTarget(target, immediate = false) {
  const el = typeof target === 'string' ? document.querySelector(target) : target
  const top = typeof target === 'number' ? target : el ? el.getBoundingClientRect().top + window.scrollY - HEADER_H : 0
  if (lenis) lenis.scrollTo(top, { immediate, force: true })
  else window.scrollTo({ top, behavior: immediate || still ? 'auto' : 'smooth' })
}

export function lockScroll(on) {
  if (lenis) on ? lenis.stop() : lenis.start()
  document.documentElement.style.overflow = on ? 'hidden' : ''
}

export function refreshMotion() {
  lenis?.resize()
  ScrollTrigger.refresh()
}

// Home page: the lens intro plus each section's own entrance.
export function homeMotion() {
  const callbar = document.querySelector('[data-callbar]')
  const barTrigger = ScrollTrigger.create({
    trigger: '[data-hero]',
    start: 'bottom 60%',
    endTrigger: '#contact',
    end: 'top 70%',
    toggleClass: { targets: callbar, className: 'is-visible' },
  })

  let offPointer
  const ctx = still
    ? null
    : gsap.context(() => {
        offPointer = heroIntro()
        sectionReveals()
      })

  return () => {
    barTrigger.kill()
    callbar.classList.remove('is-visible')
    offPointer?.()
    ctx?.revert()
    // the hero's scroll timeline is created after the intro, outside the context
    ScrollTrigger.getAll()
      .filter((t) => !t.trigger?.isConnected)
      .forEach((t) => t.kill())
  }
}

// Inner pages share a quieter set: headings rise, blocks fade, grids fill in.
export function pageMotion(root) {
  if (still) return () => {}
  const ctx = gsap.context(() => {
    gsap.utils.toArray('[data-lines]').forEach((el) => {
      gsap.from(el.querySelectorAll('.ln > span'), {
        yPercent: 110,
        duration: 1.1,
        ease: EXPO,
        stagger: 0.1,
        scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      })
    })
    gsap.set('[data-fade]', { opacity: 0, y: 24 })
    ScrollTrigger.batch('[data-fade]', {
      start: 'top 92%',
      once: true,
      onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 0.9, ease: EXPO, stagger: 0.06 }),
    })
    gsap.utils.toArray('[data-reveal-img]').forEach((el) => {
      gsap.from(el, { clipPath: 'inset(0 0 100% 0)', duration: 1.3, ease: 'expo.inOut' })
      gsap.from(el.querySelector('img'), { scale: 1.2, duration: 1.6, ease: EXPO })
    })
    gridReveals()
    telReveal()
  }, root)
  return () => ctx.revert()
}

// Card grids fill in row by row. Called again when a filter swaps the cards.
export function gridReveals(scope) {
  if (still) return
  const cards = gsap.utils.toArray('[data-card]', scope).filter((c) => !c.dataset.shown)
  if (!cards.length) return
  cards.forEach((c) => (c.dataset.shown = '1'))
  gsap.set(cards, { opacity: 0, y: 32 })
  ScrollTrigger.batch(cards, {
    start: 'top 94%',
    once: true,
    onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 0.9, ease: EXPO, stagger: 0.05 }),
  })
}

function telReveal() {
  if (!document.querySelector('[data-tel]')) return
  gsap.from('[data-tel] .digit', {
    yPercent: 110,
    duration: 1,
    ease: EXPO,
    stagger: 0.045,
    scrollTrigger: { trigger: '[data-tel]', start: 'top 85%', once: true },
  })
  gsap.from('[data-tel] .contact__go', {
    scale: 0,
    rotation: -90,
    duration: 1,
    ease: 'back.out(1.8)',
    scrollTrigger: { trigger: '[data-tel]', start: 'top 85%', once: true },
  })
  gsap.from('[data-contact-info] > div', {
    opacity: 0,
    y: 24,
    duration: 0.9,
    ease: EXPO,
    stagger: 0.08,
    scrollTrigger: { trigger: '[data-contact-info]', start: 'top 90%', once: true },
  })
}

function heroIntro() {
  const lensWrap = document.querySelector('[data-lens]')
  const lens = lensWrap.querySelector('svg')
  const grip = lens.querySelector('.lens__grip')
  const engrave = lens.querySelector('.lens__engrave')
  const depth = lens.querySelector('.lens__depth')
  const glare = lens.querySelector('.lens__glare')

  const tl = gsap.timeline({ defaults: { ease: EXPO } })

  tl.from('.hero__title .ln > span', { yPercent: 110, duration: 1.2, stagger: 0.1 }, 0.15)
    .from('[data-hero-fade]', { y: 24, opacity: 0, filter: 'blur(8px)', duration: 0.9, stagger: 0.07 }, 0.6)
    .from(lensWrap, { scale: 1.18, opacity: 0, duration: 1.6 }, 0)
    .fromTo(
      lens,
      { '--d': '0px', '--twist': '-70deg' },
      { '--d': '150px', '--twist': '0deg', duration: 2, ease: 'expo.inOut' },
      0.1,
    )
    .from(grip, { rotation: -60, svgOrigin: '400 400', duration: 2.2 }, 0)
    .from(engrave, { rotation: 90, svgOrigin: '400 400', duration: 2.4 }, 0)

  // Once open, the iris answers the scroll: it stops down as the hero leaves.
  tl.add(() => {
    gsap
      .timeline({
        scrollTrigger: { trigger: '[data-hero]', start: 'top top', end: 'bottom top', scrub: 0.6 },
        defaults: { ease: 'none' },
      })
      .fromTo(lens, { '--d': '150px', '--twist': '0deg' }, { '--d': '26px', '--twist': '55deg', immediateRender: false }, 0)
      .to(grip, { rotation: 50, svgOrigin: '400 400' }, 0)
      .to(engrave, { rotation: -40, svgOrigin: '400 400' }, 0)
      .to(lensWrap, { yPercent: 14 }, 0)
  })

  // The glass has depth: inner elements and glare drift against the pointer.
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    const dx = gsap.quickTo(depth, 'x', { duration: 0.9, ease: 'power3' })
    const dy = gsap.quickTo(depth, 'y', { duration: 0.9, ease: 'power3' })
    const gx = gsap.quickTo(glare, 'x', { duration: 1.2, ease: 'power3' })
    const gy = gsap.quickTo(glare, 'y', { duration: 1.2, ease: 'power3' })
    const onMove = (e) => {
      const nx = e.clientX / window.innerWidth - 0.5
      const ny = e.clientY / window.innerHeight - 0.5
      dx(nx * 34)
      dy(ny * 34)
      gx(nx * -60)
      gy(ny * -60)
    }
    const heroEl = document.querySelector('[data-hero]')
    heroEl.addEventListener('pointermove', onMove)
    return () => heroEl.removeEventListener('pointermove', onMove)
  }
}

function sectionReveals() {
  // Headings rise out of a mask, line by line.
  gsap.utils.toArray('[data-lines]').forEach((el) => {
    gsap.from(el.querySelectorAll('.ln > span'), {
      yPercent: 110,
      duration: 1.1,
      ease: EXPO,
      stagger: 0.1,
      scrollTrigger: { trigger: el, start: 'top 86%', once: true },
    })
  })

  gsap.set('[data-fade]', { opacity: 0, y: 28 })
  ScrollTrigger.batch('[data-fade]', {
    start: 'top 88%',
    once: true,
    onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 1, ease: EXPO, stagger: 0.08 }),
  })

  // Services: the grid is ruled first, then each cell fills in.
  const services = gsap.utils.toArray('[data-services] > li')
  gsap.set(services, { opacity: 0, y: 32 })
  gsap.from('[data-services]', {
    clipPath: 'inset(0 100% 0 0)',
    duration: 1.2,
    ease: 'expo.inOut',
    scrollTrigger: { trigger: '[data-services]', start: 'top 86%', once: true },
  })
  ScrollTrigger.batch(services, {
    start: 'top 90%',
    once: true,
    onEnter: (els) => gsap.to(els, { opacity: 1, y: 0, duration: 0.9, ease: EXPO, stagger: 0.07, delay: 0.25 }),
  })

  // Process: the rail is drawn by the scroll, steps land as it reaches them.
  const lines = gsap.utils.toArray('[data-process-line]')
  const vertical = window.matchMedia('(max-width: 767px)').matches
  const prop = vertical ? 'scaleY' : 'scaleX'
  const steps = gsap.utils.toArray('[data-process] > li')
  const pt = gsap.timeline({
    scrollTrigger: { trigger: '[data-process]', start: 'top 78%', end: vertical ? 'bottom 60%' : 'top 30%', scrub: 0.5 },
    defaults: { ease: 'none' },
  })
  lines.forEach((l, i) => pt.fromTo(l, { [prop]: 0 }, { [prop]: 1, duration: 1 }, i))
  steps.forEach((s) => {
    gsap.from(s.querySelectorAll('.step__dot'), {
      scale: 0,
      duration: 0.7,
      ease: 'back.out(2.4)',
      scrollTrigger: { trigger: s, start: 'top 80%', once: true },
    })
    gsap.from(s.querySelectorAll('.step__num, .step__name, .step__desc'), {
      opacity: 0,
      y: 24,
      duration: 0.9,
      ease: EXPO,
      stagger: 0.08,
      scrollTrigger: { trigger: s, start: 'top 80%', once: true },
    })
  })

  // Products slide in along the rail's own axis.
  gsap.from('[data-products] > li', {
    x: 120,
    opacity: 0,
    duration: 1.1,
    ease: EXPO,
    stagger: 0.07,
    scrollTrigger: { trigger: '[data-products]', start: 'top 85%', once: true },
  })

  gsap.from('[data-clients] > li', {
    opacity: 0,
    scale: 0.92,
    duration: 0.8,
    ease: EXPO,
    stagger: 0.06,
    scrollTrigger: { trigger: '[data-clients]', start: 'top 88%', once: true },
  })

  // Values light up one at a time as the reader passes them.
  gsap.from('[data-values] > li', {
    opacity: 0.18,
    x: 36,
    ease: 'power2.out',
    stagger: 0.5,
    duration: 1,
    scrollTrigger: { trigger: '[data-values]', start: 'top 80%', end: 'bottom 55%', scrub: 0.5 },
  })

  telReveal()
}
