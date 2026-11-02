<script setup>
import { company } from '../data'
import AppIcon from './AppIcon.vue'

const digits = company.tel.split('')
</script>

<template>
  <section id="contact" class="section contact on-red">
    <div class="wrap">
      <h2 class="h2" data-lines>
        <span class="ln"><span>先打一通電話，</span></span>
        <span class="ln"><span>由專人為您規劃。</span></span>
      </h2>

      <a class="contact__tel" :href="company.telHref" :aria-label="`撥打 ${company.tel}`" data-tel>
        <span class="contact__digits" aria-hidden="true">
          <span v-for="(d, i) in digits" :key="i" class="digit" :class="{ 'digit--sep': d === '-' }">{{ d }}</span>
        </span>
        <span class="contact__go" aria-hidden="true"><AppIcon name="phone" :size="32" /></span>
      </a>

      <dl class="contact__info" data-contact-info>
        <div>
          <dt>營業時間</dt>
          <dd>{{ company.hours[0] }}<br />{{ company.hours[1] }}、{{ company.hours[2] }}</dd>
        </div>
        <div>
          <dt>地址與展示間</dt>
          <dd>
            {{ company.address }}<br />
            <a class="contact__link" :href="company.mapHref" target="_blank" rel="noopener">
              在 Google 地圖開啟
              <AppIcon name="arrow-up-right" :size="18" />
            </a>
          </dd>
        </div>
        <div>
          <dt>Email</dt>
          <dd>
            <a class="contact__link" :href="`mailto:${company.email}`">{{ company.email }}</a>
          </dd>
        </div>
        <div>
          <dt>傳真</dt>
          <dd>{{ company.fax }}</dd>
        </div>
      </dl>
    </div>
  </section>
</template>

<style scoped>
.contact {
  background: var(--red);
  color: #fff;
}

.contact__tel {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  margin-top: clamp(32px, 4vw, 56px);
  padding-block: clamp(12px, 2vw, 24px);
  border-block: 1px solid rgba(255, 255, 255, 0.45);
}

.contact__digits {
  display: flex;
  overflow: hidden;
  font-size: clamp(2.5rem, 9.6vw, 6rem);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -0.01em;
}

.digit {
  display: block;
}

.digit--sep {
  padding-inline: 0.08em;
}

.contact__go {
  display: grid;
  place-items: center;
  flex: none;
  width: clamp(56px, 7vw, 96px);
  height: clamp(56px, 7vw, 96px);
  border-radius: 50%;
  background: #fff;
  color: var(--red);
  transition:
    transform 0.5s var(--ease-out),
    background-color 0.3s var(--ease-out),
    color 0.3s var(--ease-out);
}

.contact__tel:hover .contact__go {
  transform: scale(1.08) rotate(-12deg);
  background: var(--ink);
  color: #fff;
}

.contact__info {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
  margin-top: clamp(32px, 4vw, 56px);
}

.contact__info dt {
  font-size: 0.875rem;
  color: #ffd9dd;
}

.contact__info dd {
  margin-top: 6px;
  font-weight: 500;
  line-height: 1.75;
}

.contact__link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  min-height: 32px;
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 5px;
  overflow-wrap: anywhere;
}

.contact__link:hover {
  text-decoration-thickness: 2px;
}

@media (max-width: 899px) {
  .contact__info {
    grid-template-columns: 1fr 1fr;
  }
}

@media (max-width: 479px) {
  .contact__info {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .contact__go {
    display: none;
  }
}
</style>
