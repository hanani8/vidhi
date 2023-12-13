<template>
  <div class="home flex flex-col">
    <div class="font-bold text-xl float-left ml-2 mt-2">Preferences</div>
    <div class="flex flex-col gap-3">
      <input class="outline outline-2 h-16 mx-6" type="text" v-model="rollNumber" placeholder="Roll number">
      <input class="outline outline-2 h-16 mx-6" type="text" v-model="preferredNumber" placeholder="Preferred number of courses">
      <input class="outline outline-2 h-16 mx-6" type="text" v-model="preferredCourse" placeholder="Preferred course">
    </div>
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="getRecommendations">Submit</button>
  </div>
</template>

<script>

import { mapActions } from 'vuex';

export default {
  name: 'HomeView',
  data() {
    return {
      rollNumber: '',
      preferredNumber: '',
      preferredCourse: ''
    }
  },
  methods: {
    ...mapActions(["fetchRecommendations"]),

    getRecommendations() {
      const info = {
          roll_no: this.rollNumber,
          pref_no: this.preferredNumber,
          pref_co: this.preferredCourse
          };
      this.fetchRecommendations(info);
      this.$router.push('/recommendations')
    }
  }
}
</script>
