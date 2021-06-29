import Vue from 'vue';
import { Plugin } from 'vue2-storage';

// You can pass options
Vue.use(Plugin, {
    prefix: 'Microservices',
    driver: 'local'
  });
  
  
