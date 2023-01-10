import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from "../stores/user.js"

import Homepage from "../components/Homepage.vue"
import Login from "../components/auth/Login.vue"
import Register from "../components/auth/Register.vue"
import Forecast from "../components/forecast/Forecast.vue"
import ForecastCity from "../components/forecast/ForecastCity.vue"
import Cities from "../components/cities/Cities.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Homepage',
      component: Homepage
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/forecast',
      name: 'Forecast',
      component: Forecast
    }, 
    {
      path: '/weather',
      name: 'ForecastCity',
      component: ForecastCity,
      props: route => ({ lat: route.query.lat,
                         lon: route.query.lon,
                         city: route.query.city,
                         country: route.query.country,
                         state: route.query.state
                       })   
    }, 
    {
      path: '/cities',
      name: 'Cities',
      component: Cities,
      props: route => ({ city: route.query.city })
    }, 
  ]
})

router.beforeEach( (to, from, next) => {  

  const userStore = useUserStore()  
  if(!userStore.user) userStore.restoreUser()

  if((to.name == 'Cities' || to.name == 'ForecastCity') && !userStore.user) return
  
  next()
})

export default router
