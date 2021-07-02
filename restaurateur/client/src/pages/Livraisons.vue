<template>
  <div align="center">
    <Navigation />
    <br />
    <br />
    <br />
    <v-card width="1200">
      <v-data-table
        :headers="headers"
        :items="livraisons"
        sort-by="price"
        class="elevation-1"
        :loading="isLoading"
        :loading-text="loadingText"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Liste des livraisons</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-dialog v-model="viewDialog" max-width="1000" persistent>
              <v-card>
                <v-card-title class="text-h5"
                  >Date : {{viewId.date}}</v-card-title
                >
                  <v-list-item-subtitle>
                    Nom client : {{ viewId.client_name }}</v-list-item-subtitle>
                  <v-list-item-subtitle>
                    Téléphone Client : {{ viewId.client_phone }}</v-list-item-subtitle>
                  <v-list-item-subtitle>
                    Nom Livreur : {{ viewId.livreur_name }}</v-list-item-subtitle>
                  <v-list-item-subtitle>
                    Téléphone Livreur : {{ viewId.livreur_phone }}</v-list-item-subtitle>
                  <v-list-item-subtitle>
                    Prix de la commande : {{ viewId.prix }}</v-list-item-subtitle>
                <!-- <v-container
                  v-for="article in viewId.articles"
                  :key=article._id
                >
                  <v-list-item-title class="text-h5 mb-1">
                    Article: {{ article.name }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    Description: {{ article.description }}</v-list-item-subtitle
                  >
                </v-container> -->
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeView"
                    >Retour</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="viewItem(item)" color="blue">
            mdi-eye
          </v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize"> Reset </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>

import { http, restaurateur_id } from "../config";
import Navigation from '../components/Navigation.vue'
export default {
  components: {
    Navigation
  },
  data: () => ({
    dialog: false,
    headers: [
      {
        text: "Adresse client",
        align: "start",
        sortable: true,
        value: "client_address",
      },
      { text: "Nom Livreur", value: "livreur_name" },
      { text: "Telephone Livreuer", value: "livreur_phone" },
      { text: "Prix", value: "prix" },
      { text: "Etat", value: "state" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    livraisons: [],
    isLoading: true,
    loadingText: "Chargement des données",
    selectedItem: {},
    viewDialog: false,
    viewId: {},
  }),

  async created() {
    const getLivraisons = await http.get("/api/livraisons/" + restaurateur_id);
    if (getLivraisons.data) {
      this.initialize(getLivraisons.data);
    } else {
      this.loadingText = "Aucune Livraison";
    }
    console.log(JSON.parse(JSON.stringify(getLivraisons.data)));
  },

  methods: {
    initialize(data) {
      this.livraisons = data;
      this.isLoading = false;
    },

    // CLOSE ACCEPT OR REJECT DIALOG
    close() {},

    viewItem(item) {
      console.log(JSON.parse(JSON.stringify(item)));
      this.viewId = item;
      this.viewDialog = true;
    },
    closeView() {
      this.viewDialog = false;
      this.viewId = {};
    },
  },
};
</script>
