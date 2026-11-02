<script setup>
import AppIcon from '../components/AppIcon.vue'
</script>

<template>
  <main id="main" class="missing on-dark">
    <div class="wrap">
      <h1 class="h2">找不到這個頁面。</h1>
      <p class="lead">網址可能已經變更，或這個頁面已經移除。</p>
      <RouterLink class="link-arrow" to="/products">
        看全部產品
        <AppIcon name="arrow-right" :size="20" />
      </RouterLink>
    </div>
  </main>
</template>

<style scoped>
.missing {
  margin-top: var(--header-h);
  min-height: 70svh;
  display: grid;
  align-items: center;
  padding-block: var(--section);
}

.missing .lead {
  margin: 16px 0 28px;
}
</style>
