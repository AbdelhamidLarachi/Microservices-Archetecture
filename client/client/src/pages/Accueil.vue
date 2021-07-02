<template>
  <div>
    <div style="margin: 20px" v-if="this.commande_state != undefined" >
      <h2 style="text-align: center">Progression de votre commande</h2>
      <v-stepper alt-labels>
        <v-stepper-header>
          <v-stepper-step step="1" :complete="this.commande_state >= 0">
            Commande en attente
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="2" :complete="this.commande_state >= 1">
            Commande acceptée
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step step="3" :complete="this.commande_state >= 2">
            Livraison en cours
          </v-stepper-step>
          <v-divider></v-divider>

          <v-stepper-step step="4" :complete="this.livreur_state == 1">
            Commande livrée
          </v-stepper-step>
        </v-stepper-header>
      </v-stepper>
    </div>
    <v-row style="margin: 30px">
      <v-card
        :loading="loading"
        class="mx-auto my-12"
        max-width="374"
        v-for="rest in restaurateurs"
        :key="rest._id"
      >
        <template slot="progress">
          <v-progress-linear
            color="deep-purple"
            height="10"
            indeterminate
          ></v-progress-linear>
        </template>

        <v-img
          height="250"
          src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
        ></v-img>

        <v-card-title>{{ rest.name }}</v-card-title>

        <v-card-text>
          <v-row align="center" class="mx-0">
            <div class="grey--text ms-4">{{ rest.phone }}</div>
          </v-row>

          <div class="my-4 text-subtitle-1">{{ rest.address }}</div>

          <div>
            {{ rest.description }}
          </div>
        </v-card-text>

        <v-divider class="mx-4"></v-divider>

        <!-- <v-card-title>Tonight's availability</v-card-title>

    <v-card-text>
      <v-chip-group
        v-model="selection"
        active-class="deep-purple accent-4 white--text"
        column
      >
        <v-chip>5:30PM</v-chip>

        <v-chip>7:30PM</v-chip>

        <v-chip>8:00PM</v-chip>

        <v-chip>9:00PM</v-chip>
      </v-chip-group>
    </v-card-text> -->

        <v-card-actions>
          <v-btn color="deep-purple lighten-2" text @click="consulter(rest)">
            Voir
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
  </div>
</template>

<script>
import { api } from "../config";
import router from "../router/index";

export default {
  data: () => ({
    search: "",
    dialog: false,
    restaurateurs: [],
    commande_state: null,
    livreur_state: null,
    deleteDialog: false,
    loading: false,
    selection: 1,
    headers: [
      {
        text: "Nom du Restaurant",
        align: "center",
        value: "name",
      },
      { text: "Description", value: "description", sortable: false },
      { text: "Phone", value: "phone", sortable: false },
      { text: "Action ", value: "actions", sortable: false },
    ],
  }),

  created() {
    // GET Restaurateurs
    api
      .get("/api/commandes/" + localStorage.getItem("client_id"))
      .then((res) => {
        console.log(res);
        res.data = res.data[0];
        this.commande_state = res.data.state;
        if (res.data.state == 2) {
          //Get livraison
          api.get("/api/livraisonsclient/livraison/" + localStorage.getItem("client_id")).then((res) => {
            res.data = res.data[0];
            this.livreur_state = res.data.state
          }).catch((err) => {
            console.log(err);
          })
        }
      })
      .catch((err) => {
        console.log(err);
      });
    api
      .get("/api/restaurateur/")
      .then((res) => {
        this.initialize(res.data);
        console.log(res);
      })
      .catch((err) => console.log("FRONT NOT RECIEVED: ", err));
  },

  methods: {
    initialize(data) {
      this.restaurateurs = data;
    },
    consulter(item) {
      console.log(item);

      router.push({
        path: "/menu-resto",
        name: "MenuResto",
        params: { restaurateur: item },
      });
    },
  },
};
</script>
