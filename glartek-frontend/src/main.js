import axios from 'axios'

import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

const app = createApp(App)

/*
const serverBaseUrl = import.meta.env.VITE_APP_BASE_URL
app.provide('axios', axios.create({
    baseURL: serverBaseUrl,
    headers: {
      'Content-type': 'application/json',
    },
  }))
app.provide('serverBaseUrl', serverBaseUrl)  
*/

app.mount('#app')