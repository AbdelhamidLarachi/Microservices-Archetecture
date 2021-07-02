<template>
  <v-app>
    <v-content>
    <Navigation />
      <router-view />
    </v-content>
    <!-- <v-main> -->
      
    <!-- </v-main> -->
  </v-app>
</template>

<script>
import Navigation from './components/Navigation.vue'
export default {
  name: "App",

  components: {
    Navigation
  },

  data: () => ({
    //
  }),
};
</script>
