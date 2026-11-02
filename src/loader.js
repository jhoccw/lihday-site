import { reactive, nextTick } from 'vue'
import gsap from 'gsap'
import { still, lockScroll } from './motion'

// Page loader: a black cover that wipes in, counts real progress (route chunk,
// fonts, first-screen images), then lifts away to reveal the new page.
export const loader = reactive({ visible: !still, pct: 0 })

const MIN_SHOWN = 900 // ms, so a cached page still reads as a deliberate transition
const MAX_WAIT = 6000 // ms, never hold the page hostage to one slow image

let root
let shown = { v: 0 }
let goal = 0
let counter
let pending
let startedAt = 0
let busy = !still
let revealed = still
let waiting = []

export function registerLoader(el) {
  root = el
  startedAt = performance.now()
  if (busy) {
    lockScroll(true)
    advance(12)
  }
}

export const isLoading = () => busy

// Pages start their entrance motion once the cover begins to lift.
export function whenRevealed() {
  return revealed ? Promise.resolve() : new Promise((r) => waiting.push(r))
}

// The count only ever moves forward; a lower target joins the run already going.
function advance(target) {
  if (target <= goal && pending) return pending
  goal = Math.max(goal, target)
  counter?.kill()
  pending = new Promise((resolve) => {
    counter = gsap.to(shown, {
      v: goal,
      duration: goal === 100 ? 0.45 : 0.7,
      ease: 'power2.out',
      onUpdate: () => (loader.pct = Math.round(shown.v)),
      onComplete: resolve,
      onInterrupt: resolve,
    })
  })
  return pending
}

export async function cover() {
  if (still || !root) return
  busy = true
  revealed = false
  lockScroll(true)
  counter?.kill()
  shown.v = 0
  goal = 0
  pending = null
  loader.pct = 0
  loader.visible = true
  await nextTick()
  gsap.set(root.querySelector('.loader__num'), { yPercent: 0 })
  startedAt = performance.now()
  await gsap.fromTo(
    root,
    { clipPath: 'inset(100% 0% 0% 0%)' },
    { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.7, ease: 'expo.inOut' },
  )
  advance(18)
}

export async function complete(main) {
  if (!busy || !root) return
  advance(35)

  const fold = window.innerHeight * 1.2
  const imgs = main
    ? [...main.querySelectorAll('img')].filter((img) => !img.complete && img.getBoundingClientRect().top < fold)
    : []
  const tasks = [document.fonts?.ready ?? Promise.resolve(), ...imgs.map(waitFor)]
  let done = 0
  const tick = () => advance(35 + (65 * ++done) / tasks.length)
  await Promise.race([Promise.all(tasks.map((t) => t.then(tick))), sleep(MAX_WAIT)])

  await advance(100)
  const left = MIN_SHOWN - (performance.now() - startedAt)
  if (left > 0) await sleep(left)
  await lift(main)
}

function lift(main) {
  document.querySelector('[data-header]')?.classList.remove('is-hidden')
  return new Promise((resolve) => {
    gsap
      .timeline({
        onComplete: () => {
          loader.visible = false
          busy = false
          lockScroll(false)
          resolve()
        },
      })
      .to(root.querySelector('.loader__num'), { yPercent: -110, duration: 0.5, ease: 'expo.in' })
      .add(() => {
        revealed = true
        waiting.forEach((r) => r())
        waiting = []
      })
      .to(root, { clipPath: 'inset(0% 0% 100% 0%)', duration: 1, ease: 'expo.inOut' })
      .fromTo(main, { y: 120, scale: 0.98 }, { y: 0, scale: 1, duration: 1.3, ease: 'expo.out', clearProps: 'transform' }, '<0.15')
  })
}

function waitFor(img) {
  return new Promise((resolve) => {
    img.loading = 'eager'
    img.addEventListener('load', resolve, { once: true })
    img.addEventListener('error', resolve, { once: true })
  })
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
