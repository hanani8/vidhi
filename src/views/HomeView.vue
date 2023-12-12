<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <div>
      <input type="text" v-model="input1" placeholder="Input 1">
      <input type="text" v-model="input2" placeholder="Input 2">
      <input type="text" v-model="input3" placeholder="Input 3">
    </div>
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="redirectToRecommendations">Submit</button>
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
