<script setup>
// The supplied logo has a dark grey wordmark. On dark grounds the same file is
// drawn twice: the red mark untouched, the wordmark knocked out to white.
defineProps({ onDark: { type: Boolean, default: false } })
</script>

<template>
  <span class="logo" :class="{ 'logo--dark': onDark }">
    <img src="/img/lihday-logo.png" width="480" height="120" alt="LIHDAY 德運實業有限公司" />
    <img v-if="onDark" class="logo__word" src="/img/lihday-logo.png" width="480" height="120" alt="" aria-hidden="true" />
  </span>
</template>

<style scoped>
.logo {
  position: relative;
  display: inline-block;
  line-height: 0;
}

.logo img {
  height: 100%;
  width: auto;
}

.logo--dark img:first-child {
  clip-path: inset(0 58% 0 0);
}

.logo__word {
  position: absolute;
  inset: 0;
  clip-path: inset(0 0 0 42%);
  filter: brightness(0) invert(1);
}
</style>
