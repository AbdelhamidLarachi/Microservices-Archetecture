<template>
  <div align="center">
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
            <v-dialog v-model="viewDialog" max-width="400" persistent>
              <v-card style="text-align: center;">
                  <br />

                <v-list-item-subtitle class="text-h5" style="text-align: center;"
                  >Date : {{ viewId.date }}</v-list-item-subtitle>
                  <br />
                <v-list-item-subtitle>
                  Nom du restaurateur :
                  {{ viewId.restaurateur_name }}</v-list-item-subtitle
                >
                <v-list-item-subtitle>
                  Téléphone du Restauranteur :
                  {{ viewId.restaurateur_phone }}</v-list-item-subtitle
                >
                <v-list-item-subtitle>
                  Nom Livreur : {{ viewId.livreur_name }}</v-list-item-subtitle
                >
                <v-list-item-subtitle>
                  Téléphone Livreur :
                  {{ viewId.livreur_phone }}</v-list-item-subtitle
                >
                <v-list-item-subtitle>
                  Prix de la commande : {{ viewId.prix }} DA</v-list-item-subtitle
                >
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
        <!-- <template v-slot:no-data>
          <v-btn color="primary" @click="initialize"> Reset </v-btn>
        </template> -->
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import { api } from "../config";

export default {
  name: "LivraisonClient",

  data: () => ({
    dialog: false,
    headers: [
      {
        text: "Nom du Restauranteur",
        align: "start",
        sortable: true,
        value: "restaurateur_name",
      },
      { text: "Nom du Livreur", value: "livreur_name" },
      { text: "Telephone Livreur", value: "livreur_phone" },
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
    const getLivraisons = await api.get("/api/livraisonsclient/" + localStorage.getItem("client_id"),
      {
        responseType: "json",
      }
    );
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
