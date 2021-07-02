import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import VueRouter from 'vue-router'
import router from './router/index'
export { default as RegisterClient }
from './pages/RegisterClient.vue'

Vue.config.productionTip = false
Vue.use(VueSweetalert2);
Vue.use(VueRouter);

localStorage.setItem("client_id", "60d8da8b6dc4d448e467f23e");


new Vue({
    vuetify,
    render: h => h(App),
    router
}).$mount('#app')