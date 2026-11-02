<script setup>
import { process } from '../data'
</script>

<template>
  <section class="section process">
    <div class="wrap">
      <h2 class="h2" data-lines>
        <span class="ln"><span>從第一次場勘，</span></span>
        <span class="ln"><span>到之後的每一次保養。</span></span>
      </h2>

      <ol class="process__steps" data-process>
        <li v-for="p in process" :key="p.step" class="step">
          <div class="step__rail" aria-hidden="true">
            <span class="step__dot"></span>
            <span class="step__line"><span data-process-line></span></span>
          </div>
          <p class="step__num">{{ p.step }}</p>
          <h3 class="step__name">{{ p.name }}</h3>
          <p class="step__desc">{{ p.desc }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.process {
  background: var(--paper-2);
}

.process__steps {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin-top: clamp(48px, 6vw, 88px);
}

.step {
  --gap: clamp(24px, 4vw, 64px);
  padding-right: var(--gap);
}

.step__rail {
  display: flex;
  align-items: center;
  height: 16px;
  margin-right: calc(var(--gap) * -1);
}

.step__dot {
  flex: none;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--red);
}

.step__line {
  flex: 1;
  height: 2px;
  background: var(--line);
}

.step__line > span {
  display: block;
  height: 100%;
  background: var(--red);
  transform-origin: left;
}

.step__num {
  margin-top: 28px;
  font-size: 0.9375rem;
  font-weight: 600;
  color: var(--red);
  letter-spacing: 0.08em;
}

.step__name {
  font-size: clamp(2rem, 2.4vw + 1rem, 3.25rem);
  font-weight: 900;
  line-height: 1.3;
}

.step__desc {
  margin-top: 12px;
  color: var(--text-2);
  max-width: 22em;
}

@media (max-width: 767px) {
  .process__steps {
    grid-template-columns: 1fr;
  }

  .step {
    position: relative;
    padding: 0 0 40px 40px;
  }

  .step:last-child {
    padding-bottom: 0;
  }

  .step__rail {
    position: absolute;
    inset: 6px auto 0 0;
    flex-direction: column;
    width: 16px;
    height: auto;
    margin-right: 0;
  }

  .step__line {
    width: 2px;
    height: auto;
  }

  .step__line > span {
    transform-origin: top;
  }

  .step:last-child .step__line {
    display: none;
  }

  .step__num {
    margin-top: 0;
  }
}
</style>
