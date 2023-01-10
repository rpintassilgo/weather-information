<script setup>
  import { ref, inject, onMounted } from 'vue'
import { useUserStore } from '../stores/user'

  const axios = inject('axios')
  const userStore = useUserStore()

  const leiria = ref({temperature: '', weather: ''})

  const loadLeiriaWeather = () => {
    axios.get('weather?lat=39.7437902&lon=-8.8071119')
        .then((response) => {
          leiria.value = response.data
        })
        .catch((error) => {
          console.log(error)
        })
  }

  onMounted(() => loadLeiriaWeather())
</script>

<template>
    <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 class="h2">Welcome {{userStore.user ? userStore.user.name : 'anonymous user'}}</h1>
    </div>


    <div class="card mx-auto" style="width: 29rem;">
      <img src="../assets/leiria.png" class="card-img-top" alt="...">
      <div class="card-body">
        <h3 class="card-title" style="text-align: center;">Leiria</h3>
        <p class="card-text">Temperature: {{leiria.temperature}}ºC</p>
        <p class="card-text">Weather: {{leiria.weather.main}}</p>
      </div>
    </div>
</template>
  