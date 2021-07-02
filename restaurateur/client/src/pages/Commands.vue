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
            <v-toolbar-title>Liste des commands</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-dialog v-model="acceptDialog" max-width="500px">
              <v-card>
                <v-card-title class="text-h5"
                  >Voulez vous accepter cette commande ?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close()"
                    >Retour</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="accept"
                    >Confirmer</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="rejectDialog" max-width="500px">
              <v-card>
                <v-card-title class="text-h5"
                  >Voulez vous rejeter cette commande ?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close()"
                    >Retour</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="reject"
                    >Confirmer</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="rejectButton(item)" color="red">
            mdi-close
          </v-icon>
          <v-icon small @click="acceptButton(item)" color="green"> mdi-check</v-icon>
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
        value: "date",
      },
      { text: "Menu", value: "menu" },
      { text: "Prix", value: "prix" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    commands: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      price: 0,
      description: "",
    },
    defaultItem: {
      name: "",
      price: 0,
      description: "",
    },
    timeout: 3000,
    isLoading: true,
    loadingText: "Chargement des données",
    acceptDialog: false,
    rejectDialog: false,
    selectedIndex: -1,
    selectedItem: {}
  }),
  watch: {
    acceptDialog(val) {
      val || this.close();
    },
    rejectDialog(val) {
      val || this.close();
    },
  },
  async created() {
    const getCommands = await http.get("/api/commands/" + restaurateur_id);
    if (getCommands.data) {
      this.initialize(getCommands.data);
    } else {
      this.loadingText = "Aucune commande";
    }
    console.log('Commands', JSON.parse(JSON.stringify(getCommands.data)));
  },
  methods: {
    initialize(data) {
      this.commands = data;
      this.isLoading = false;
    },
    accept() {
      console.log('ACCEPTED: ', JSON.parse(JSON.stringify(this.selectedItem)))
      const command_id = this.selectedItem._id;
      const postData = { newState: 1 };
      http
        .put("/api/commands/" + command_id, postData)
        .then((res) => {
          if (res.status == 200) {
            console.log(res.data);
            this.commands.splice(this.selectedIndex, 1);
          } else {
            console.log("ERROR", res);
          }
        })
        .catch((err) => console.log("ERROR", err));
        this.close();
    },
    reject() {
        console.log(JSON.parse(JSON.stringify(this.selectedItem)))
      const command_id = this.selectedItem._id;
      const postData = { newState: 2 };
      http
        .put("/api/commands/" + command_id, postData)
        .then((res) => {
          if (res.status == 200) {
            console.log(res.data);
            this.commands.splice(this.selectedIndex, 1);
          } else {
            console.log("ERROR", res);
          }
        })
        .catch((err) => console.log("ERROR", err));
        this.close();
    },
    // CLOSE ACCEPT OR REJECT DIALOG
    close() {
      this.acceptDialog = false;
      this.rejectDialog = false;
    },
    rejectButton(item){
        this.selectedIndex = this.commands.indexOf(item);
        this.selectedItem = item;
        console.log('INDEX: ', this.selectedIndex)
        this.rejectDialog = true;
    },
    acceptButton(item){
        this.selectedIndex = this.commands.indexOf(item);
        this.selectedItem = item;
        console.log('INDEX: ', this.selectedIndex)
        this.acceptDialog = true;
    }
  },
};
</script>