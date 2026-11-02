<script setup>
import { ref, computed, watch, onMounted, onBeforeUnmount, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { categories, categoryById, products, productsIn, groupsIn } from '../data/catalog'
import { pageMotion, gridReveals, refreshMotion } from '../motion'
import { whenRevealed } from '../loader'
import AppIcon from '../components/AppIcon.vue'
import ProductCard from '../components/ProductCard.vue'
import ContactSection from '../components/ContactSection.vue'

const route = useRoute()
const root = ref(null)
const query = ref('')

const active = computed(() => categoryById[route.params.category] || null)
const tabs = [{ id: null, name: '全部', count: products.length }, ...categories.map((c) => ({ ...c, count: productsIn(c.id).length }))]

const sections = computed(() => {
  const q = query.value.trim().toLowerCase()
  const match = (p) => !q || p.model.toLowerCase().includes(q) || p.summary.toLowerCase().includes(q)
  return (active.value ? [active.value] : categories)
    .map((c) => ({ ...c, groups: groupsIn(productsIn(c.id).filter(match)) }))
    .filter((c) => c.groups.length)
})

const total = computed(() => sections.value.reduce((n, s) => n + s.groups.reduce((m, g) => m + g.items.length, 0), 0))

let dispose
let alive = true

function setTitle() {
  document.title = `${active.value ? active.value.name : '產品'}｜德運實業 LIHDAY`
}

onMounted(() => {
  setTitle()
  whenRevealed().then(() => {
    if (alive) dispose = pageMotion(root.value)
  })
})

// Filtering swaps the cards: let the new ones enter and re-measure the page.
watch([sections, active], async () => {
  setTitle()
  await nextTick()
  refreshMotion()
  gridReveals(root.value)
})

onBeforeUnmount(() => {
  alive = false
  dispose?.()
})
</script>

<template>
  <main id="main" ref="root">
    <section class="band on-dark">
      <div class="wrap">
        <nav class="crumbs" aria-label="麵包屑">
          <RouterLink to="/">首頁</RouterLink>
          <span aria-hidden="true">/</span>
          <RouterLink v-if="active" to="/products">產品</RouterLink>
          <span v-else aria-current="page">產品</span>
          <template v-if="active">
            <span aria-hidden="true">/</span>
            <span aria-current="page">{{ active.name }}</span>
          </template>
        </nav>

        <h1 class="band__title" data-lines>
          <span class="ln"><span>{{ active ? active.name : '產品' }}</span></span>
        </h1>
        <p class="lead" data-fade>
          {{ active ? active.desc : '立岱數位監控的攝影機與錄影主機，以及德運經銷的影像對講系統。每項產品都附完整規格。' }}
        </p>

        <div class="filter" data-fade>
          <nav class="tabs" aria-label="產品分類">
            <RouterLink
              v-for="t in tabs"
              :key="t.name"
              class="tabs__item"
              :class="{ 'is-active': (active?.id ?? null) === t.id }"
              :to="t.id ? { name: 'category', params: { category: t.id } } : { name: 'products' }"
              :aria-current="(active?.id ?? null) === t.id ? 'page' : undefined"
            >
              {{ t.name }}<span>{{ t.count }}</span>
            </RouterLink>
          </nav>
          <label class="search">
            <span class="sr-only">搜尋型號</span>
            <AppIcon name="search" :size="20" />
            <input v-model="query" type="search" placeholder="搜尋型號，例如 LD-209" autocomplete="off" />
          </label>
        </div>
      </div>
    </section>

    <section class="section list">
      <div class="wrap">
        <p class="list__count" aria-live="polite">共 {{ total }} 項產品</p>

        <div v-for="s in sections" :key="s.id" class="cat">
          <header v-if="!active" class="cat__head">
            <h2 class="cat__name">{{ s.name }}</h2>
          </header>

          <div v-for="g in s.groups" :key="g.name" class="group">
            <h3 v-if="g.name" class="group__name">{{ g.name }}</h3>
            <div class="grid">
              <ProductCard v-for="p in g.items" :key="p.slug" :product="p" />
            </div>
          </div>
        </div>

        <div v-if="!total" class="empty">
          <p class="empty__title">找不到符合「{{ query }}」的產品。</p>
          <p>請確認型號，或清除搜尋條件再看一次。也可以直接來電，由專人協助。</p>
          <button class="link-arrow" type="button" @click="query = ''">清除搜尋</button>
        </div>
      </div>
    </section>

    <ContactSection />
  </main>
</template>

<style scoped>
.band {
  margin-top: var(--header-h);
  padding-block: clamp(28px, 4vw, 48px) 0;
}

.crumbs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 0.875rem;
  color: var(--on-dark-2);
}

.crumbs a:hover {
  color: var(--on-dark);
  text-decoration: underline;
  text-underline-offset: 4px;
}

.crumbs [aria-current] {
  color: var(--on-dark);
}

.band__title {
  margin-top: clamp(28px, 4vw, 56px);
  font-size: clamp(2.5rem, 4.4vw + 1rem, 5rem);
  font-weight: 900;
  line-height: 1.2;
}

.band .lead {
  margin-top: 16px;
}

.filter {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px 32px;
  margin-top: clamp(32px, 4vw, 56px);
  border-bottom: 1px solid var(--line-dark);
}

.tabs {
  display: flex;
  gap: clamp(16px, 2.4vw, 36px);
  overflow-x: auto;
  scrollbar-width: none;
}

.tabs__item {
  position: relative;
  display: flex;
  align-items: baseline;
  gap: 8px;
  flex: none;
  min-height: 56px;
  padding-top: 14px;
  font-size: 1.0625rem;
  font-weight: 700;
  color: var(--on-dark-2);
  transition: color 0.3s var(--ease-out);
}

.tabs__item span {
  font-size: 0.8125rem;
  font-weight: 500;
}

.tabs__item::after {
  content: '';
  position: absolute;
  inset: auto 0 0 0;
  height: 3px;
  background: var(--red-on-dark);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.5s var(--ease-out);
}

.tabs__item:hover,
.tabs__item.is-active {
  color: var(--on-dark);
}

.tabs__item.is-active::after {
  transform: scaleX(1);
}

.search {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 0 1 300px;
  min-height: 48px;
  margin-bottom: 8px;
  padding-inline: 14px;
  border: 1px solid var(--line-dark);
  border-radius: var(--radius);
  color: var(--on-dark-2);
  transition: border-color 0.25s var(--ease-out);
}

.search:focus-within {
  border-color: var(--on-dark);
  color: var(--on-dark);
}

.search input {
  flex: 1;
  min-width: 0;
  height: 46px;
  background: none;
  border: 0;
  outline: 0;
  font: inherit;
  letter-spacing: inherit;
  color: var(--on-dark);
  caret-color: var(--red-on-dark);
}

.search input::placeholder {
  color: var(--on-dark-2);
}

.list {
  padding-top: clamp(32px, 4vw, 56px);
}

.list__count {
  font-size: 0.9375rem;
  color: var(--text-2);
}

.cat {
  margin-top: clamp(24px, 3vw, 40px);
}

.cat + .cat {
  margin-top: clamp(64px, 8vw, 112px);
}

.cat__head {
  padding-bottom: 12px;
  border-bottom: 1px solid var(--text);
}

.cat__name {
  font-size: clamp(1.75rem, 2vw + 1rem, 2.75rem);
  font-weight: 800;
  line-height: 1.3;
}

.group {
  margin-top: clamp(28px, 3vw, 44px);
}

.group + .group {
  margin-top: clamp(48px, 5vw, 72px);
}

.group__name {
  font-size: 1.125rem;
  font-weight: 700;
  padding-bottom: 12px;
  margin-bottom: 24px;
  border-bottom: 1px solid var(--line);
}

.grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: clamp(32px, 4vw, 48px) 24px;
}

.empty {
  max-width: 34em;
  padding-block: 48px;
  color: var(--text-2);
}

.empty__title {
  margin-bottom: 8px;
  font-size: 1.375rem;
  font-weight: 700;
  color: var(--text);
}

.empty button {
  margin-top: 16px;
  color: var(--text);
}

@media (max-width: 1023px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 767px) {
  .filter {
    flex-direction: column-reverse;
    align-items: stretch;
    border-bottom: 0;
  }

  .tabs {
    margin-inline: calc(var(--gutter) * -1);
    padding-inline: var(--gutter);
    border-bottom: 1px solid var(--line-dark);
  }

  .search {
    flex: none;
    margin-bottom: 0;
  }

  .grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 32px 16px;
  }
}
</style>
