<script setup>
  import { ref, onBeforeMount, onMounted, inject } from 'vue'
  import {useRouter} from 'vue-router'
  import ForecastTable from "./ForecastTable.vue"
  
  const router = useRouter()

  const axios = inject('axios')
  const iconURL = inject('iconURL')

  const props = defineProps({
    lat: {
      type: String,
      required: true,
    },
    lon: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: false,
    },
  })

  const forecast = ref([])
  const currentWeatherIcon = ref('')
  const currentWeather = ref({
    weather: {
      main: '',
      description: '',
      icon: ''
    },
    temperature: '',
    wind: {
      speed: '',
      direction: ''
    }
  })

  const loadWeatherInformation = () => {
    // load forecast
    axios.get(`weather/forecast?lat=${props.lat}&lon=${props.lon}`)
        .then((response) => {
          forecast.value = response.data
        })
        .catch((error) => {
          console.log(error)
        })
    
    // load currentWeather
    axios.get(`weather?lat=${props.lat}&lon=${props.lon}`)
    .then((response) => {
      currentWeather.value = response.data
      currentWeatherIcon.value = `${iconURL}/${currentWeather.value.weather.icon}@2x.png`
    })
    .catch((error) => {
      console.log(error)
    })

  }

  const goBack = () =>{
    router.back()
  }


  onMounted(() => loadWeatherInformation())
</script>

<template>
  <h3 class="mt-5 mb-3">Weather from {{props.city}} - {{props.country}} {{props.state === undefined ? '' : `(State: ${props.state})`}}</h3>
  <hr>
  <div class="jumbotron jumbotron-fluid bg-dark text-white">
    <div class="container">
      <p class="lead">Current Weather</p>
      <img class="weatherIcon" :src="currentWeatherIcon">
      <h1 class="display-2">{{currentWeather.temperature}} ºC</h1>
      <p class="lead">Weather: {{currentWeather.weather.main}} | Wind speed: {{currentWeather.wind.speed}}Km/h | Wind direction: {{currentWeather.wind.direction}}</p>
    </div>
  </div>
  <forecast-table
    :forecast="forecast"
  ></forecast-table>
  <div>
    <button type="button" class="btn btn-dark" @click="goBack()">Go back</button>
  </div>
</template>

<style scoped>
.weatherIcon {
  display: block;
  float: left;
  /* Scrollable contents if viewport is shorter than content. */
}
</style>

