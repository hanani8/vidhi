<template>
  <div class="home flex flex-col">
    <div class="divider divider-error font-bold text-xl">Preferences</div>
    <div class="h-full flex flex-col justify-center sm:py-12">
      <div class="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
        <div class="bg-base-200 shadow w-full rounded-lg divide-y divide-gray-200">
          <div class="px-5 py-7">
            <form @submit.prevent="getRecommendations">
              <div v-if="isAuthenticated != true" class="label">
                <span class="label-text">Roll No.</span>
              </div>
              <input v-if="isAuthenticated != true" v-model="rollNumber" type="text" class="input input-bordered w-full max-w-xs" />
              <div class="label">
                <span class="label-text">Preferred No. of Courses</span>
              </div>
              <input v-model="preferredNumber" type="number" class="input input-bordered w-full max-w-xs" />

              <div class="label">
                <button @click="getFutureCourses" type="button" class="btn btn-xs label-txt shadow-lg">
                  <span class="inline-block mr-2">Get Future Courses</span>
                </button>
              </div>
              <select class="select select-bordered w-full max-w-xs" v-model="preferredCourse">
                <option value="" disabled selected>Select a course</option>
                <option v-for="course in futureCourses" :value="course" :key="course">{{ course }}</option>
              </select>
              <button type="submit" class="btn btn-md mt-3 shadow-lg">
                  <span class="inline-block mr-2">Get Reccommendations</span>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-4 h-4 inline-block">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
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
