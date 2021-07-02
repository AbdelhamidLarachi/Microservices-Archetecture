import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import Clients from '../views/Clients.vue'
import Login from "../views/Login.vue";

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/clients',
    name: 'Clients',
    component: Clients
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

const isAuthenticated = true

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !isAuthenticated) {
    window.confirm("Vous ne pouvez pas accéder à cette page car vous n'etes pas authentifié !")
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
