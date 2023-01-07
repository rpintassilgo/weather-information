<script setup>
  import { ref, onMounted, inject } from 'vue'
  import {useRouter} from 'vue-router'
  import ForecastTable from "./ForecastTable.vue"
  
  const router = useRouter()

  const axios = inject('axios')
  const serverBaseUrl = inject('serverBaseUrl')

  const forecast = ref([])
  const filterByCity = ref('2267094')

  const loadForecast = () => {
    const getUrl = `${serverBaseUrl}/weather/forecast?cityid=${filterByCity.value}`
    axios.get(getUrl)
        .then((response) => {
          console.log("RESPOSTA: " + response)
          forecast.value = response.data
        })
        .catch((error) => {
          console.log(error)
        })
  }

  onMounted(() => loadForecast())
</script>

<template>
  <h3 class="mt-5 mb-3">Forecast</h3>
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
  <forecast-table
    :forecast="forecast"
  ></forecast-table>
</template>

