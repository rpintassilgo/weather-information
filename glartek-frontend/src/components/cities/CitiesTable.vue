<script setup>
import { inject } from "vue"

const serverBaseUrl = inject("serverBaseUrl")

const props = defineProps({
  cities: {
    type: Array,
    default: () => [],
  },
})

const emit = defineEmits(["forecast"])

const forecastClick = (city) => {
  emit("forecast", city)
}
</script>

<template>
  <table class="table">
    <thead>
      <tr>
        <th class="align-middle">Name</th>
        <th class="align-middle">Latitude</th>
        <th class="align-middle">Longitude</th>
        <th class="align-middle">Country</th>
        <th class="align-middle">State</th>
        <th class="align-middle"></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="city in cities" :key="cities.indexOf(city)">
        <td class="align-middle">{{ city.name }}</td>
        <td class="align-middle">{{ city.lat }}</td>
        <td class="align-middle">{{ city.lon }}</td>
        <td class="align-middle">{{ city.country }}</td>
        <td class="align-middle">{{ city.state == undefined ? '-' : city.state }}</td>
        <td>
            <button
              class="btn btn-xs btn-dark"
              @click="forecastClick(city)"
            >
              Weather
            </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
