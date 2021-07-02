import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import VueRouter from 'vue-router'
import router from './router/index'
import { BootstrapVue } from 'bootstrap-vue'

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin

Vue.config.productionTip = false
Vue.use(VueSweetalert2);
Vue.use(VueRouter);



new Vue({
  vuetify,
  render: h => h(App),
  router
}).$mount('#app')
