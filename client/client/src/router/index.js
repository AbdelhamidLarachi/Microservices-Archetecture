import VueRouter from "vue-router";

import RegisterClient from "../pages/RegisterClient.vue";
import LoginClient from "../pages/LoginClient.vue";

// import Main from '../pages/Main.vue';
import Accueil from '../pages/Accueil.vue';
import MenuResto from '../pages/MenuResto.vue'
import Commands from '../pages/Commands.vue'
import Settings from '../pages/Settings.vue'
import LivraisonsClient from '../pages/LivraisonsClient.vue'


const routes = [


    {
        path: '/register_client',
        name: 'RegisterClient',
        component: RegisterClient,
    },
    {
        path: '/login',
        name: 'LoginClient',
        component: LoginClient,
    },


    {
        path: '/',
        name: 'Accueil',
        component: Accueil
    },


    {
        path: '/commands',
        name: 'Commands',
        component: Commands
    },

    {
        path: '/menu-resto',
        name: 'MenuResto',
        component: MenuResto
    },

    {
        path: '/settings',
        name: 'Settings',
        component: Settings
    },

    {
        path: '/livraison-client',
        name: 'LivraisonClient',
        component: LivraisonsClient
    },



];

const router = new VueRouter({
    mode: 'history',
    routes,
});

export default router;