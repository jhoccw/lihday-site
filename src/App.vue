<script setup>
import { onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { company } from './data'
import { setupApp, scrollToTarget, refreshMotion } from './motion'
import { cover, complete, isLoading } from './loader'
import PageLoader from './components/PageLoader.vue'
import AppIcon from './components/AppIcon.vue'
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'

const route = useRoute()
const router = useRouter()
let dispose

const isList = (r) => r.name === 'products' || r.name === 'category'
const isPageChange = (to, from) => from.name && to.path !== from.path && !(isList(to) && isList(from))

// A real page change: cover the screen before the old page goes away.
router.beforeEach(async (to, from) => {
  if (isPageChange(to, from)) await cover()
})

// Same page, new hash (or the logo on the home page): travel there smoothly.
const off = router.afterEach(async (to, from) => {
  if (!from.name) return
  await nextTick()
  if (to.path === from.path || !isLoading()) {
    if (to.path === from.path) scrollToTarget(to.hash || 0)
    else scrollToTarget(0, true)
    return
  }
  // New page is mounted under the cover: settle position, then finish loading.
  refreshMotion()
  scrollToTarget(to.hash || 0, true)
  await complete(document.querySelector('main'))
  refreshMotion()
})

onMounted(async () => {
  dispose = setupApp()
  await router.isReady()
  await nextTick()
  if (route.hash) scrollToTarget(route.hash, true)
  await complete(document.querySelector('main'))
  refreshMotion()
})

onBeforeUnmount(() => {
  off()
  dispose?.()
})
</script>

<template>
  <a class="skip" href="#main">跳到主要內容</a>
  <SiteHeader />
  <RouterView v-slot="{ Component }">
    <component :is="Component" :key="route.name === 'category' ? 'products' : route.name === 'product' ? route.path : route.name" />
  </RouterView>
  <SiteFooter />
  <PageLoader />

  <a class="callbar" :class="{ 'is-visible': route.name !== 'home' }" :href="company.telHref" data-callbar>
    <AppIcon name="phone" :size="20" />
    來電洽詢
    <span class="btn__num">{{ company.tel }}</span>
  </a>
</template>

<style scoped>
.skip {
  position: fixed;
  top: 8px;
  left: 8px;
  z-index: 100;
  padding: 10px 16px;
  background: var(--ink);
  color: #fff;
  border-radius: var(--radius);
  transform: translateY(-200%);
}

.skip:focus-visible {
  transform: none;
}

.callbar {
  display: none;
}

@media (max-width: 767px) {
  .callbar {
    position: fixed;
    inset: auto 12px calc(12px + env(safe-area-inset-bottom)) 12px;
    z-index: 40;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    min-height: 56px;
    border-radius: var(--radius);
    background: var(--red);
    color: #fff;
    font-weight: 700;
    box-shadow: 0 10px 28px -8px rgba(0, 0, 0, 0.55);
    transform: translateY(calc(100% + 32px));
    visibility: hidden;
    transition:
      transform 0.6s var(--ease-out),
      visibility 0s 0.6s;
  }

  .callbar.is-visible {
    transform: none;
    visibility: visible;
    transition:
      transform 0.6s var(--ease-out),
      visibility 0s;
  }
}
</style>
