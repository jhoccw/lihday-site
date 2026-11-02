<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import { homeMotion } from '../motion'
import { whenRevealed } from '../loader'
import HeroSection from '../components/HeroSection.vue'
import ServicesSection from '../components/ServicesSection.vue'
import SolutionsSection from '../components/SolutionsSection.vue'
import ProcessSection from '../components/ProcessSection.vue'
import ProductsSection from '../components/ProductsSection.vue'
import PartnersSection from '../components/PartnersSection.vue'
import AboutSection from '../components/AboutSection.vue'
import ContactSection from '../components/ContactSection.vue'

let dispose
let alive = true

onMounted(() => {
  document.title = '德運實業 LIHDAY｜監視系統規劃、施工、維護'
  whenRevealed().then(() => {
    if (alive) dispose = homeMotion()
  })
})

onBeforeUnmount(() => {
  alive = false
  dispose?.()
})
</script>

<template>
  <main id="main">
    <HeroSection />
    <ServicesSection />
    <SolutionsSection />
    <ProcessSection />
    <ProductsSection />
    <PartnersSection />
    <AboutSection />
    <ContactSection />
  </main>
</template>
