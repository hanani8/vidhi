import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/learning_paths',
    name: 'learning_paths',  
    component: () => import(/* webpackChunkName: "learning_paths" */ '../views/LearningPathsView.vue')
  },
  {
    path: '/courses',
    name: 'courses',  
    component: () => import(/* webpackChunkName: "courses" */ '../views/CourseListView.vue')
  },
  {
    path: '/recommendations',
    name: 'recommendations',  
    component: () => import(/* webpackChunkName: "recommendations" */ '../views/RecommendationResultsView.vue')
  },
  {
    path: '/course/:course_id',
    name: 'course',  
    component: () => import(/* webpackChunkName: "course" */ '../views/CourseDetailsView.vue'),
  },
  {
    path: '/admin',
    name: 'admin',  
    component: () => import(/* webpackChunkName: "admin" */ '../views/AdminHomeView.vue'),
  },
  {
    path: '/student/:student_id',
    name: 'student',  
    component: () => import(/* webpackChunkName: "student" */ '../views/StudentDetailsView.vue'),
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = new VueRouter({
  routes
})

// import store from '../store/index.js';

// function userRouteGuard(to, from, next) {
//   let isAuthenticated = store.getters.isAuthenticated;
//   let isUser = store.getters.isUser;


//   if (isAuthenticated && isUser) {
//       next(); // allow to enter route
//   } else {
//       next('/login');
//       return false; // go to '/login';
//   }
// }

// function adminRouteGuard(to, from, next) {
//   let isAuthenticated = store.getters.isAuthenticated;
//   let isAdmin = store.getters.isAdmin;


//   if (isAdmin && isAuthenticated) {
//       next(); // allow to enter route
//   } else {
//       next('/admin/login');
//       return false; // go to '/login';
//   }
// }

export default router
