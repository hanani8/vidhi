<template>
  <div id="app" class="container relative mx-auto max-w-md h-screen flex flex-col border-2 border-black">
    <!-- Header Section -->
    <header class="flex items-center justify-between p-4 bg-primary">
      <h1 class="text-2xl font-bold text-primary-content">RTM</h1>

      <div v-if="isAuthenticated != false" class="relative">
        <details class="dropdown">
          <summary class="btn btn-md bg-primary btn-circle"><img src="@/assets/person_1.svg" alt="Person Icon" /></summary>
          <ul class="shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
            <li>
              <button class="btn btn-xs" v-on:click="_logout">Logout</button>
            </li>
          </ul>
        </details>
      </div>
      <div v-else>
        <router-link to="/login" class="text-primary-content">Login</router-link>
      </div>
    
    </header>

    <main class="relative overflow-auto flex-1">
      <router-view/>
    </main>

    <!-- USE DIVIDE-X-WIDTH -->
    <!-- Footer Section -->
    <!-- <footer class="flex justify-between p-4 bg-gray-800 text-white"> -->
      <!-- Three equally spaced buttons -->
      <!-- <button class="flex-1 mx-1 p-2 bg-blue-500 hover:bg-blue-700 rounded-md"><router-link to="/" class="flex flex-row"><img src="@/assets/person.png" class="w-6 h-6"><span class="text-black font-bold text-md">Reccos</span></router-link></button> -->
      <!-- <button class="flex-1 mx-1 p-2 bg-green-500 hover:bg-green-700 rounded-md"><router-link to="/learning_paths" class="flex flex-row"><img src="@/assets/person.png" class="w-6 h-6"><span class="text-black font-bold text-md">Paths</span></router-link></button> -->
      <!-- <button class="flex-1 mx-1 p-2 bg-red-500 hover:bg-red-700 rounded-md"><router-link to="/courses" class="flex flex-row"><img src="@/assets/person.png" class="w-6 h-6"><span class="text-black font-bold text-md">Courses</span></router-link></button> -->
    <!-- </footer> -->
    <div class="px-7 bg-secondary shadow-lg">
      <div class="flex">
          <div class="flex-1 group">
              <router-link to="/" class="flex items-end justify-center text-center mx-auto px-4 pt-2 w-full text-secondary-content group-hover:text-info">
                  <span class="block px-1 pt-1 pb-1">
                      <i class="far fa-regular fa-registered text-2xl pt-1 mb-1 block"></i>
                      <span class="block text-xs pb-2">Home</span>
                      <span class="block w-5 mx-auto h-1 group-hover:bg-indigo-500 rounded-full"></span>
                  </span>
                </router-link>
          </div>

          <div class="flex-1 group">
              <router-link to="/learning_paths" class="flex items-end justify-center text-center mx-auto px-4 pt-2 w-full text-secondary-content group-hover:text-info">
                  <span class="block px-1 pt-1 pb-1">
                      <i class="far fa-duotone fa-bezier-curve text-2xl pt-1 mb-1 block"></i>
                      <span class="block text-xs pb-2">Paths</span>
                      <span class="block w-5 mx-auto h-1 group-hover:bg-indigo-500 rounded-full"></span>
                  </span>
                </router-link>
          </div>

          <div class="flex-1 group">
              <router-link to="/courses" class="flex items-end justify-center text-center mx-auto px-4 pt-2 w-full text-secondary-content group-hover:text-info">
                  <span class="block px-1 pt-1 pb-1">
                      <i class="far fa-solid fa-list text-2xl pt-1 mb-1 block"></i>
                      <span class="block text-xs pb-2">Courses</span>
                      <span class="block w-5 mx-auto h-1 group-hover:bg-indigo-500 rounded-full"></span>
                  </span>
                </router-link>
          </div>
      </div>
  </div>

  </div>
</template>

<style src="./style.css"></style>

<style>
@import url(https://pro.fontawesome.com/releases/v5.10.0/css/all.css);
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: bisque;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<script>
import {mapGetters, mapActions} from "vuex";

export default {
  data() {
    return {
      showDropdown: false,
    };
  },
  computed: {
    ...mapGetters(["isAuthenticated"]),
  },
  methods: {
    ...mapActions(["logout"]),
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    _logout() {
      this.logout();
      if(this.$route.path != "/") {
        this.$router.push("/");
      }
    },
  },
};
</script>
