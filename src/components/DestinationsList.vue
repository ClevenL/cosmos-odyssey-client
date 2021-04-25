<template>
  <div class="my-10">
    <h2 class="mb-4 text-xl text-center text-gray-100">From {{ selectedDeparture }} you can travel to:</h2>
    <div 
      v-for="(destination) in destinations"
      :key="destination._id"
      @click="updateSelectedRouteData(destination)"
      class="flex my-4 max-w-md mx-auto overflow-hidden rounded-lg shadow-lg bg-gray-800 hover:bg-gray-900">
      <img class="w-1/3 bg-cover object-cover" src="https://media.nature.com/lw800/magazine-assets/d41586-020-02785-5/d41586-020-02785-5_18436254.jpg" />
      <div class="w-2/3 p-4">
        <h1 class="text-2xl font-bold text-white">{{ destination.routeInfo.to.name }}</h1>
        <p class="mt-2 text-sm text-gray-400">{{ formatDistance(destination.routeInfo.distance) }} km away</p>
        <p class="mt-2 text-sm text-gray-400">There are {{ destination.providers.length }} offers available</p>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: "DestinationsList",
  computed: {
    ...mapGetters([
      'destinations',
      'selectedDeparture',
    ]),
  },
  methods: {
    ...mapActions([
      'updateSelectedDeparture',
      'updateSelectedRoute',
    ]),
    updateSelectedRouteData (destination) {
      this.updateSelectedRoute(destination)
      this.updateSelectedDeparture('')
    },
    formatDistance (distance) {
      return new Intl.NumberFormat().format(distance / 1000)
    },
  },
};

</script>