import Register from "../pages/Register.vue";
import Login from "../pages/Login.vue";
import VueRouter from "vue-router";
import Dashboard from '../pages/Dashboard.vue';
import Settings from '../pages/Settings.vue'



const routes = [
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
      path: '/',
      name: 'Dashboard',
      component: Dashboard
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  }
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
