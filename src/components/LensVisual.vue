<script setup>
// Camera lens drawn in SVG. The iris opening is driven by two CSS custom
// properties on the root (--d: blade travel, --twist: blade rotation) so the
// motion layer can animate it without touching the markup.
const blades = Array.from({ length: 8 }, (_, i) => i * 45)
const ticks = Array.from({ length: 72 }, (_, i) => i * 5)
</script>

<template>
  <svg class="lens" viewBox="0 0 800 800" role="img" aria-label="監視攝影機鏡頭">
    <defs>
      <radialGradient id="lens-barrel" cx="50%" cy="50%" r="50%">
        <stop offset="0.82" stop-color="#101012" />
        <stop offset="0.93" stop-color="#232327" />
        <stop offset="1" stop-color="#0d0d0f" />
      </radialGradient>
      <linearGradient id="lens-bevel" x1="0.15" y1="0.1" x2="0.85" y2="0.9">
        <stop offset="0" stop-color="#6a6a73" />
        <stop offset="0.35" stop-color="#1c1c20" />
        <stop offset="0.7" stop-color="#0c0c0e" />
        <stop offset="1" stop-color="#3a3a41" />
      </linearGradient>
      <radialGradient id="lens-glow" cx="50%" cy="50%" r="50%">
        <stop offset="0" stop-color="#ff5a68" />
        <stop offset="0.16" stop-color="#e01a33" />
        <stop offset="0.42" stop-color="#8b0a1b" />
        <stop offset="0.75" stop-color="#2a0409" />
        <stop offset="1" stop-color="#070708" />
      </radialGradient>
      <linearGradient id="lens-blade" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#101012" />
        <stop offset="0.5" stop-color="#232327" />
        <stop offset="1" stop-color="#141416" />
      </linearGradient>
      <radialGradient id="lens-glare" cx="50%" cy="50%" r="50%">
        <stop offset="0" stop-color="#ffffff" stop-opacity="0.16" />
        <stop offset="0.6" stop-color="#ffffff" stop-opacity="0.04" />
        <stop offset="1" stop-color="#ffffff" stop-opacity="0" />
      </radialGradient>
      <clipPath id="lens-glass">
        <circle cx="400" cy="400" r="262" />
      </clipPath>
      <path id="lens-engrave" d="M400 79a321 321 0 1 1-0.01 0" />
    </defs>

    <circle cx="400" cy="400" r="396" fill="url(#lens-barrel)" />
    <circle cx="400" cy="400" r="395.5" fill="none" stroke="#3a3a41" />

    <g class="lens__grip">
      <line v-for="t in ticks" :key="t" x1="400" y1="18" x2="400" y2="44" stroke="#34343a" stroke-width="5" :transform="`rotate(${t} 400 400)`" />
    </g>

    <circle cx="400" cy="400" r="346" fill="#0e0e10" stroke="#34343a" />

    <g class="lens__engrave">
      <text class="lens__text" fill="#9a9aa3">
        <textPath href="#lens-engrave" startOffset="40" textLength="1936">LIHDAY · SECURITY SYSTEMS · SINCE 1986 · TAOYUAN, TAIWAN · LIHDAY · SECURITY SYSTEMS · SINCE 1986</textPath>
      </text>
      <circle cx="400" cy="79" r="5" fill="#c30d23" />
    </g>

    <circle cx="400" cy="400" r="290" fill="none" stroke="url(#lens-bevel)" stroke-width="14" />
    <circle cx="400" cy="400" r="272" fill="#060607" />

    <g clip-path="url(#lens-glass)">
      <g class="lens__depth">
        <circle cx="400" cy="400" r="300" fill="url(#lens-glow)" />
        <circle cx="400" cy="400" r="196" fill="none" stroke="#ffffff" stroke-opacity="0.07" />
        <circle cx="400" cy="400" r="138" fill="none" stroke="#ffffff" stroke-opacity="0.1" />
        <circle cx="400" cy="400" r="84" fill="none" stroke="#ffffff" stroke-opacity="0.14" stroke-width="2" />
        <circle cx="400" cy="400" r="40" fill="#060607" />
        <circle cx="388" cy="388" r="7" fill="#ffffff" fill-opacity="0.55" />
      </g>

      <g class="lens__blades">
        <rect
          v-for="b in blades"
          :key="b"
          class="lens__blade"
          x="-200"
          y="400"
          width="1200"
          height="700"
          fill="url(#lens-blade)"
          stroke="#3a3a41"
          :style="{ '--a': b + 'deg' }"
        />
      </g>

      <ellipse class="lens__glare" cx="290" cy="262" rx="230" ry="150" fill="url(#lens-glare)" transform="rotate(-32 290 262)" />
    </g>

    <circle cx="400" cy="400" r="262" fill="none" stroke="#000" stroke-opacity="0.6" stroke-width="3" />
  </svg>
</template>

<style scoped>
.lens {
  --d: 150px;
  --twist: 0deg;
  width: 100%;
  height: auto;
  overflow: visible;
}

.lens__grip,
.lens__engrave,
.lens__blade,
.lens__depth,
.lens__glare {
  transform-box: view-box;
  transform-origin: 400px 400px;
}

.lens__blade {
  transform: rotate(calc(var(--a) + var(--twist))) translateY(var(--d));
}

.lens__text {
  font-family: 'Archivo Variable', sans-serif;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.34em;
}
</style>
