<template>
  <div id="app">
    <v-app>
      <nav>
        <navigation v-bind:title="title" />

        <home-component />
      </nav>
    </v-app>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Navigation from "../navigator/navigation.vue";
import HomeComponent from "../components/Home.vue";

export default Vue.extend({
  name: "Home",
  components: {
    Navigation,
    HomeComponent,
  },
  data() {
    return {
      title: this.$options.name,
    };
  },
  methods: {
    redirect() {
      this.$router.push("login");
    },
  },
});
</script>
