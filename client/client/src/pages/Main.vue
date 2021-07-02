<template>
  <Navigation />
</template>




<script>
import Navigation from "../components/Navigation.vue";
export default {
  name: "Main",
  components: {
    Navigation,
  },
  data() {
    return {
      attribute: false,
    };
  },
};
</script>