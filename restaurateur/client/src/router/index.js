import Register from "../pages/Register.vue";
import Login from "../pages/Login.vue";
import VueRouter from "vue-router";
import Dashboard from '../pages/Dashboard.vue';
import Menus from '../pages/Menus.vue'
import Articles from '../pages/Articles.vue'
import Commands from '../pages/Commands.vue'
import Settings from '../pages/Settings.vue'
import History from '../pages/History.vue'
import Livraisons from '../pages/Livraisons.vue'


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
      path: '/commands',
      name: 'Commands',
      component: Commands
  },
  {
      path: '/articles',
      name: 'Articles',
      component: Articles
  },
  {
      path: '/menus',
      name: 'Menus',
      component: Menus
  },
  {
      path: '/articles',
      name: 'Articles',
      component: Articles
  },
  {
    path: '/settings',
    name: 'Settings',
    component: Settings
  },
  {
    path: '/history',
    name: 'History',
    component: History
  },
  {
    path: '/livraisons',
    name: 'Livraisons',
    component: Livraisons
  }
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
