<template>
  <div class="p-10 min-h-screen bg-gray-900">
    <div v-if="priceListDataLoaded" class="max-w-3xl px-8 py-4 mx-auto rounded-lg shadow-md bg-gray-700">
      <h1 class="text-4xl my-8 text-center font-bold text-gray-50">Cosmos Odyssey</h1>
      <h1 class="text-xl text-center text-gray-100">Make a reservation for your next space travel today!</h1>
      
      <departure-selection v-if="!selectedProviders.length" />

      <selected-providers-list v-if="selectedProviders.length" />

      <reservation-form v-if="reservationState" />

      <destinations-list v-if="selectedDeparture.length" />

      <providers-list v-if="Object.entries(selectedRoute).length" />

      <success-alert v-if="reservationSuccess" />
      <data-update-alert v-if="dataUpdateSuccess" />
    </div> 
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ProvidersList from './components/ProvidersList.vue'
import DestinationsList from './components/DestinationsList.vue'
import DepartureSelection from './components/DepartureSelection.vue'
import SelectedProvidersList from './components/SelectedProvidersList.vue'
import ReservationForm from './components/ReservationForm.vue'
import SuccessAlert from './components/SuccessAlert.vue'
import DataUpdateSuccessAlert from './components/DataUpdateSuccessAlert.vue'
import api from './api/'

export default {
  components: {
    "providers-list": ProvidersList,
    "destinations-list": DestinationsList,
    "departure-selection": DepartureSelection,
    "selected-providers-list": SelectedProvidersList,
    "reservation-form": ReservationForm,
    "success-alert": SuccessAlert,
    "data-update-alert": DataUpdateSuccessAlert,
  },
  data() {
    return {
      
    };
  },
  async created() {
    await this.$store.dispatch('loadPriceLists')
    this.refreshData()
  },
  computed: {
    ...mapGetters([
      'latestPriceList',
      'priceListDataLoaded',
      'selectedDeparture',
      'selectedRoute',
      'reservationState',
      'selectedProviders',
      'reservationSuccess',
      'dataUpdateSuccess',
    ]),
  },
  methods: {
    ...mapActions([
      'updateReservationSuccess',
      'updateDataUpdateSuccess',
      'clearSelectedProviders',
      'updateReservationState',
      'updateSelectedRoute',
    ]),
    refreshData () {
      const validTime = new Date(this.latestPriceList.validUntil).valueOf() - Date.now()
      console.log(validTime)
      setTimeout(() => {
        this.$store.dispatch('loadPriceLists')
        this.clearSelectedProviders()
        this.updateReservationState(false)
        this.updateReservationSuccess(false)
        this.updateDataUpdateSuccess(true)
        this.updateSelectedRoute({})
        this.refreshData()
      }, validTime)
    },
  },
  watch: {
    reservationSuccess (reservationSuccess) {
      if (reservationSuccess) {
        setTimeout(() => {
          this.updateReservationSuccess(false)
        }, 9000)
      }
    },
    dataUpdateSuccess (dataUpdateSuccess) {
      if (dataUpdateSuccess) {
        setTimeout(() => {
          this.updateDataUpdateSuccess(false)
        }, 7000)
      }
    },
  },
};

</script>
