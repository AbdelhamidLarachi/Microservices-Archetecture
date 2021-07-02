<template>
  <div align="center">
    <Navigation />
    <br />
    <br />
    <br />
    <v-card width="1200">
      <v-data-table
        :headers="headers"
        :items="commands"
        sort-by="price"
        class="elevation-1"
        :loading="isLoading"
        :loading-text="loadingText"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Historique des commands</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-dialog v-model="viewDialog" max-width="1000" persistent>
              <v-card>
                <v-card-title class="text-h5"
                  >Menu : {{viewId.menu}}</v-card-title
                >
                <v-container
                  v-for="article in viewId.articles"
                  :key=article._id
                >
                  <v-list-item-title class="text-h5 mb-1">
                    Article: {{ article.name }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    Description: {{ article.description }}</v-list-item-subtitle
                  >
                </v-container>
                <v-list-item-title class="text-h5 mb-1">
                  Prix : {{viewId.prix}} DA
                </v-list-item-title>
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
        text: "Date commande",
        align: "start",
        sortable: true,
        value: "data.date",
      },
      { text: "Menu", value: "data.menu" },
      { text: "Prix", value: "data.prix" },
      { text: "Paiement", value: "data.payement_method" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    commands: [],
    isLoading: true,
    loadingText: "Chargement des données",
    selectedItem: {},
    viewDialog: false,
    viewId: {},
  }),
  async created() {
    const getCommands = await http.get(
      "/api/commands/history/" + restaurateur_id);
    if (getCommands.data) {
      this.initialize(getCommands.data);
    } else {
      this.loadingText = "Aucune commande";
    }
  },
  methods: {
    initialize(data) {
      console.log(JSON.parse(JSON.stringify(data)));
      this.commands = data;
      this.isLoading = false;
    },
    // CLOSE ACCEPT OR REJECT DIALOG
    close() {},
    viewItem(item) {
      console.log(JSON.parse(JSON.stringify(item)));
      this.viewId = item.data;
      this.viewDialog = true;
    },
    closeView() {
      this.viewDialog = false;
      this.viewId = {};
    },
  },
};
</script>