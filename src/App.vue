<template>
  <h1 class="text-2xl font-bold text-gray-700">Hello Vue! {{ localData + " " + testData}}</h1>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      localData: "Welcome to"
    };
  },
  computed: {
    ...mapGetters([
      'testData',
    ]),
  },
};

</script>

<style>

</style>
