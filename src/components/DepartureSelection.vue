<template>
  <div class="relative px-5 my-2 mx-10 rounded-md">
        <div class="relative">
          <span class="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg class="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none">
              <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
          </span>
          <input 
            v-model="search"
            @keyup="updateSearchData"
            class="w-full py-3 pl-10 pr-4 border rounded-md bg-gray-800 text-gray-300 border-gray-600 focus:border-blue-500 focus:outline-none focus:ring" 
            placeholder="Departure Planet">
        </div>
        <div v-if="search.length"
          class="bg-gray-700 absolute inset-x-0 mx-5 my-3 overflow-y-auto border rounded-md max-h-100">
          <div 
            v-for="(departure) in departures" 
            :key="departure._id"
            @click="updateSelectedDepartureData(departure)" 
            class="bg-gray-800 transition-colors duration-150 hover:bg-gray-900">
            <h3 class="px-4 py-2 border-gray-600 font-medium border text-gray-100">{{ departure }}</h3>
          </div>
          <div 
            v-if="!departures.length"
            class="bg-gray-800">
            <h3 class="px-4 py-2 border-gray-600 font-medium border text-gray-100">No Matches</h3>
          </div>
        </div>
      </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: "DepartureSelection",
  data() {
    return {
      search: '',
    };
  },
  computed: {
    ...mapGetters([
      'departures',
    ]),
  },
  methods: {
    ...mapActions([
      'updateSearch',
      'updateSelectedDeparture',
      'updateSelectedRoute',
      'updateSelectedProviders',
    ]),
    updateSearchData () {
      this.updateSearch(this.search)
    },
    updateSelectedDepartureData (departure) {
      this.search = ''
      this.updateSearchData()
      this.updateSelectedDeparture(departure)
      this.updateSelectedRoute({})
    },
  },
};

</script>