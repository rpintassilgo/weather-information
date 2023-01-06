import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from "../stores/user.js"

import Homepage from "../components/Homepage.vue"
import Login from "../components/auth/Login.vue"
import Register from "../components/auth/Register.vue"
import User from "../components/users/User.vue"

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
      path: '/users/:id',
      name: 'User',
      component: User,
      //props: true
      // Replaced with the following line to ensure that id is a number
      props: route => ({ id: parseInt(route.params.id) })
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
  if (!userStore.user) {
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
