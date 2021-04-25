<template>
  <div class="p-10 min-h-screen bg-gray-900">
    <div v-if="priceListDataLoaded" class="max-w-3xl px-8 py-4 mx-auto rounded-lg shadow-md bg-gray-700">
      <h1 class="text-4xl my-8 text-center font-bold text-gray-50">Cosmos Odyssey</h1>
      <h1 class="text-xl text-center text-gray-100">Make a reservation for your next space travel</h1>
      
      <departure-selection />

      <div v-if="selectedDeparture.length">
        <destinations-list />
      </div>

      <div v-if="Object.entries(selectedRoute).length">
        <providers-list />
      </div>

    </div> 
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ProvidersList from './components/ProvidersList.vue'
import DestinationsList from './components/DestinationsList.vue'
import DepartureSelection from './components/DepartureSelection.vue'

export default {
  components: {
    "providers-list": ProvidersList,
    "destinations-list": DestinationsList,
    "departure-selection": DepartureSelection,
  },
  data() {
    return {
      
    };
  },
  async created() {
    this.$store.dispatch('loadPriceLists')
  },
  computed: {
    ...mapGetters([
      'priceListDataLoaded',
      'selectedDeparture',
      'selectedRoute',
    ]),
  },
};

</script>
