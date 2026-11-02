<script setup>
import { ref, watch, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import { company, nav } from '../data'
import { categories, productsIn } from '../data/catalog'
import AppIcon from './AppIcon.vue'
import BrandLogo from './BrandLogo.vue'

const route = useRoute()
const open = ref(false)
const cats = categories.map((c) => ({ ...c, count: productsIn(c.id).length }))

function onKey(e) {
  if (e.key === 'Escape') open.value = false
}

// Leaving the mega menu by keyboard or after a click: drop focus so it closes.
function closeMega(e) {
  if (e.type === 'keydown' && e.key !== 'Escape') return
  document.activeElement?.blur()
}

watch(open, (v) => {
  document.documentElement.classList.toggle('menu-open', v)
  if (v) window.addEventListener('keydown', onKey)
  else window.removeEventListener('keydown', onKey)
})

watch(
  () => route.fullPath,
  () => (open.value = false),
)

onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <header class="header" data-header>
    <div class="wrap header__in">
      <RouterLink class="header__logo" to="/" aria-label="德運實業 LIHDAY 首頁">
        <BrandLogo />
      </RouterLink>

      <nav class="header__nav" aria-label="主選單">
        <template v-for="n in nav" :key="n.label">
          <div v-if="n.products" class="has-mega" @keydown="closeMega">
            <RouterLink class="header__link" :class="{ 'is-current': route.path.startsWith('/products') }" :to="n.to">
              {{ n.label }}
              <AppIcon class="header__chev" name="chevron-down" :size="16" />
            </RouterLink>
            <div class="mega">
              <div class="wrap mega__in">
                <div class="mega__intro">
                  <p class="mega__title">產品</p>
                  <p class="mega__text">立岱數位監控產品，與德運經銷的影像對講系統。</p>
                  <RouterLink class="link-arrow" to="/products" @click="closeMega">
                    看全部產品
                    <AppIcon name="arrow-right" :size="18" />
                  </RouterLink>
                </div>
                <ul class="mega__list">
                  <li v-for="c in cats" :key="c.id">
                    <RouterLink :to="{ name: 'category', params: { category: c.id } }" @click="closeMega">
                      <span class="mega__icon"><AppIcon :name="c.icon" :size="26" /></span>
                      <span>
                        <span class="mega__name">{{ c.name }}<span class="mega__count">{{ c.count }}</span></span>
                        <span class="mega__desc">{{ c.desc }}</span>
                      </span>
                    </RouterLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <RouterLink v-else class="header__link" :to="n.to">{{ n.label }}</RouterLink>
        </template>
      </nav>

      <a class="btn btn--red header__tel" :href="company.telHref">
        <AppIcon name="phone" :size="20" />
        <span class="btn__num">{{ company.tel }}</span>
      </a>

      <button class="header__burger" type="button" :aria-expanded="open" aria-controls="mobile-menu" @click="open = !open">
        <span class="sr-only">{{ open ? '關閉選單' : '開啟選單' }}</span>
        <AppIcon :name="open ? 'close' : 'menu'" :size="28" />
      </button>
    </div>

    <div id="mobile-menu" class="menu" :class="{ 'is-open': open }" :inert="!open">
      <nav class="menu__nav" aria-label="行動版選單">
        <template v-for="(n, i) in nav" :key="n.label">
          <RouterLink class="menu__link" :to="n.to" :style="{ '--i': i }">{{ n.label }}</RouterLink>
          <ul v-if="n.products" class="menu__sub" :style="{ '--i': i }">
            <li v-for="c in cats" :key="c.id">
              <RouterLink :to="{ name: 'category', params: { category: c.id } }"><AppIcon :name="c.icon" :size="20" />{{ c.name }}<span>{{ c.count }}</span></RouterLink>
            </li>
          </ul>
        </template>
      </nav>
      <a class="btn btn--red menu__tel" :href="company.telHref">
        <AppIcon name="phone" :size="20" />
        來電洽詢 <span class="btn__num">{{ company.tel }}</span>
      </a>
    </div>
  </header>
</template>

<style scoped>
.header {
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 50;
  height: var(--header-h);
  background: var(--paper);
  border-bottom: 1px solid var(--line);
  transition: transform 0.5s var(--ease-out);
}

.header.is-hidden {
  transform: translateY(-100%);
}

:global(html.menu-open) .header.is-hidden {
  transform: none;
}

.header__in {
  height: 100%;
  display: flex;
  align-items: center;
  gap: clamp(16px, 3vw, 48px);
}

.header__logo {
  display: block;
  height: 40px;
  flex: none;
}

.header__logo :deep(.logo) {
  height: 40px;
}

.header__nav {
  display: flex;
  gap: clamp(16px, 2.2vw, 36px);
  margin-left: auto;
  font-weight: 500;
  font-size: 0.9375rem;
}

.header__link {
  position: relative;
  display: flex;
  align-items: center;
  gap: 4px;
  height: var(--header-h);
  white-space: nowrap;
}

.header__link::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -1px;
  height: 3px;
  background: var(--red);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s var(--ease-out);
}

.header__link:hover::after,
.header__link:focus-visible::after,
.header__link.is-current::after,
.has-mega:hover .header__link::after,
.has-mega:focus-within .header__link::after {
  transform: scaleX(1);
}

.header__chev {
  transition: transform 0.4s var(--ease-out);
}

.has-mega:hover .header__chev,
.has-mega:focus-within .header__chev {
  transform: rotate(180deg);
}

.mega {
  position: absolute;
  inset: 100% 0 auto 0;
  background: var(--paper);
  border-bottom: 1px solid var(--line);
  box-shadow: 0 24px 40px -24px rgba(11, 11, 12, 0.28);
  clip-path: inset(0 0 100% 0);
  visibility: hidden;
  transition:
    clip-path 0.5s var(--ease-out),
    visibility 0s 0.5s;
}

.has-mega:hover .mega,
.has-mega:focus-within .mega {
  clip-path: inset(0 0 -48px 0);
  visibility: visible;
  transition:
    clip-path 0.5s var(--ease-out),
    visibility 0s;
}

.mega__in {
  display: grid;
  grid-template-columns: 4fr 8fr;
  gap: clamp(32px, 6vw, 96px);
  padding-block: 36px 40px;
}

.mega__title {
  font-size: 1.75rem;
  font-weight: 800;
  line-height: 1.3;
}

.mega__text {
  margin: 8px 0 12px;
  color: var(--text-2);
  font-weight: 400;
  max-width: 20em;
}

.mega__list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0 32px;
  border-top: 1px solid var(--text);
}

.mega__list a {
  display: grid;
  grid-template-columns: 48px 1fr;
  gap: 16px;
  align-items: start;
  padding: 16px 0 18px;
  border-bottom: 1px solid var(--line);
}

.mega__icon {
  display: grid;
  place-items: center;
  width: 48px;
  height: 48px;
  border-radius: var(--radius);
  background: var(--paper-2);
  color: var(--red);
  transition:
    background-color 0.35s var(--ease-out),
    color 0.35s var(--ease-out);
}

.mega__list a:hover .mega__icon,
.mega__list a:focus-visible .mega__icon {
  background: var(--red);
  color: #fff;
}

.mega__name {
  display: flex;
  align-items: baseline;
  gap: 10px;
  font-size: 1.1875rem;
  font-weight: 700;
  transition: color 0.25s var(--ease-out);
}

.mega__count {
  font-size: 0.8125rem;
  font-weight: 500;
  color: var(--text-2);
}

.mega__desc {
  display: block;
  margin-top: 2px;
  font-size: 0.875rem;
  font-weight: 400;
  color: var(--text-2);
}

.mega__list a:hover .mega__name,
.mega__list a:focus-visible .mega__name {
  color: var(--red);
}

.header__tel {
  min-height: 44px;
  padding: 0 1.125rem;
}

.header__burger {
  display: none;
  width: 44px;
  height: 44px;
  margin-left: auto;
  place-items: center;
}

.menu {
  display: none;
}

@media (max-width: 1023px) {
  .header__nav,
  .header__tel {
    display: none;
  }

  .header__burger {
    display: grid;
  }

  .menu {
    position: fixed;
    inset: var(--header-h) 0 0 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 32px;
    padding: 24px var(--gutter) calc(24px + env(safe-area-inset-bottom));
    background: var(--ink);
    color: var(--on-dark);
    overflow-y: auto;
    clip-path: inset(0 0 100% 0);
    visibility: hidden;
    transition:
      clip-path 0.6s var(--ease-out),
      visibility 0s 0.6s;
  }

  .menu.is-open {
    clip-path: inset(0);
    visibility: visible;
    transition:
      clip-path 0.6s var(--ease-out),
      visibility 0s;
  }

  .menu__link {
    display: block;
    padding: 14px 0;
    font-size: 1.5rem;
    font-weight: 800;
    border-bottom: 1px solid var(--line-dark);
    opacity: 0;
    transform: translateY(16px);
    transition:
      opacity 0.5s var(--ease-out),
      transform 0.5s var(--ease-out);
    transition-delay: calc(var(--i) * 40ms + 120ms);
  }

  .menu__sub {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0 16px;
    padding: 6px 0 10px;
    border-bottom: 1px solid var(--line-dark);
    opacity: 0;
    transition: opacity 0.5s var(--ease-out);
    transition-delay: calc(var(--i) * 40ms + 160ms);
  }

  .menu__sub a {
    display: flex;
    align-items: center;
    gap: 8px;
    min-height: 44px;
    padding-top: 10px;
    color: var(--on-dark-2);
    font-weight: 500;
  }

  .menu__sub span {
    font-size: 0.8125rem;
  }

  .menu__sub svg {
    flex: none;
    color: var(--red-on-dark);
  }

  .menu.is-open .menu__link {
    opacity: 1;
    transform: none;
  }

  .menu.is-open .menu__sub {
    opacity: 1;
  }

  .menu__tel {
    justify-content: center;
  }
}
</style>
