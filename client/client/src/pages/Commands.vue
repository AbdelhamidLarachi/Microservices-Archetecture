<template>
  <div align="center">
    <br />
    <br />
    <br />
    <v-card width="1200">
      <v-data-table
        :headers="headers"
        :items="commandes"
        sort-by="price"
        class="elevation-1"
        :loading="isLoading"
        :loading-text="loadingText"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Historique de vos commandes</v-toolbar-title>
            <v-spacer></v-spacer>

            <v-dialog v-model="viewDialog" max-width="1000" persistent>
              <v-card>
               <v-card-title v-if="Object.keys(viewId).length > 0" class="text-h5"
                  > Menu  : {{ viewId.articles[0].menuName }}
                  </v-card-title
                >
                <v-container
                  v-for="article in viewId.articles"
                  :key=article._id
                >
                  <!-- <v-list-item-title class="text-h5 mb-1">
                    Article: {{viewId.articles[0].description }}
                  </v-list-item-title> -->
                  <v-list-item-subtitle>
                    Description: {{ viewId.articles[0].menuDescription }}</v-list-item-subtitle
                  >
                  <v-list-item-title class="text-h5 mb-1">
                  Prix : {{viewId.prix}} DA
                </v-list-item-title>
                </v-container>
                
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
        <template  v-slot:[`item.actions`]="{ item }">
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
import { api } from "../config";


export default {
  data: () => ({
    dialog: false,
    headers: [
      {
        text: "Nom du Resto",
        align: "start",
        sortable: true,
        value: "restaurateur_name",
      },
      { text: "Menu", value: "articles[0].menuName" },
      { text: "Prix", value: "prix" },
      { text: "Date commande", value: "date" },
      { text: "Etat", value: "state" },
      { text: "Paiement", value: "payement_method" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    commandes: [],
    isLoading: true,
    loadingText: "Chargement des données",
    selectedItem: {},
    viewDialog: false,
    viewId: {},
  }),

  async created() {
    const getCommandes = await 
    api.get("/api/commandes/history/" + localStorage.getItem("client_id"),
      {
        responseType: "json",
      }
    );
    if (getCommandes.data) {
      this.initialize(getCommandes.data);
    } else {
      this.loadingText = "Aucune commande";
    }
    console.log(JSON.parse(JSON.stringify(getCommandes.data)));
  },

  methods: {
    initialize(data) {
      this.commandes = data;
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