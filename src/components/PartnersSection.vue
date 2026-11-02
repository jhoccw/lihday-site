<script setup>
import { brands, clients } from '../data'
</script>

<template>
  <section id="partners" class="section partners">
    <div class="wrap">
      <h2 class="h2" data-lines>
        <span class="ln"><span>經銷的品牌，</span></span>
        <span class="ln"><span>與服務過的客戶。</span></span>
      </h2>
    </div>

    <div class="wrap partners__block">
      <h3 class="partners__label" data-fade>經銷品牌</h3>
      <ul class="logos" data-clients>
        <li v-for="b in brands" :key="b.name">
          <img :src="b.img" :alt="b.name" width="480" height="240" loading="lazy" />
        </li>
      </ul>
    </div>

    <div class="partners__block">
      <div class="wrap">
        <h3 class="partners__label" data-fade>服務客戶</h3>
      </div>
      <!-- few clients, so each track repeats the list to fill the width before looping -->
      <div class="marquee" data-fade>
        <ul v-for="n in 2" :key="n" class="marquee__track" :aria-hidden="n === 2 ? 'true' : undefined">
          <template v-for="r in 2" :key="r">
            <li v-for="c in clients" :key="c.name" :class="{ 'is-repeat': r === 2 }" :aria-hidden="n === 1 && r === 2 ? 'true' : undefined">
              <img :src="c.img" :alt="n === 1 && r === 1 ? c.name : ''" width="400" height="300" loading="lazy" />
            </li>
          </template>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.partners {
  border-top: 1px solid var(--line);
}

.partners__block {
  margin-top: clamp(40px, 5vw, 72px);
}

.partners__label {
  font-size: 1.0625rem;
  font-weight: 700;
  padding-bottom: 14px;
  border-bottom: 1px solid var(--text);
}

.marquee {
  display: flex;
  overflow: hidden;
  border-bottom: 1px solid var(--line);
  mask-image: linear-gradient(to right, transparent, #000 8%, #000 92%, transparent);
}

.marquee__track {
  display: flex;
  flex: none;
  animation: marquee 56s linear infinite;
}

.marquee:hover .marquee__track {
  animation-play-state: paused;
}

.marquee__track li {
  flex: none;
  width: clamp(160px, 16vw, 230px);
  padding: 12px clamp(12px, 1.6vw, 24px);
}

.marquee__track img {
  width: 100%;
  height: auto;
}

@keyframes marquee {
  to {
    transform: translateX(-100%);
  }
}

.logos {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
}

.logos li {
  display: grid;
  place-items: center;
  padding: 20px clamp(12px, 2vw, 32px);
  border-bottom: 1px solid var(--line);
}

.logos li:not(:nth-child(5n + 1)) {
  border-left: 1px solid var(--line);
}

.logos img {
  width: 100%;
  max-width: 140px;
  height: auto;
  filter: grayscale(1) contrast(1.1);
  opacity: 0.72;
}

@media (max-width: 899px) {
  .logos {
    grid-template-columns: repeat(3, 1fr);
  }

  .logos li:not(:nth-child(5n + 1)) {
    border-left: 0;
  }

  .logos li:not(:nth-child(3n + 1)) {
    border-left: 1px solid var(--line);
  }
}

@media (max-width: 479px) {
  .logos {
    grid-template-columns: repeat(2, 1fr);
  }

  .logos li:not(:nth-child(3n + 1)) {
    border-left: 0;
  }

  .logos li:nth-child(even) {
    border-left: 1px solid var(--line);
  }
}

@media (prefers-reduced-motion: reduce) {
  .marquee {
    mask-image: none;
  }

  .marquee__track {
    animation: none;
    flex-wrap: wrap;
    flex: 1;
  }

  .marquee__track[aria-hidden],
  .marquee__track .is-repeat {
    display: none;
  }
}
</style>
