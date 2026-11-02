<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { featured as products } from '../data/catalog'
import AppIcon from './AppIcon.vue'

const rail = ref(null)
const atStart = ref(true)
const atEnd = ref(false)

function update() {
  const el = rail.value
  if (!el) return
  atStart.value = el.scrollLeft <= 4
  atEnd.value = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4
}

function move(dir) {
  const el = rail.value
  const card = el.querySelector('.product')
  el.scrollBy({ left: dir * (card.offsetWidth + 24) * 2, behavior: 'smooth' })
}

onMounted(() => {
  update()
  window.addEventListener('resize', update)
})
onBeforeUnmount(() => window.removeEventListener('resize', update))
</script>

<template>
  <section id="products" class="section products">
    <div class="wrap products__head">
      <div>
        <h2 class="h2" data-lines>
          <span class="ln"><span>自有品牌：</span></span>
          <span class="ln"><span>立岱數位監控。</span></span>
        </h2>
        <p class="lead" data-fade>AHD 攝影機、網路攝影機與錄影主機，也提供器材批發，讓業主自行安裝。</p>
        <RouterLink class="link-arrow products__all" to="/products" data-fade>
          看全部產品
          <AppIcon name="arrow-right" :size="20" />
        </RouterLink>
      </div>
      <div class="products__ctrl" data-fade>
        <button type="button" :disabled="atStart" aria-label="上一組產品" @click="move(-1)">
          <AppIcon name="arrow-left" />
        </button>
        <button type="button" :disabled="atEnd" aria-label="下一組產品" @click="move(1)">
          <AppIcon name="arrow-right" />
        </button>
      </div>
    </div>

    <ul ref="rail" class="products__rail" data-products tabindex="0" aria-label="立岱產品" @scroll.passive="update">
      <li v-for="p in products" :key="p.slug" class="product">
        <RouterLink class="product__link" :to="{ name: 'product', params: { slug: p.slug } }">
          <figure class="product__img">
            <img :src="p.img" :alt="`立岱 ${p.model}`" width="500" height="500" loading="lazy" />
          </figure>
          <h3 class="product__model">{{ p.model }}</h3>
          <p class="product__desc">{{ p.summary }}</p>
        </RouterLink>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.products {
  overflow: hidden;
}

.products__head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 32px;
}

.products__head .lead {
  margin-top: 20px;
}

.products__all {
  margin-top: 16px;
}

.product__link {
  display: block;
}

.products__ctrl {
  display: flex;
  gap: 8px;
  flex: none;
}

.products__ctrl button {
  display: grid;
  place-items: center;
  width: 56px;
  height: 56px;
  border: 1px solid var(--text);
  border-radius: var(--radius);
  transition:
    background-color 0.25s var(--ease-out),
    color 0.25s var(--ease-out),
    border-color 0.25s var(--ease-out),
    opacity 0.25s;
}

.products__ctrl button:hover:not(:disabled) {
  background: var(--red);
  border-color: var(--red);
  color: #fff;
}

.products__ctrl button:disabled {
  border-color: var(--line);
  color: #a0a0a8;
  cursor: default;
}

.products__rail {
  --pad: max(var(--gutter), (100vw - var(--max)) / 2);
  display: flex;
  gap: 24px;
  margin-top: clamp(40px, 5vw, 64px);
  padding-inline: var(--pad);
  scroll-padding-inline: var(--pad);
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
}

.products__rail::-webkit-scrollbar {
  display: none;
}

.product {
  flex: none;
  width: clamp(240px, 22vw, 300px);
  scroll-snap-align: start;
}

.product__img {
  aspect-ratio: 1;
  background: var(--paper-2);
  border-radius: var(--radius);
  overflow: hidden;
}

.product__img img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  mix-blend-mode: multiply;
  transition: transform 0.7s var(--ease-out);
}

.product:hover .product__img img {
  transform: scale(1.06);
}

.product__model {
  margin-top: 18px;
  font-size: 1.375rem;
  font-weight: 700;
  line-height: 1.4;
  letter-spacing: 0.01em;
}

.product__desc {
  margin-top: 4px;
  font-size: 0.9375rem;
  line-height: 1.65;
  color: var(--text-2);
}

@media (max-width: 599px) {
  .products__ctrl {
    display: none;
  }

  .product {
    width: 68vw;
  }
}
</style>
