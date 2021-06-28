<template>
  <v-app>
    <nav>
      <navigation v-bind:title="title" />
      <commandes-component />
    </nav>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import CommandesComponent from "../components/Commandes.vue";
import Navigation from "../navigator/navigation.vue";


export default Vue.extend({
  name: "Commandes",
  components: {
    CommandesComponent,
    Navigation
  },
  
  data(){
      return {
      title: this.$options.name
      }
  },
  methods :{
    redirect(){
      this.$router.push('login');
    }
  }
});
</script>
