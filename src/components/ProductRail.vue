<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import AppIcon from './AppIcon.vue'
import ProductCard from './ProductCard.vue'

defineProps({
  products: { type: Array, required: true },
  label: { type: String, required: true },
})

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
  const card = el.querySelector('.rail__item')
  el.scrollBy({ left: dir * (card.offsetWidth + 24) * 2, behavior: 'smooth' })
}

onMounted(() => {
  update()
  window.addEventListener('resize', update)
})
onBeforeUnmount(() => window.removeEventListener('resize', update))
</script>

<template>
  <div class="wrap rail__head">
    <div><slot /></div>
    <div class="rail__ctrl" data-fade>
      <button type="button" :disabled="atStart" aria-label="上一組產品" @click="move(-1)">
        <AppIcon name="arrow-left" />
      </button>
      <button type="button" :disabled="atEnd" aria-label="下一組產品" @click="move(1)">
        <AppIcon name="arrow-right" />
      </button>
    </div>
  </div>

  <ul ref="rail" class="rail" tabindex="0" :aria-label="label" @scroll.passive="update">
    <li v-for="p in products" :key="p.slug" class="rail__item">
      <ProductCard :product="p" />
    </li>
  </ul>
</template>

<style scoped>
.rail__head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 32px;
}

.rail__ctrl {
  display: flex;
  gap: 8px;
  flex: none;
}

.rail__ctrl button {
  display: grid;
  place-items: center;
  width: 56px;
  height: 56px;
  border: 1px solid var(--text);
  border-radius: var(--radius);
  transition:
    background-color 0.25s var(--ease-out),
    color 0.25s var(--ease-out),
    border-color 0.25s var(--ease-out);
}

.rail__ctrl button:hover:not(:disabled) {
  background: var(--red);
  border-color: var(--red);
  color: #fff;
}

.rail__ctrl button:disabled {
  border-color: var(--line);
  color: #a0a0a8;
  cursor: default;
}

.rail {
  --pad: max(var(--gutter), (100vw - var(--max)) / 2);
  display: flex;
  gap: 24px;
  margin-top: clamp(32px, 4vw, 56px);
  padding-inline: var(--pad);
  scroll-padding-inline: var(--pad);
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
}

.rail::-webkit-scrollbar {
  display: none;
}

.rail__item {
  flex: none;
  width: clamp(240px, 22vw, 300px);
  scroll-snap-align: start;
}

@media (max-width: 599px) {
  .rail__ctrl {
    display: none;
  }

  .rail__item {
    width: 68vw;
  }
}
</style>
