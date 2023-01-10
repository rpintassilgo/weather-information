<script setup>
  import { ref, onMounted, inject } from 'vue'
  import {useRouter} from 'vue-router'
  import CitiesTable from "./CitiesTable.vue"
  
  const router = useRouter()

  const axios = inject('axios')

  const props = defineProps({
    city: {
      type: String,
      required: false,
    }
  })
  const cities = ref([])
  const city = props.city == null ? ref('Lisbon') : ref(props.city)

  const loadCities = () => {
    axios.get(`weather/${city.value}`)
        .then((response) => {
          cities.value = response.data
        })
        .catch((error) => {
          console.log(error)
        })
    
    router.push({ name: 'Cities', query: { city: city.value }})
  }

  const forecast = (city) => {
    router.push({ name: 'ForecastCity', query: { lat: city.lat, lon: city.lon, city: city.name, country: city.country, state: city.state}})
  }

  onMounted(() => loadCities())
</script>

<template>
  <h3 class="mt-5 mb-3">Search city</h3>
  <p>Note: It is only possible to see up to 5 locations, so some cities might not show up</p>
  <hr>
  <div class="row">
    <div class="search-wrapper panel-heading col-sm-12">
      <div class="input-group">
        <input class="form-control" type="text" v-model="city" placeholder="Search city" />
        <button type="button" class="btn btn-dark px-5" @click="loadCities">Search</button>
      </div>
    </div>                        
  </div>
  <hr>
  <cities-table
    :cities="cities"
    @forecast="forecast"
  ></cities-table>
</template>

