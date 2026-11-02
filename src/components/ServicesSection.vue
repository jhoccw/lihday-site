<script setup>
import { services } from '../data'
import AppIcon from './AppIcon.vue'
</script>

<template>
  <section id="services" class="section services">
    <div class="wrap services__in">
      <header class="services__head">
        <h2 class="h2" data-lines>
          <span class="ln"><span>九項服務，</span></span>
          <span class="ln"><span>同一個團隊。</span></span>
        </h2>
        <p class="lead" data-fade>
          從監視、門禁、對講到弱電保養，德運把現場需要的系統一次整合，不必分頭找不同的廠商。
        </p>
      </header>

      <ul class="services__grid" data-services>
        <li v-for="s in services" :key="s.name" class="service">
          <span class="service__icon"><AppIcon :name="s.icon" :size="28" /></span>
          <h3 class="service__name">{{ s.name }}</h3>
          <p class="service__desc">{{ s.desc }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.services__in {
  display: grid;
  gap: clamp(40px, 5vw, 72px);
}

.services__head {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px clamp(32px, 6vw, 96px);
  align-items: end;
}

.services__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  border-top: 1px solid var(--text);
}

.service {
  position: relative;
  padding: 32px 32px 36px 0;
  border-bottom: 1px solid var(--line);
}

.service:not(:nth-child(3n + 1)) {
  padding-left: 32px;
  border-left: 1px solid var(--line);
}

.service__icon {
  display: grid;
  place-items: center;
  width: 52px;
  height: 52px;
  border-radius: var(--radius);
  background: var(--paper-2);
  color: var(--red);
  transition:
    background-color 0.35s var(--ease-out),
    color 0.35s var(--ease-out);
}

.service:hover .service__icon {
  background: var(--red);
  color: #fff;
}

.service__name {
  margin-top: 22px;
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 1.4;
}

.service__desc {
  margin-top: 8px;
  color: var(--text-2);
  font-size: 0.9375rem;
  max-width: 24em;
}

@media (max-width: 899px) {
  .services__head {
    grid-template-columns: 1fr;
  }

  .services__grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .service:not(:nth-child(3n + 1)) {
    padding-left: 0;
    border-left: 0;
  }

  .service:nth-child(even) {
    padding-left: 24px;
    border-left: 1px solid var(--line);
  }

  .service {
    padding: 24px 24px 28px 0;
  }
}

@media (max-width: 559px) {
  .services__grid {
    grid-template-columns: 1fr;
  }

  .service,
  .service:nth-child(even) {
    display: grid;
    grid-template-columns: 52px 1fr;
    column-gap: 16px;
    padding: 20px 0;
    border-left: 0;
  }

  .service__icon {
    grid-row: span 2;
  }

  .service__name {
    margin-top: 0;
    font-size: 1.125rem;
  }

  .service__desc {
    margin-top: 2px;
  }
}
</style>
