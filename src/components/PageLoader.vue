<script setup>
import { ref, onMounted } from 'vue'
import { loader, registerLoader } from '../loader'

const el = ref(null)
onMounted(() => registerLoader(el.value))
</script>

<template>
  <div v-show="loader.visible" ref="el" class="loader" role="progressbar" aria-label="頁面載入中" :aria-valuenow="loader.pct" aria-valuemin="0" aria-valuemax="100">
    <div class="wrap loader__bottom">
      <p class="loader__label">載入中</p>
      <p class="loader__count">
        <span class="loader__num">{{ loader.pct }}<small>%</small></span>
      </p>
    </div>

    <span class="loader__bar" :style="{ transform: `scaleX(${loader.pct / 100})` }" aria-hidden="true"></span>
  </div>
</template>

<style scoped>
.loader {
  position: fixed;
  inset: 0;
  z-index: 200;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background: var(--ink);
  color: var(--on-dark);
  clip-path: inset(0% 0% 0% 0%);
}

.loader__bottom {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;
  padding-bottom: clamp(32px, 6vh, 64px);
}

.loader__label {
  padding-bottom: 1.2em;
  font-size: 0.9375rem;
  color: var(--on-dark-2);
  letter-spacing: 0.2em;
}

.loader__count {
  overflow: hidden;
  line-height: 1;
}

.loader__num {
  display: block;
  font-size: clamp(4.5rem, 14vw, 11rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  font-variant-numeric: tabular-nums;
}

.loader__num small {
  margin-left: 0.04em;
  font-size: 0.4em;
  font-weight: 700;
  color: var(--red-on-dark);
  letter-spacing: 0;
}

.loader__bar {
  position: absolute;
  inset: auto 0 0 0;
  height: 4px;
  background: var(--red);
  transform-origin: left;
}
</style>
