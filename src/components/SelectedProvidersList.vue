<template>
  <div class="my-10">
    <h2 class="mb-4 text-xl text-center text-gray-100">Your selected travel routes:</h2>
    <div 
      v-for="(provider) in selectedProviders"
      :key="provider.id">
      <h2 class="mt-6 mb-2 text-xl text-center text-gray-100">Traveling from <strong class="text-2xl">{{ provider.routeInfo.from.name }}</strong> to <strong class="text-2xl">{{ provider.routeInfo.to.name }}</strong></h2>
      <div class="my-2 mx-auto p-4 rounded-lg shadow-lg bg-gray-800">
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
    <div class="mt-10 flex justify-between">
      <div 
          @click="clearReservationState()"
          class="py-2 px-4 text-center text-xl font-bold text-gray-100 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-md shadow">
          Clear selections</div>
      <div class="inline-block align-bottom text-xl text-right text-gray-100">Total Price</div>
    </div>
    <div class="text-2xl font-bold text-right text-gray-100">{{ formatPrice(getTotalPrice()) }}</div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: "DepartureSelection",
  computed: {
    ...mapGetters([
      'selectedProviders',
    ]),
  },
  methods: {
    ...mapActions([
      'clearSelectedProviders',
      'updateReservationState',
    ]),
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
    getTotalPrice () {
      return this.selectedProviders.reduce((total, provider) => total + provider.price, 0)
    },
    clearReservationState () {
      this.updateReservationState(false)
      this.clearSelectedProviders()
    },
  },
};

</script>