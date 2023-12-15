<template>
  <div id="app" class="mx-auto max-w-md min-h-screen flex flex-col border-2 border-black">
    <!-- Header Section -->
    <header class="flex items-center justify-between p-4 bg-gray-800 text-white">
      <h1 class="text-2xl font-bold">DataForge</h1>

      <div v-if="isAuthenticated != false" class="relative">
        <button @click="toggleDropdown">
            <img src="@/assets/person_1.svg" alt="Person Icon" class="w-8 h-8 text-white" />
        </button>
        <!-- Dropdown -->
        <div v-if="showDropdown" class="absolute right-0 mt-2 bg-black shadow-md rounded-md p-2">
          <!-- Dropdown content goes here -->
          <button v-on:click="_logout">Logout</button>
          <!-- You can customize the dropdown content as needed -->
        </div>
      </div>
      <div v-else>
        <router-link to="/login">Login</router-link>
      </div>
    
    </header>

    <main class="flex-1 overflow-y-auto">
      <router-view/>
    </main>

    <!-- USE DIVIDE-X-WIDTH -->
    <!-- Footer Section -->
    <footer class="flex justify-between p-4 bg-gray-800 text-white">
      <!-- Three equally spaced buttons -->
      <button class="flex-1 mx-1 p-2 bg-blue-500 hover:bg-blue-700 rounded-md"><router-link to="/" class="flex flex-row"><img src="@/assets/person.png" class="w-6 h-6"><span class="text-black font-bold text-md">Reccos</span></router-link></button>
      <button class="flex-1 mx-1 p-2 bg-green-500 hover:bg-green-700 rounded-md"><router-link to="/learning_paths" class="flex flex-row"><img src="@/assets/person.png" class="w-6 h-6"><span class="text-black font-bold text-md">Paths</span></router-link></button>
      <button class="flex-1 mx-1 p-2 bg-red-500 hover:bg-red-700 rounded-md"><router-link to="/courses" class="flex flex-row"><img src="@/assets/person.png" class="w-6 h-6"><span class="text-black font-bold text-md">Courses</span></router-link></button>
    </footer>

  </div>
</template>

<style src="./style.css"></style>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: bisque;
  height: 100%
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
      this.toggleDropdown();
      this.$router.push("/");
    },
  },
};
</script>
