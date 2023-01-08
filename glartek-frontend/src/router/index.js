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
    /*
    {
      path: '/projects/:id',
      name: 'Project',
      component: Project,
      props: route => ({ id: parseInt(route.params.id) })     
    },
    */
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
      component: Cities
    }, 
  ]
})

let handlingFirstRoute = true

router.beforeEach(async (to, from, next) => {  
  const userStore = useUserStore()  
  if (handlingFirstRoute) {
    handlingFirstRoute = false
    await userStore.restoreToken()
  }
  if ((to.name == 'Login')) {
    next()
    return
  }
  if (userStore.user) {
    next({ name: 'Login' })
    return
  }
  /*if (to.name == 'User') {
    if ((userStore.user.type == 'A') || (userStore.user.id == to.params.id)) {
      next()
      return
    }
    next({ name: 'Homepage' })
    return
  }*/
  next()
})

export default router
