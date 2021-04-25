<template>
  <div class="my-10">
    <h2 class="mb-4 text-xl text-center text-gray-100">From {{ selectedDeparture }} you can travel to:</h2>
    <div 
      v-for="(destination) in destinations"
      :key="destination._id"
      @click="updateSelectedRouteData(destination)"
      class="flex my-4 max-w-md mx-auto overflow-hidden rounded-lg shadow-lg bg-gray-800 hover:bg-gray-900">
      <img class="w-1/3 bg-cover object-cover" :src="handlePlanetThumbnails(destination)" />
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
    handlePlanetThumbnails (destination) {
      switch (destination.routeInfo.to.name) {
        case 'Earth':
          return 'https://cdn.mos.cms.futurecdn.net/YLMh9EJRPhmht9GWNhiN7G.jpg'
        case 'Mercury':
          return 'https://www.cronodon.com/images/mercury-1a.jpg'
        case 'Venus':
          return 'https://media.nature.com/lw800/magazine-assets/d41586-020-02785-5/d41586-020-02785-5_18436254.jpg'
        case 'Mars':
          return 'https://images.immediate.co.uk/production/volatile/sites/4/2021/03/HERO_GettyImages-56650294-c8b2bdd.jpg?quality=90&resize=768,574'
        case 'Jupiter':
          return 'https://upload.wikimedia.org/wikipedia/commons/2/2b/Jupiter_and_its_shrunken_Great_Red_Spot.jpg'
        case 'Saturn':
          return 'https://cdn.britannica.com/67/21167-004-6B1CF05E/Saturn-storm-Earth-region-observations-image-Hubble-December-1-1994.jpg'
        case 'Uranus':
          return 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Uranus2.jpg/1200px-Uranus2.jpg'
        case 'Neptune':
          return 'https://upload.wikimedia.org/wikipedia/commons/6/63/Neptune_-_Voyager_2_%2829347980845%29_flatten_crop.jpg'
        default:
          return 'https://cdn.mos.cms.futurecdn.net/YLMh9EJRPhmht9GWNhiN7G.jpg'
      }
    }, 
    formatDistance (distance) {
      return new Intl.NumberFormat().format(distance / 1000)
    },
  },
};

</script>