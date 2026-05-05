import './assets/main.css'
import 'primeicons/primeicons.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'

import App from './App.vue'
import router from './router'

// Componentes PrimeVue globais
import Button from 'primevue/button'
import Card from 'primevue/card'

const app = createApp(App)

app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: '.dark'
    }
  }
})
app.use(createPinia())
app.use(router)

// Registrar componentes globais
app.component('Button', Button)
app.component('Card', Card)

app.mount('#app')