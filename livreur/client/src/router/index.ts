import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Commandes from "../views/Commandes.vue"
import Account from "../views/Account.vue"


//Import components

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/commandes',
    name: 'Commandes',
    component: Commandes
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/account',
    name: "Account",
    component: Account
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  }
]

const router = new VueRouter({
  routes
})


interface IUser {
  id: number;
  email: string;
  role: number;
  token: string;
}




router.beforeEach((to, from, next) => {
  const isAuthenticated = "user" in localStorage;
  if (to.name !== 'Login' && !isAuthenticated) {
    window.confirm("Vous ne pouvez pas accéder à cette page car vous n'etes pas authentifié !")
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
