<script setup>
defineProps({ name: { type: String, required: true }, size: { type: Number, default: 24 } })

const paths = {
  phone: 'M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1z',
  'arrow-right': 'M5 12h14M13 6l6 6-6 6',
  'arrow-left': 'M19 12H5M11 6l-6 6 6 6',
  'arrow-up-right': 'M7 17 17 7M8 7h9v9',
  'chevron-down': 'M6 9l6 6 6-6',
  download: 'M12 4v11M7 11l5 5 5-5M5 20h14',
  search: 'M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM20 20l-4-4',
  check: 'M5 12.5l4.5 4.5L19 7.5',
  menu: 'M4 8h16M4 16h16',
  close: 'M6 6l12 12M18 6 6 18',
  camera: 'M4 8.5 16 5l1.8 5.6L5.8 14zM17.8 10.6l2.7-.8M8 13.4V18H4M4 16v4',
  dome: 'M3 8h18M5.5 8a6.5 6.5 0 0 0 13 0M12 13.6a2.1 2.1 0 1 0 0-4.2 2.1 2.1 0 0 0 0 4.2z',
  recorder: 'M3 9h18v7H3zM6 12.5h5M14.5 12.5h.01M17.5 12.5h.01M6 16v2M18 16v2',
  fingerprint:
    'M7 19c-1-2-1.5-4-1.5-7a6.5 6.5 0 0 1 13 0c0 2 .2 4 .8 6M9.5 20c-.7-2.5-1-5-1-8a3.5 3.5 0 0 1 7 0c0 3 .4 5.6 1.2 8M12 12c0 3 .3 5.6 1 8',
  intercom: 'M6 3h12v18H6zM12 10.2a2.2 2.2 0 1 0 0-4.4 2.2 2.2 0 0 0 0 4.4zM9.5 14h5M9.5 17h5',
  home: 'M4 11l8-7 8 7v9H4zM10 20v-5h4v5',
  building: 'M5 21V4h9v17M14 9h5v12M3 21h18M8 8h3M8 12h3M8 16h3',
  speaker: 'M4 10v4h3l6 4V6L7 10zM16 9a4 4 0 0 1 0 6M18.5 6.5a8 8 0 0 1 0 11',
  parking: 'M5 4h14v16H5zM10 16V8h3a2.5 2.5 0 0 1 0 5h-3',
  plate: 'M3 8h18v8H3zM7 12h2M11 12h2M15 12h2',
  lamp: 'M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.3 1 2.1h5c0-.8.4-1.6 1-2.1A6 6 0 0 0 12 3z',
}
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path :d="paths[name]" />
  </svg>
</template>
