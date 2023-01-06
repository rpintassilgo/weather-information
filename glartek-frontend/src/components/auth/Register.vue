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

  const emit = defineEmits(['register'])

  const register = async () => {

    console.log(JSON.stringify(credentials.value))

    if (await userStore.signUpCustomer(credentials.value)) {
      toast.success('Account created')
      emit('register')
      //router.back()
      router.push('/login')
    } else if (credentials.value.password != credentials.value.confirmPassword || credentials.value.password == '' || credentials.value.confirmPassword == '') {
      credentials.value.password = ''
      credentials.value.confirmPassword = ''
      toast.error('Password do not match')
    }
    else if (credentials.value.name == ''){
      credentials.value.name  = ''
      toast.error('Invalid name')
  }
  else if (credentials.value.email == ''){
    credentials.value.email = ''
      toast.error('Invalid email')
  }
  else if (credentials.value.phone == ''){
      credentials.value.phone  = ''
      toast.error('Invalid phone')
  }
  else if (credentials.value.nif == '' || credentials.value.nif.length < 9 || credentials.value.nif.length > 9 ){
      credentials.value.nif  = ''
      toast.error('Invalid nif')
  }
  else if (credentials.value.default_payment_type == ''){
      credentials.value.default_payment_type  = ''
      console.log("length"+credentials.value.nif.length)
      toast.error('Invalid default_payment_type')

  }
  else{
      credentials.value.default_payment_reference  = ''
      toast.error('Invalid default_payment_reference')
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
          class="btn btn-primary px-5"
          @click="register"
        >Registar</button>
      </div>



    </form>
  </template>

