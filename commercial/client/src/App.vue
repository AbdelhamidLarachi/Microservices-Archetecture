<template>
  <v-app>

    <v-main>
      <router-view />
    </v-main>

  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import { BootstrapVue } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue);

export default Vue.extend({
  name: "App",

});
</script>
