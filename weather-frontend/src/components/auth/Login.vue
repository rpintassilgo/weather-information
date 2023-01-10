<script setup>
  import { ref, inject } from 'vue'
  import { useRouter } from 'vue-router'  
  import { useUserStore } from '../../stores/user.js'
  const router = useRouter()  
  const toast = inject('toast')

  const credentials = ref({
        email: '',
        password: ''
    })

  const userStore = useUserStore()     

  const emit = defineEmits(['login'])

  const addCookieTimer = () => {
    const timeout = setTimeout(function(){
      userStore.logout()
      router.push({ name: 'Homepage' })
      toast.error('Session expired')
    },30*60*1000) // 30 min session
    sessionStorage.setItem('timer',timeout)
}

  const login = async () => {
    if (await userStore.login(credentials.value)) {
      toast.success('User ' + userStore.user.name + ' has entered the application.')
      emit('login')
      router.push({ name: 'Homepage' })
      addCookieTimer()
    } else {
      credentials.value.password = ''
      toast.error('User credentials are invalid!')
    }
  }
</script>


<template>
  <form
    class="row g-3 needs-validation"
    novalidate
    @submit.prevent="login"
  >
    <h3 class="mt-5 mb-3">Login</h3>
    <hr>
    <div class="mb-3">
      <div class="mb-3">
        <label
          for="inputEmail"
          class="form-label"
        >Email</label>
        <input
          type="text"
          class="form-control"
          id="inputEmail"
          required
          v-model="credentials.email"
        >
      </div>
    </div>
    <div class="mb-3">
      <div class="mb-3">
        <label
          for="inputPassword"
          class="form-label"
        >Password</label>
        <input
          type="password"
          class="form-control"
          id="inputPassword"
          required
          v-model="credentials.password"
        >
      </div>
    </div>
    <div class="mb-3 d-flex justify-content-center">
      <button
        type="button"
        class="btn btn-dark px-5"
        @click="login"
      >Login</button>
    </div>
  </form>
</template>

