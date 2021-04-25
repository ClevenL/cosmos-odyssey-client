<template>
  <div class="my-10">
    <h2 class="mb-4 text-xl text-center text-gray-100">Traveling from <strong class="text-2xl">{{ selectedRoute.routeInfo.from.name }}</strong> to <strong class="text-2xl">{{ selectedRoute.routeInfo.to.name }}</strong></h2>
    <p class="mt-2 text-md text-center text-gray-400">Check your options:</p>
    <div 
    v-for="(provider) in selectedRoute.providers"
    :key="provider.id"
    class="my-2 mx-auto p-4 rounded-lg shadow-lg bg-gray-800 hover:bg-gray-900">
      <div class="flex justify-between">
        <h1 class="text-2xl font-bold text-white">{{ provider.company.name }}</h1>
        <h1 class="text-md text-white">Duration: <strong>{{ getFlightDurationString(provider) }}</strong></h1>
      </div>
      <p class="mt-2 text-sm text-gray-400">Departing: {{ formatDate(provider.flightStart) }}</p>
      <div class="flex justify-between">
        <p class="mt-2 text-sm text-gray-400">Arriving:  {{ formatDate(provider.flightEnd) }}</p>
        <h1 class="text-2xl font-bold text-white">{{ formatPrice(provider.price) }}</h1>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: "ProvidersList",
  computed: {
    ...mapGetters([
      'selectedRoute',
    ]),
  },
  methods: {
    ...mapActions([
      'updateSelectedDeparture',
      'updateSelectedRoute',
      'updateSelectedProviders',
    ]),
    updateSelectedProviderData (provider) {
      this.updateSelectedProviders(provider)
      this.updateSelectedDeparture(this.updateSelectedRoute.routeInfo.to.name)
      this.updateSelectedRoute({})
    },
    formatDate (date) {
      const formatter = new Intl.DateTimeFormat('en-US', {
        dateStyle: 'long',
        timeStyle: 'short'
      })
      return formatter.format(new Date(date))
    },
    formatPrice (price) {
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      })
      return formatter.format(price)
    },
    getFlightDurationString (provider) {
      const durationInMs = new Date(provider.flightEnd).valueOf() - new Date(provider.flightStart).valueOf()
      const durationInDays = Math.floor(durationInMs/86400000)
      const durationInHours = Math.floor(durationInMs/3600000)
      const durationInMin = Math.floor(durationInMs/60000)
      let result = ""
      if (durationInDays > 1) result += `${durationInDays} days `
      if (durationInDays == 1) result += `${durationInDays} day `
      if (durationInHours % 24 > 0) result += `${durationInHours % 24} h `
      if (durationInMin % 60 > 0) result += `${durationInMin % 60} min`
      return result
    },
  },
};

</script>