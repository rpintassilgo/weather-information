<script setup>
  import { ref, inject } from 'vue'
  import { useRouter } from 'vue-router'
  import { useUserStore } from '../../stores/user.js'
  const router = useRouter()
  const toast = inject('toast')

  const credentials = ref({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

  const userStore = useUserStore()

  const isEmail = (email) => {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }

  const register = async () => {
    if (await userStore.register(credentials.value)) {
      toast.success('Account created')
      router.push('/login')
    } else if (!isEmail(credentials.value.email)){
      credentials.value.email  = ''
      toast.error('Invalid email')
    }
    else if (credentials.value.password != credentials.value.confirmPassword || credentials.value.password == '' || credentials.value.confirmPassword == '') {
      credentials.value.password = ''
      credentials.value.confirmPassword = ''
      toast.error('Invalid password')
    }
    else{
      credentials.value.name  = ''
      toast.error('Invalid name')
    }
  }
</script>


<template>
    <form
      class="row g-3 needs-validation"
      novalidate
      @submit.prevent="register"
    >
      <h3 class="mt-5 mb-3">Sign up</h3>
      <hr>
      <div class="mb-3">
          <label
            for="inputName"
            class="form-label"
          >Name</label>
          <input
            type="text"
            class="form-control"
            id="inputName"
            required
            v-model="credentials.name"
      >
      </div>
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
      <div class="mb-3">
          <label
            for="inputConfirmPassword"
            class="form-label"
          >Confirm Password</label>
          <input
            type="password"
            class="form-control"
            id="inputConfirmPassword"
            required
            v-model="credentials.confirmPassword"
          >
      </div>


      <div class="mb-3 d-flex justify-content-center">
        <button
          type="button"
          class="btn btn-dark px-5"
          @click="register"
        >Register</button>
      </div>



    </form>
  </template>

