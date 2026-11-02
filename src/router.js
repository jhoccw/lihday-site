import { createRouter, createWebHistory } from 'vue-router'
import HomePage from './pages/HomePage.vue'

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'home', component: HomePage },
    { path: '/products', name: 'products', component: () => import('./pages/ProductsPage.vue') },
    { path: '/products/category/:category', name: 'category', component: () => import('./pages/ProductsPage.vue') },
    { path: '/products/:slug', name: 'product', component: () => import('./pages/ProductPage.vue') },
    { path: '/:rest(.*)*', name: 'not-found', component: () => import('./pages/NotFoundPage.vue') },
  ],
})
