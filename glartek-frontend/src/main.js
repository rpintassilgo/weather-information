import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'
import Toaster from "@meforma/vue-toaster";

import App from './App.vue'
import router from './router'

//import './assets/main.css'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.css"
import "bootstrap"

const app = createApp(App)

const serverBaseUrl = import.meta.env.VITE_APP_BASE_URL
const iconURL = import.meta.env.VITE_ICON_URL
app.provide('axios', axios.create({
    baseURL: serverBaseUrl + '/api',
    headers: {
      'Content-type': 'application/json',
    },
  }))
app.provide('serverBaseUrl', serverBaseUrl)  
app.provide('iconURL', iconURL)  

app.use(Toaster, {
    // Global/Default options
    position: 'top',
    timeout: 3000,
    pauseOnHover: true
})

app.provide('toast', app.config.globalProperties.$toast);

app.use(createPinia())
app.use(router)

app.mount('#app')
