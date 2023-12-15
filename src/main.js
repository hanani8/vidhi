import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import axios from 'axios';

axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://localhost:5000/api'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    this.$store.dispatch('initAuth').then((userData) => {
      if (userData) {
        if(userData.role == "admin") {
            this.$router.push({name: 'admin'})
        } else {
            this.$router.push({name: 'home'})
        }
      }
    }).catch((error) => {
      console.error("Authentication error:", error);
      this.$router.push({name: 'login'})
    })
  }
}).$mount('#app')
