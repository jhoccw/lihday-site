<script setup>
import { company, nav } from '../data'
import { categories } from '../data/catalog'
import BrandLogo from './BrandLogo.vue'

const pages = nav.filter((n) => !n.products)
const productNav = nav.find((n) => n.products)
</script>

<template>
  <footer class="footer on-dark">
    <div class="wrap footer__in">
      <div class="footer__brand">
        <RouterLink to="/" class="footer__logo" aria-label="德運實業 LIHDAY 首頁"><BrandLogo on-dark /></RouterLink>
        <p>{{ company.address }}</p>
        <p>電話 <a class="footer__tel" :href="company.telHref">{{ company.tel }}</a></p>
        <p>傳真 {{ company.fax }}</p>
        <a class="footer__social" :href="company.facebook" target="_blank" rel="noopener" aria-label="德運實業 Facebook 粉絲專頁">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.6-1.5h1.5V4.4c-.3 0-1.200-.1-2.300-.1-2.300 0-3.800 1.400-3.800 3.900v2.300H8v3h2.500V21z" />
          </svg>
        </a>
      </div>
      <nav class="footer__nav" aria-label="頁尾選單">
        <ul class="footer__col">
          <li v-for="n in pages" :key="n.label">
            <RouterLink :to="n.to">{{ n.label }}</RouterLink>
          </li>
        </ul>
        <div class="footer__col">
          <RouterLink :to="productNav.to">{{ productNav.label }}</RouterLink>
          <ul class="footer__sub">
            <li v-for="c in categories" :key="c.id">
              <RouterLink :to="{ name: 'category', params: { category: c.id } }">{{ c.name }}</RouterLink>
            </li>
          </ul>
        </div>
      </nav>
    </div>
    <div class="wrap footer__base">
      <p>© 2026 {{ company.name }} LIHDAY</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding-top: clamp(48px, 6vw, 80px);
  font-size: 0.9375rem;
}

.footer__in {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 32px 64px;
  flex-wrap: wrap;
  padding-bottom: clamp(32px, 4vw, 56px);
}

.footer__logo {
  display: inline-block;
  height: 44px;
}

.footer__logo :deep(.logo) {
  height: 44px;
}

.footer__brand p {
  margin-top: 16px;
  color: var(--on-dark-2);
}

.footer__brand p + p {
  margin-top: 4px;
}

.footer__tel {
  color: var(--on-dark);
}

.footer__tel:hover {
  text-decoration: underline;
  text-underline-offset: 4px;
}

.footer__social {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  margin-top: 16px;
  border: 1px solid var(--line-dark);
  border-radius: 50%;
  color: var(--on-dark);
  transition:
    background-color 0.3s var(--ease-out),
    border-color 0.3s var(--ease-out);
}

.footer__social:hover {
  background: var(--red);
  border-color: var(--red);
}

.footer__nav {
  display: flex;
  align-items: flex-start;
  gap: 32px clamp(48px, 8vw, 120px);
}

.footer__nav .footer__sub a {
  color: var(--on-dark-2);
}

.footer__nav .footer__sub a:hover {
  color: var(--on-dark);
}

.footer__nav a {
  display: flex;
  align-items: center;
  min-height: 40px;
  color: var(--on-dark);
  text-underline-offset: 6px;
}

.footer__nav a:hover {
  text-decoration: underline;
  text-decoration-color: var(--red-on-dark);
  text-decoration-thickness: 2px;
}

.footer__base {
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 4px 24px;
  padding-block: 20px;
  border-top: 1px solid var(--line-dark);
  color: var(--on-dark-2);
  font-size: 0.8125rem;
}

@media (max-width: 767px) {
  .footer {
    padding-bottom: 72px;
  }
}
</style>
