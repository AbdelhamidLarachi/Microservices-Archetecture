<template>
  <v-layout>
  <v-card>
    <v-card-title>
      Logs
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="logs"
      :search="search"
    ></v-data-table>
  </v-card>
  </v-layout>
</template>
<script>

  import VLayout from '@/layouts/Default.vue';
  import { http } from "@/config/index.js";

  export default {
    name: 'LogsIndex',
    components: {
      VLayout
    },

    /*
     mounted: function () {
       //this.initializeChoices()
     },
    */

    data () {
      return {
        search: '',
        headers: [
          { text: 'User id', align: 'start', sortable: false, value: 'userid'},
          { text: 'Agent', value: 'agent', sortable: false},
          { text: 'Type', value: 'type', sortable: false },
          { text: 'CreatedAt', value: 'createdAt' },
          { text: 'Version', value: 'version' },
        ],
        logs: [
          {
            userid: 'Frozen Yogurt',
            agent: 159,
            type: 6.0,
            version: 24,
            createdAt: "21/04/1999",
          },
          {
            userid: 'Frozen Yogurt',
            agent: 159,
            type: 6.0,
            version: 24,
            createdAt: "21/04/1999",
          },
        ],
      }
    },
    
    /*
    * getLogs() on component mount
    */
   
    mounted() {
      this.getLogs();
    },


    methods: {

      /*
      * Will log the user in.
      *
      * @param {Object} user The user to be logged in.
      */
     
      getLogs() {

        /* 
        @GET * logs
        */

        http.get('technique/log').then((res) => {
          this.logs = res.data;
        }).catch(function(err) {
          // display err
          console.log(err);
        });
        
      },
    },
  }
</script>