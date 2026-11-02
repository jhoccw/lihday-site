<script setup>
import { ref, computed } from 'vue'
import { solutions } from '../data'
import AppIcon from './AppIcon.vue'

const active = ref(0)
const current = computed(() => solutions[active.value])
const tabs = ref([])

function onKey(e) {
  const dir = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key]
  if (!dir) return
  e.preventDefault()
  active.value = (active.value + dir + solutions.length) % solutions.length
  tabs.value[active.value]?.focus()
}
</script>

<template>
  <section id="solutions" class="section solutions on-dark">
    <div class="solutions__bg" aria-hidden="true">
      <img v-for="(s, i) in solutions" :key="s.id" :class="{ 'is-active': i === active }" :src="s.img" alt="" loading="lazy" decoding="async" />
    </div>

    <div class="wrap solutions__wrap">
      <header class="solutions__head">
        <h2 class="h2" data-lines>
          <span class="ln"><span>每一種場域，</span></span>
          <span class="ln"><span>都有自己的風險。</span></span>
        </h2>
        <p class="lead" data-fade>德運依場域的營運方式配置設備與系統，而不是把同一套方案搬到每個現場。</p>
      </header>

      <div class="solutions__body" data-fade>
        <div class="solutions__tabs" role="tablist" aria-label="場域" aria-orientation="vertical" @keydown="onKey">
          <button
            v-for="(s, i) in solutions"
            :id="`tab-${s.id}`"
            :key="s.id"
            :ref="(el) => (tabs[i] = el)"
            class="tab"
            :class="{ 'is-active': i === active }"
            role="tab"
            type="button"
            :aria-selected="i === active"
            :aria-controls="`panel-${s.id}`"
            :tabindex="i === active ? 0 : -1"
            @click="active = i"
          >
            <span class="tab__name">{{ s.name }}</span>
            <AppIcon class="tab__arrow" name="arrow-right" :size="24" />
          </button>
        </div>

        <div class="solutions__stage">
          <Transition name="panel" mode="out-in">
            <div :id="`panel-${current.id}`" :key="current.id" class="panel" role="tabpanel" :aria-labelledby="`tab-${current.id}`" tabindex="0">
              <h3 class="panel__title"><span v-for="(ph, i) in current.title.split('|')" :key="i" class="ph">{{ ph }}</span></h3>
              <p class="panel__body">{{ current.body }}</p>
              <ul class="panel__points">
                <li v-for="p in current.points" :key="p">
                  <AppIcon name="check" :size="20" />
                  {{ p }}
                </li>
              </ul>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.solutions {
  position: relative;
  overflow: hidden;
  isolation: isolate;
}

.solutions__wrap {
  position: relative;
  z-index: 1;
}

.solutions__bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.solutions__bg img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(1) contrast(1.1);
  opacity: 0;
  transform: scale(1.08);
  transition:
    opacity 0.9s var(--ease-out),
    transform 1.6s var(--ease-out);
}

.solutions__bg img.is-active {
  opacity: 0.3;
  transform: none;
}

/* keeps the copy on near-solid ink and lets the photo show toward the right */
.solutions__bg::after {
  content: '';
  position: absolute;
  inset: 0;
  background:
    linear-gradient(to right, rgba(11, 11, 12, 0.92) 0%, rgba(11, 11, 12, 0.55) 55%, rgba(11, 11, 12, 0.25) 100%),
    linear-gradient(to bottom, var(--ink) 0%, rgba(11, 11, 12, 0) 22%, rgba(11, 11, 12, 0) 78%, var(--ink) 100%);
}

.solutions__head {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px clamp(32px, 6vw, 96px);
  align-items: end;
}

.solutions__body {
  display: grid;
  grid-template-columns: minmax(220px, 4fr) 8fr;
  gap: clamp(32px, 6vw, 96px);
  margin-top: clamp(40px, 5vw, 72px);
  border-top: 1px solid var(--line-dark);
}

.tab {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-height: 84px;
  border-bottom: 1px solid var(--line-dark);
  color: var(--on-dark-2);
  text-align: left;
  transition: color 0.35s var(--ease-out);
}

.tab::before {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -1px;
  height: 2px;
  background: var(--red-on-dark);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.6s var(--ease-out);
}

.tab__name {
  font-size: clamp(1.5rem, 1.6vw + 1rem, 2.25rem);
  font-weight: 800;
  line-height: 1.2;
  transition: transform 0.45s var(--ease-out);
}

.tab__arrow {
  opacity: 0;
  transform: translateX(-12px);
  transition:
    opacity 0.35s var(--ease-out),
    transform 0.45s var(--ease-out);
}

.tab:hover {
  color: var(--on-dark);
}

.tab.is-active {
  color: var(--on-dark);
}

.tab.is-active::before {
  transform: scaleX(1);
}

.tab.is-active .tab__arrow {
  opacity: 1;
  transform: none;
  color: var(--red-on-dark);
}

.solutions__stage {
  padding-top: clamp(28px, 3vw, 44px);
  min-height: 26rem;
}

.panel__title {
  font-size: clamp(1.375rem, 1.2vw + 1rem, 2rem);
  font-weight: 700;
  line-height: 1.45;
  max-width: 22em;
  text-wrap: balance;
}

.panel__body {
  word-break: auto-phrase;
  margin-top: 20px;
  color: var(--on-dark-2);
  max-width: 38em;
}

.panel__points {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0 32px;
  margin-top: 32px;
  border-top: 1px solid var(--line-dark);
}

.panel__points li {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 0;
  border-bottom: 1px solid var(--line-dark);
  font-weight: 500;
}

.panel__points svg {
  flex: none;
  color: var(--red-on-dark);
}

.panel-enter-active {
  transition:
    opacity 0.5s var(--ease-out),
    transform 0.6s var(--ease-out),
    filter 0.5s var(--ease-out);
}

.panel-leave-active {
  transition: opacity 0.18s ease-in;
}

.panel-enter-from {
  opacity: 0;
  transform: translateY(20px);
  filter: blur(6px);
}

.panel-leave-to {
  opacity: 0;
}

@media (max-width: 899px) {
  .solutions__head {
    grid-template-columns: 1fr;
  }

  .solutions__body {
    grid-template-columns: 1fr;
    gap: 0;
    border-top: 0;
  }

  .solutions__tabs {
    display: flex;
    gap: 8px;
    margin-inline: calc(var(--gutter) * -1);
    padding-inline: var(--gutter);
    overflow-x: auto;
    scrollbar-width: none;
    border-bottom: 1px solid var(--line-dark);
  }

  .tab {
    width: auto;
    min-height: 56px;
    padding-inline: 14px;
    border-bottom: 0;
    flex: none;
  }

  .tab__name {
    font-size: 1.25rem;
  }

  .tab__arrow {
    display: none;
  }

  .solutions__stage {
    min-height: 34rem;
  }

  .panel__points {
    grid-template-columns: 1fr;
  }
}
</style>
