<template>
  <div class="my-10">
    <h2 class="mb-4 text-xl text-center text-gray-100">Traveling from <strong class="text-2xl">{{ selectedRoute.routeInfo.from.name }}</strong> to <strong class="text-2xl">{{ selectedRoute.routeInfo.to.name }}</strong></h2>
    <p class="mt-2 text-md text-center text-gray-400">Check your options:</p>
    <div v-if="filteredProviders.length">
      <div class="flex justify-end">
        <div class="flex">
          <div 
          @click="handleSorting('Duration')"
          class="cursor-pointer px-6 py-2 font-semibold text-gray-100 transition-colors duration-200 transform bg-gray-800 shadow rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
            Duration
          </div>
          <div 
          @click="handleSorting('Price')"
          class="cursor-pointer ml-2 px-6 py-2 font-semibold text-gray-100 transition-colors duration-200 transform bg-gray-800 shadow rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
            Price
          </div>
        </div>
      </div>
      <div 
      v-for="(provider) in filteredProviders"
      :key="provider.id"
      @click="selectProvider(provider)"
      class="my-2 mx-auto p-4 rounded-lg shadow-lg hover:bg-gray-900"
      :class="[ providerSelected(provider)? 'bg-gray-900' : 'bg-gray-800' ]">
        <div class="flex justify-between">
          <h1 class="text-2xl font-bold text-white">{{ provider.company.name }}</h1>
          <h1 class="text-md text-white">Duration: <strong>{{ getFlightDurationString(provider) }}</strong></h1>
        </div>
        <p class="mt-2 text-sm text-gray-400">Departing: {{ formatDate(provider.flightStart) }}</p>
        <div class="flex justify-between">
          <p class="mt-2 text-sm text-gray-400">Arriving:  {{ formatDate(provider.flightEnd) }}</p>
          <h1 class="text-2xl font-bold text-white">{{ formatPrice(provider.price) }}</h1>
        </div>
        <div v-if="providerSelected(provider)"
        class="flex justify-between mt-4">
          <div 
          @click="updateSelectedProvidersData(provider,true)"
          class="cursor-pointer px-6 py-2 font-semibold text-gray-100 transition-colors duration-200 transform bg-gray-800 shadow rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
          Make a reservation</div>

          <div 
          @click="updateSelectedProvidersData(provider)"
          class="cursor-pointer px-6 py-2 font-semibold text-gray-100 transition-colors duration-200 transform bg-gray-800 shadow rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
          Add as a stop</div>
        </div>
      </div>
    </div>
    <div v-else>
      <p class="mt-6 font-bold text-center text-white">There is no flight offers after your arrival date.</p>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: "ProvidersList",
  data() {
    return {
      selectedProvider: {},
    };
  },
  computed: {
    ...mapGetters([
      'selectedRoute',
      'availableProviders',
      'filteredProviders',
    ]),
  },
  methods: {
    ...mapActions([
      'updateSelectedDeparture',
      'updateSelectedRoute',
      'updateSelectedProviders',
      'updateReservationState',
      'updateSortBy',
    ]),
    updateSelectedProvidersData (provider, reservation = false) {
      if (reservation) {
        this.updateSelectedDeparture('')
        this.updateReservationState(true)
      } else {
        this.updateSelectedDeparture(this.selectedRoute.routeInfo.to.name)
      }
      provider["routeInfo"] = this.selectedRoute.routeInfo
      this.updateSelectedProviders(provider)
      this.updateSelectedRoute({})
    },
    selectProvider (provider) {
      this.selectedProvider = provider
    },
    providerSelected (provider) {
      return provider == this.selectedProvider
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
    handleSorting (sortBy) {
      switch (sortBy) {
        case 'Duration':
          this.updateSortBy('duration')
          break
        case 'Price':
          this.updateSortBy('price')
          break
        default:
          this.updateSortBy('duration')
      }
    },
  },
};

</script>