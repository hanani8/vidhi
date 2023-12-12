<template>
  <div class="home flex flex-col">
    <div class="font-bold text-xl float-left ml-2 mt-2">Preferences</div>
    <div class="flex flex-col gap-3">
      <input class="outline outline-2 h-16 mx-6" type="text" v-model="input1" placeholder="Input 1">
      <input class="outline outline-2 h-16 mx-6" type="text" v-model="input2" placeholder="Input 2">
      <input class="outline outline-2 h-16 mx-6" type="text" v-model="input3" placeholder="Input 3">
    </div>
    <!-- <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="redirectToRecommendations">Submit</button> -->
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      input1: '',
      input2: '',
      input3: ''
    }
  },
  methods: {
    redirectToRecommendations() {
      this.$router.push('/recommendations');
    }
  }
}
</script>
