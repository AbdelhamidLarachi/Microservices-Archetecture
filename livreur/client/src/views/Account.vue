<template>
  <v-app>
    <nav>
      <navigation v-bind:title="title"/>
      <account-component />
    </nav>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Navigation from "../navigator/navigation.vue";
import AccountComponent from "../components/Account.vue";

export default Vue.extend({
  name: "Account",
  
  components: {
    Navigation,
    AccountComponent
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
