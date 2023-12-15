<template>
  <div class="home flex flex-col">
    <div class="font-bold text-xl float-left ml-2 mt-2">Preferences</div>
    <div class="flex flex-col gap-3">
      <input v-if="isAuthenticated != true" class="outline outline-2 h-16 mx-6" type="text" v-model="rollNumber" placeholder="Roll number">
      <input class="outline outline-2 h-16 mx-6" type="text" v-model="preferredNumber" placeholder="Preferred number of courses">
      
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="getFutureCourses">get future courses</button>

    <select class="outline outline-2 h-16 mx-6" v-model="preferredCourse">
        <option value="" disabled selected>Select a course</option>
        <option v-for="course in futureCourses" :value="course" :key="course">{{ course }}</option>
      </select>
    
    </div>
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="getRecommendations">Submit</button>
  </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'HomeView',
  data() {
    return {
      rollNumber: '',
      preferredNumber: '',
      preferredCourse: ''
    }
  },
  computed: {
    ...mapGetters(["isAuthenticated", "user"]),
    futureCourses: function() {
      return this.$store.getters.getFutureCourses;
    }
  },
  methods: {
    ...mapActions(["fetchRecommendations", "fetchFutureCourses"]),

    getRecommendations() {
      const info = {
          roll_no: this.isAuthenticated ? this.user.user.name : this.rollNumber,
          pref_no: this.preferredNumber,
          pref_co: this.preferredCourse
          };
      this.fetchRecommendations(info);
      this.$router.push('/recommendations')
    },
    getFutureCourses() {
      const info = {
        "roll_no": this.isAuthenticated ? this.user.user.name : this.rollNumber,
      }
      this.fetchFutureCourses(info);
    }
  },
}
</script>
