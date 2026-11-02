<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vue-router'
import { company } from '../data'
import { categoryById, findProduct, productsIn } from '../data/catalog'
import { pageMotion } from '../motion'
import { whenRevealed } from '../loader'
import AppIcon from '../components/AppIcon.vue'
import ProductRail from '../components/ProductRail.vue'
import ContactSection from '../components/ContactSection.vue'
import NotFoundPage from './NotFoundPage.vue'

const route = useRoute()
const root = ref(null)

const product = computed(() => findProduct(route.params.slug))
const category = computed(() => (product.value ? categoryById[product.value.category] : null))
const siblings = computed(() => (product.value ? productsIn(product.value.category) : []))
// The model row repeats the page title, so the table starts after it.
// The old tables mark merged cells with #colspan# / #rowspan#; rebuild real spans,
// and let a value followed only by empty cells run to the end of its row.
const table = computed(() => {
  const rows = (product.value?.specs || []).filter((r) => !['產品型號', '型號'].includes(r[0]))
  const out = []
  rows.forEach((row, i) => {
    const cells = []
    row.forEach((text, j) => {
      if (text === '#colspan#') {
        const last = cells[cells.length - 1]
        if (last) last.colspan++
      } else if (text === '#rowspan#') {
        for (let k = i - 1; k >= 0; k--) {
          const up = out[k].find((c) => c.col === j)
          if (up) {
            up.rowspan++
            break
          }
        }
      } else {
        cells.push({ text, col: j, colspan: 1, rowspan: 1 })
      }
    })
    let spare = 0
    while (cells.length > 2 && cells[cells.length - 1].text === '') spare += cells.pop().colspan
    cells[cells.length - 1].colspan += spare
    out.push(cells)
  })
  return out
})
const wide = computed(() => table.value.some((r) => r.length > 2))

// Every other product in the category, the same series first.
const related = computed(() => {
  const p = product.value
  if (!p) return []
  const others = siblings.value.filter((s) => s !== p)
  return [...others.filter((s) => s.group === p.group), ...others.filter((s) => s.group !== p.group)]
})

let dispose
let alive = true

onMounted(() => {
  if (!product.value) return
  document.title = `${product.value.model}｜${category.value.name}｜德運實業 LIHDAY`
  whenRevealed().then(() => {
    if (alive) dispose = pageMotion(root.value)
  })
})

onBeforeUnmount(() => {
  alive = false
  dispose?.()
})
</script>

<template>
  <NotFoundPage v-if="!product" />
  <main v-else id="main" ref="root">
    <section class="top">
      <div class="wrap">
        <nav class="crumbs" aria-label="麵包屑">
          <RouterLink to="/">首頁</RouterLink>
          <span aria-hidden="true">/</span>
          <RouterLink to="/products">產品</RouterLink>
          <span aria-hidden="true">/</span>
          <RouterLink :to="{ name: 'category', params: { category: category.id } }">{{ category.name }}</RouterLink>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{{ product.model }}</span>
        </nav>

        <div class="top__grid">
          <figure class="shot" data-reveal-img>
            <img v-if="product.img" :src="product.img" :alt="product.model" width="500" height="500" />
            <span v-else class="shot__none">圖片準備中</span>
          </figure>

          <div class="info">
            <h1 class="info__model" data-lines>
              <span class="ln"><span>{{ product.model }}</span></span>
            </h1>
            <p class="info__summary" data-fade>{{ product.summary }}</p>
            <p class="info__meta" data-fade>
              {{ category.name }}<template v-if="product.group">・{{ product.group }}</template>
            </p>

            <ul v-if="product.features.length > 1" class="feats" data-fade>
              <li v-for="f in product.features.slice(1)" :key="f">
                <AppIcon name="check" :size="20" />
                <span>{{ f }}</span>
              </li>
            </ul>
            <p v-else-if="!product.features.length" class="info__note" data-fade>
              這項產品的完整介紹與規格收錄在原廠型錄中，請下載型錄，或直接來電洽詢。
            </p>

            <div class="actions" data-fade>
              <a class="btn btn--red" :href="company.telHref">
                <AppIcon name="phone" :size="22" />
                來電洽詢
                <span class="btn__num">{{ company.tel }}</span>
              </a>
              <a v-if="product.pdf" class="btn btn--line" :href="product.pdf" target="_blank" rel="noopener">
                <AppIcon name="download" :size="22" />
                下載完整型錄（PDF）
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section v-if="table.length" class="section specs">
      <div class="wrap specs__in">
        <h2 class="h2" data-lines>
          <span class="ln"><span>詳細規格</span></span>
        </h2>
        <div class="specs__scroll" :class="{ 'is-wide': wide }" tabindex="0" role="region" :aria-label="`${product.model} 詳細規格`" data-fade>
          <table>
            <tbody>
              <tr v-for="(row, i) in table" :key="i">
                <component
                  :is="cell.col === 0 ? 'th' : 'td'"
                  v-for="cell in row"
                  :key="cell.col"
                  :scope="cell.col === 0 ? 'row' : undefined"
                  :colspan="cell.colspan > 1 ? cell.colspan : undefined"
                  :rowspan="cell.rowspan > 1 ? cell.rowspan : undefined"
                >
                  {{ cell.text }}
                </component>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <section v-if="related.length" class="section related">
      <ProductRail :products="related" :label="`其他${category.name}`">
        <h2 class="h2" data-lines>
          <span class="ln"><span>同類產品</span></span>
        </h2>
      </ProductRail>
    </section>

    <ContactSection />
  </main>
</template>

<style scoped>
.top {
  margin-top: var(--header-h);
  padding-block: clamp(24px, 3vw, 40px) var(--section);
}

.crumbs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 0.875rem;
  color: var(--text-2);
}

.crumbs a:hover {
  color: var(--text);
  text-decoration: underline;
  text-underline-offset: 4px;
}

.crumbs [aria-current] {
  color: var(--text);
}

.top__grid {
  display: grid;
  grid-template-columns: 6fr 6fr;
  gap: clamp(32px, 6vw, 96px);
  align-items: start;
  margin-top: clamp(24px, 3vw, 40px);
}

.shot {
  position: sticky;
  top: calc(var(--header-h) + 24px);
  display: grid;
  place-items: center;
  aspect-ratio: 1;
  background: var(--paper-2);
  border-radius: var(--radius);
  overflow: hidden;
}

.shot img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  mix-blend-mode: multiply;
}

.shot__none {
  color: var(--text-2);
}

.info__model {
  font-size: clamp(2.25rem, 3.6vw + 1rem, 4.5rem);
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.01em;
  overflow-wrap: anywhere;
}

.info__summary {
  margin-top: 16px;
  font-size: clamp(1.125rem, 0.6vw + 1rem, 1.375rem);
  font-weight: 700;
  line-height: 1.6;
}

.info__meta {
  margin-top: 6px;
  color: var(--text-2);
  font-size: 0.9375rem;
}

.info__note {
  margin-top: 28px;
  color: var(--text-2);
  max-width: 30em;
}

.feats {
  margin-top: 28px;
  border-top: 1px solid var(--text);
}

.feats li {
  display: flex;
  gap: 12px;
  padding: 13px 0;
  border-bottom: 1px solid var(--line);
  line-height: 1.7;
}

.feats svg {
  flex: none;
  margin-top: 4px;
  color: var(--red);
}

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 32px;
}

.btn--line {
  border: 1px solid var(--text);
}

.btn--line:hover {
  background: var(--ink);
  color: #fff;
}

.specs {
  background: var(--paper-2);
}

.specs__in {
  display: grid;
  grid-template-columns: 3fr 9fr;
  gap: 32px clamp(32px, 6vw, 96px);
  align-items: start;
}

.specs__scroll {
  overflow-x: auto;
  border-top: 1px solid var(--text);
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9375rem;
  line-height: 1.7;
}

.is-wide table {
  min-width: 720px;
  table-layout: fixed;
}

th,
td {
  padding: 13px 16px 13px 0;
  border-bottom: 1px solid var(--line);
  text-align: left;
  vertical-align: top;
}

th {
  width: 30%;
  min-width: 8em;
  font-weight: 700;
}

.is-wide th {
  width: 22%;
}

.is-wide td:not(:last-child) {
  padding-right: 24px;
}

tr {
  transition: background-color 0.2s;
}

tr:hover {
  background: #ebebed;
}

.related {
  overflow: hidden;
}

@media (max-width: 899px) {
  .top__grid,
  .specs__in {
    grid-template-columns: 1fr;
  }

  .shot {
    position: static;
    max-width: 480px;
  }
}

@media (max-width: 767px) {
  /* the fixed call bar already carries this action on phones */
  .actions .btn--red {
    display: none;
  }
}

@media (max-width: 599px) {
  .actions .btn {
    width: 100%;
    justify-content: center;
  }

  th {
    width: 38%;
  }
}
</style>
