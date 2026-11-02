<script setup>
import AppIcon from './AppIcon.vue'

defineProps({ product: { type: Object, required: true } })
</script>

<template>
  <RouterLink class="card" :to="{ name: 'product', params: { slug: product.slug } }" data-card>
    <figure class="card__img">
      <img v-if="product.img" :src="product.img" :alt="product.model" width="500" height="500" loading="lazy" />
      <span v-else class="card__noimg">圖片準備中</span>
      <span class="card__cover" aria-hidden="true">
        <span class="card__cta">
          {{ product.specs.length ? '查看規格' : '查看產品' }}
          <AppIcon name="arrow-up-right" :size="22" />
        </span>
      </span>
    </figure>
    <h3 class="card__model">{{ product.model }}</h3>
    <p class="card__desc">{{ product.summary }}</p>
  </RouterLink>
</template>

<style scoped>
.card {
  display: block;
}

.card__img {
  position: relative;
  display: grid;
  place-items: center;
  aspect-ratio: 1;
  background: var(--paper-2);
  border-radius: var(--radius);
  overflow: hidden;
}

.card__img img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  mix-blend-mode: multiply;
  transition: transform 0.7s var(--ease-out);
}

.card:hover .card__img img {
  transform: scale(1.06);
}

.card__cover {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  background: rgba(195, 13, 35, 0.82);
  color: #fff;
  opacity: 0;
  transition: opacity 0.4s var(--ease-out);
}

.card__cta {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 1.125rem;
  font-weight: 700;
  transform: translateY(12px);
  transition: transform 0.5s var(--ease-out);
}

.card__cta svg {
  transform: translate(-6px, 6px);
  transition: transform 0.5s var(--ease-out) 0.05s;
}

.card:focus-visible .card__cover {
  opacity: 1;
}

.card:focus-visible .card__cta,
.card:focus-visible .card__cta svg {
  transform: none;
}

@media (hover: hover) {
  .card:hover .card__cover {
    opacity: 1;
  }

  .card:hover .card__cta,
  .card:hover .card__cta svg {
    transform: none;
  }
}

.card__noimg {
  font-size: 0.875rem;
  color: var(--text-2);
}

.card__model {
  display: inline-block;
  margin-top: 16px;
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.4;
  letter-spacing: 0.01em;
  background: linear-gradient(var(--red), var(--red)) 0 100% / 0 2px no-repeat;
  transition: background-size 0.45s var(--ease-out);
}

.card:hover .card__model,
.card:focus-visible .card__model {
  background-size: 100% 2px;
}

.card__desc {
  margin-top: 4px;
  font-size: 0.9375rem;
  line-height: 1.65;
  color: var(--text-2);
}
</style>
