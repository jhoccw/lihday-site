import { createApp } from 'vue'
import '@fontsource-variable/archivo/wght.css'
import '@fontsource-variable/noto-sans-tc/wght.css'
import './styles/base.css'
import App from './App.vue'
import { router } from './router'

createApp(App).use(router).mount('#app')
