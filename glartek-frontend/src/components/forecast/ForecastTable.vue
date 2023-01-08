<script setup>
import { inject } from "vue"
import { useUserStore } from "../../stores/user.js"

const serverBaseUrl = inject("serverBaseUrl")
const userStore = useUserStore()

const props = defineProps({
  forecast: {
    type: Array,
    default: () => [],
  },
})
</script>

<template>
  <table class="table">
    <thead>
      <tr>
        <th class="align-middle">Weather</th>
        <th class="align-middle">Weather description</th>
        <th class="align-middle">Temperature (ºC)</th>
        <th class="align-middle">Humidity (%)</th>
        <th class="align-middle">Visibility (meters)</th>
        <th class="align-middle">Wind speed (Km/h)</th>
        <th class="align-middle">Wind direction</th>
        <th class="align-middle">Time</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="el in forecast" :key="forecast.indexOf(el)">
        <td class="align-middle">{{ el.weather.main }}</td>
        <td class="align-middle">{{ el.weather.description }}</td>
        <td class="align-middle">{{ el.temperature }}</td>
        <td class="align-middle">{{ el.humidity}}</td>
        <td class="align-middle">{{ el.visibility}}</td>
        <td class="align-middle">{{ el.wind.speed }}</td>
        <td class="align-middle">{{ el.wind.direction }}</td>
        <td class="align-middle">{{ el.time }}</td>
      </tr>
    </tbody>
  </table>
</template>
