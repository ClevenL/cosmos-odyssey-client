<template>
  <div class="">
    <h2 class="text-xl text-center font-semibold text-gray-100">Fill your reservation details</h2>
    <form>
      <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
        <div>
          <label class="text-gray-200">First Name</label>
          <input v-model.trim="firstNameInput" type="text" class="block w-full px-4 py-2 mt-2 border rounded-md bg-gray-800 text-gray-300 border-gray-600 focus:border-blue-500 focus:outline-none focus:ring">
        </div>
        <div>
          <label class="text-gray-200">Last Name</label>
          <input v-model.trim="lastNameInput" type="text" class="block w-full px-4 py-2 mt-2 border rounded-md bg-gray-800 text-gray-300 border-gray-600 focus:border-blue-500 focus:outline-none focus:ring">
        </div>
      </div>
      <h2 v-if="notFilledError" class="text-xl text-center font-semibold text-red">First and Last name have to be filled</h2>
      <div class="flex justify-start mt-6">
        <div @click="submitReservation()" class="cursor-pointer px-6 py-2 font-semibold text-gray-100 transition-colors duration-200 transform bg-gray-800 shadow rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">&#128640; Make reservation</div>
      </div>
      
    </form>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: "ReservationForm",
  data() {
    return {
      firstNameInput: '',
      lastNameInput: '',
      notFilledError: false,
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
      'makeReservation',
    ]),
    submitReservation () {
      if (this.firstNameInput == '' || this.lastNameInput == '') {
        this.notFilledError = true
      } else {
        this.makeReservation({
          firstName: this.firstNameInput, 
          lastName: this.lastNameInput
        })
        this.notFilledError = false
      } 
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