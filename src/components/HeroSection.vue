<script setup>
import { company } from '../data'
import AppIcon from './AppIcon.vue'
import LensVisual from './LensVisual.vue'
</script>

<template>
  <section id="top" class="hero on-dark" data-hero>
    <div class="hero__lens" data-lens aria-hidden="true">
      <LensVisual />
    </div>

    <div class="wrap hero__in">
      <div class="hero__copy">
        <h1 class="hero__title">
          <span class="ln"><span>監視系統，</span></span>
          <span class="ln"><span>從規劃到維護，</span></span>
          <span class="ln"><span>一家<em>負責到底</em>。</span></span>
        </h1>
        <p class="lead hero__lead" data-hero-fade>
          <span class="ph">德運實業</span><span class="ph">自 1986 年</span><span class="ph">創立於桃園，</span><span class="ph">為銀行、</span><span class="ph">校園、</span><span class="ph">醫院、</span><span class="ph">零售</span><span class="ph">與道路</span><span class="ph">等場域，</span><span class="ph">提供</span><span class="ph">監視與</span><span class="ph">安防系統的</span><span class="ph">規劃、</span><span class="ph">施工</span><span class="ph">與維護。</span>
        </p>
        <div class="hero__actions" data-hero-fade>
          <a class="btn btn--red" :href="company.telHref">
            <AppIcon name="phone" :size="22" />
            來電洽詢
            <span class="btn__num">{{ company.tel }}</span>
          </a>
          <RouterLink class="link-arrow" :to="{ path: '/', hash: '#solutions' }">
            看解決方案
            <AppIcon name="arrow-right" :size="20" />
          </RouterLink>
        </div>
      </div>

      <dl class="hero__facts">
        <div data-hero-fade>
          <dt>創立</dt>
          <dd>自 1986 年，桃園</dd>
        </div>
        <div data-hero-fade>
          <dt>服務方式</dt>
          <dd><span class="ph">規劃、施工、維護</span><span class="ph">一條龍</span></dd>
        </div>
        <div data-hero-fade>
          <dt>服務範圍</dt>
          <dd>北、中、南</dd>
        </div>
        <div data-hero-fade>
          <dt>營業時間（週一至週五）</dt>
          <dd><span class="ph">9:00–12:00、</span><span class="ph">13:40–17:00</span></dd>
        </div>
      </dl>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  margin-top: var(--header-h);
  min-height: calc(100svh - var(--header-h));
  overflow: hidden;
  isolation: isolate;
  background:
    radial-gradient(60% 70% at 82% 46%, #3a0810 0%, rgba(58, 8, 16, 0) 70%),
    var(--ink);
}

.hero__in {
  position: relative;
  z-index: 1;
  min-height: inherit;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 48px;
  padding-top: clamp(48px, 9vh, 112px);
}

.hero__copy {
  max-width: 46rem;
}

.hero__title {
  font-size: clamp(2.375rem, 5.2vw + 0.5rem, 5rem);
  font-weight: 900;
  line-height: 1.18;
  letter-spacing: -0.01em;
}

.hero__title em {
  font-style: normal;
  color: var(--red-on-dark);
}

.hero__lead {
  margin-top: clamp(20px, 2.4vw, 32px);
  max-width: 30em;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 16px 32px;
  margin-top: clamp(28px, 3vw, 44px);
}

.hero__lens {
  position: absolute;
  z-index: 0;
  top: 47%;
  right: -7vw;
  width: min(61vw, 880px);
  translate: 0 -50%;
  will-change: transform;
}

.hero__facts {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border-top: 1px solid var(--line-dark);
  background: var(--ink);
  box-shadow: 0 0 0 100vmax var(--ink);
  clip-path: inset(-1px -100vmax 0);
}

.hero__facts > div {
  padding: 22px 24px 26px 0;
}

.hero__facts > div + div {
  padding-left: 24px;
  border-left: 1px solid var(--line-dark);
}

.hero__facts dt {
  font-size: 0.8125rem;
  color: var(--on-dark-2);
}

.hero__facts dd {
  font-weight: 700;
  font-size: clamp(0.9375rem, 0.3vw + 0.875rem, 1.0625rem);
}

@media (max-width: 899px) {
  .hero__in {
    gap: 0;
  }

  .hero__lens {
    position: relative;
    top: auto;
    right: auto;
    translate: none;
    width: min(92vw, 460px);
    margin: 28px -18vw -34vw auto;
    order: 2;
  }

  .hero {
    display: flex;
    flex-direction: column;
  }

  .hero__in {
    display: contents;
  }

  .hero__copy {
    order: 1;
    padding: clamp(40px, 7vh, 72px) var(--gutter) 0;
  }

  .hero__facts {
    order: 3;
    position: relative;
    z-index: 1;
    padding-inline: var(--gutter);
  }

  .hero {
    background:
      radial-gradient(90% 40% at 90% 92%, #3a0810 0%, rgba(58, 8, 16, 0) 70%),
      var(--ink);
  }

  .hero__facts {
    grid-template-columns: 1fr 1fr;
    box-shadow: none;
    clip-path: none;
  }

  .hero__facts > div,
  .hero__facts > div + div {
    padding: 16px 12px 18px 0;
    border-left: 0;
  }

  .hero__facts > div:nth-child(n + 3) {
    border-top: 1px solid var(--line-dark);
  }

}
</style>
