<script setup>
  import { ref, onMounted, inject } from 'vue'
  import {useRouter} from 'vue-router'
  import ForecastTable from "./ForecastTable.vue"
  
  const router = useRouter()

  const axios = inject('axios')
  const serverBaseUrl = inject('serverBaseUrl')
  const iconURL = inject('iconURL')

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
  const filterByCity = ref('2267094')

  const loadForecast = () => {
    // load forecast
      axios.get(`weather/forecast?cityid=${filterByCity.value}`)
        .then((response) => {
          forecast.value = response.data
        })
        .catch((error) => {
          console.log(error)
        })

    let coord = {
      lat: '',
      lon: ''
    }
    switch (filterByCity.value) {
      case '2267094':
        coord.lat = '39.7437902'
        coord.lon = '-8.8071119'
        break;
      case '2267056':
        coord.lat = '38.7077507'
        coord.lon = '-9.1365919'
        break;
      case '2740636':
        coord.lat = '40.2111931'
        coord.lon = '-8.4294632'
        break;
      case '2735941':
        coord.lat = '41.1494512'
        coord.lon = '-8.6107884'
        break;
      default:
        coord.lat =	'37.0162727'
        coord.lon = '-7.9351771'
        break;
    }

    // load current weather
    axios.get(`weather?lat=${coord.lat}&lon=${coord.lon}`)
      .then((response) => {
        currentWeather.value = response.data
        currentWeatherIcon.value = `${iconURL}/${currentWeather.value.weather.icon}@2x.png`
      })
      .catch((error) => {
        console.log(error)
      })
  }

  onMounted(() => loadForecast())
</script>

<template>
  <h3 class="mt-5 mb-3">Weather</h3>
  <hr>
  <div class="mx-2 mt-2 flex-grow-1">
    <label
      for="selectType"
      class="form-label"
    >Select city:</label>
    <select
      class="form-select"
      id="selectCity"
      v-model="filterByCity"
      @change="loadForecast"
    >
      <option value="2267094">Leiria</option>
      <option value="2267056">Lisboa</option>
      <option value="2740636">Coimbra</option>
      <option value="2735941">Porto</option>
      <option value="2268337">Faro</option>
    </select>
  </div>
  <hr>
  <div class="jumbotron jumbotron-fluid bg-dark text-white">
    <div class="container">
      <p class="lead">Current Weather</p>
      <img class="weatherIcon" :src="currentWeatherIcon">
      <h1 class="display-2">{{currentWeather.temperature}} ºC</h1>
      <p class="lead">Weather: {{currentWeather.weather.main}} | Wind speed: {{currentWeather.wind.speed}}Km/h | Wind direction: {{currentWeather.wind.direction}}</p>
    </div>
  </div>
  <hr>
  <forecast-table
    :forecast="forecast"
  ></forecast-table>
</template>

<style scoped>
.weatherIcon {
  display: block;
  float: left;
  /* Scrollable contents if viewport is shorter than content. */
}
</style>

