<script setup>
import { values } from '../data'
</script>

<template>
  <section id="about" class="section about on-dark">
    <div class="wrap about__in">
      <div class="about__copy">
        <h2 class="h2" data-lines>
          <span class="ln"><span>自 1986 年，</span></span>
          <span class="ln"><span>誠信是不動的磐石。</span></span>
        </h2>
        <div class="about__text" data-fade>
          <p>
            德運實業的前身，是 1986 年創業於桃園的伸太實業，早期以監視器材設備批發為主。今天的德運，從工程的規劃、施工到後續的維護保養，提供一條龍的服務，客戶遍及北、中、南。
          </p>
          <p>
            我們在桃園備有展示間，歡迎業主前來參觀、了解設備，再一起找出最合適的整合方案。優良的品質、合理的價格、完善的售後服務與負責任的工作態度，是德運始終堅持的經營理念。
          </p>
        </div>
      </div>

      <ul class="about__values" aria-label="經營理念" data-values>
        <li v-for="v in values" :key="v">{{ v }}</li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.about__in {
  display: grid;
  grid-template-columns: 7fr 5fr;
  gap: clamp(40px, 7vw, 120px);
  align-items: start;
}

.about__text {
  display: grid;
  gap: 1.25em;
  margin-top: clamp(24px, 3vw, 40px);
  color: var(--on-dark-2);
  max-width: 36em;
}

.about__values {
  border-top: 1px solid var(--line-dark);
}

.about__values li {
  padding: 14px 0;
  border-bottom: 1px solid var(--line-dark);
  font-size: clamp(2rem, 2.6vw + 1rem, 3.5rem);
  font-weight: 900;
  line-height: 1.3;
}

.about__values li:nth-child(4) {
  color: var(--red-on-dark);
}

@media (max-width: 899px) {
  .about__in {
    grid-template-columns: 1fr;
  }
}
</style>
