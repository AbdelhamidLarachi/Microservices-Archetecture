<template>
  <v-app>
    <nav>
      <navigation v-bind:title="title"/>
      <clients-component />
    </nav>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Navigation from "../navigator/navigation.vue";
import ClientsComponent from "../components/ClientsComponent.vue";

export default Vue.extend({
  name: "Home",
  
  components: {
    Navigation,
    ClientsComponent
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
