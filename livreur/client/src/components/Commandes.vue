<template>
  <div style="margin-top: 30px">
    <v-data-table
      :headers="headers"
      :items="commandes"
      sort-by="calories"
      class="elevation-1"
      :search="search"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Commandes en attente de livraison</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-toolbar-title
            v-if="livreur_data.active"
            style="font-weight: bold; color: red"
            >Vous avez déja une livraison en cours</v-toolbar-title
          >

          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            label="Rechercher..."
            class="mx-4"
          ></v-text-field>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >Confirmer la commande ?
              </v-card-title>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Quiiter</v-btn
                >
                <v-btn color="blue darken-1" text @click="confirm_command"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="dialog_open(item)"
          v-bind:disabled="livreur_data.active"
        >
          mdi-check
        </v-icon>
        <!-- <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon> -->
      </template>
      <!-- <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        Reset
      </v-btn>
    </template> -->
    </v-data-table>
  </div>
</template>

<script>
import {api} from "../config/axios";

export default {
  data: () => ({
    livreur_data: {},
    search: "",
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Restaurateur",
        align: "start",
        sortable: false,
        value: "restaurateur_name",
      },
      { text: "Addresse du restaurateur", value: "restaurateur_address" },
      { text: "Client", value: "client_name" },
      { text: "Addresse du client", value: "client_address" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    commandes: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
    defaultItem: {
      name: "",
      calories: 0,
      fat: 0,
      carbs: 0,
      protein: 0,
    },
  }),

  mounted() {
    this.getData();
  },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.commandes = [];
    },

    dialog_open(item) {
      this.editedIndex = this.commandes.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    getData() {
      api
        .get("/commande")
        .then((response) => {
          console.log(response);
          this.commandes = response.data;
          const livreur_id = localStorage.getItem("livreur_id");
          api.get("/livreur/" + livreur_id).then((response2) => {
            console.log(response);
            this.livreur_data = response2.data;
            console.log(this.livreur_data);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //Confirm commande
    confirm_command() {
      //Update state of commande and create new livraison
      api
        .patch("/commande/" + this.commandes[this.editedIndex]._id, {
          state: 2,
        })
        .then(() => {
          let data = this.commandes[this.editedIndex];
          api
            .post("/livraison/", {
              id_restaurateur: data.id_restaurateur,
              restaurateur_name: data.restaurateur_name,
              restaurateur_address: data.restaurateur_address,
              restaurateur_phone: data.restaurateur_phone,
              id_client: data.id_client,
              client_name: data.client_name,
              client_address: data.client_address,
              client_phone: data.client_phone,
              id_livreur: this.livreur_data._id,
              livreur_name: this.livreur_data.name,
              livreur_phone: this.livreur_data.phone_number,
              articles: data.articles,
              prix: data.prix,
              date: data.date,
              state: 0,
            })
            .then(() => {
              api
                .patch("/livreur/active/" + this.livreur_data._id, {
                  active: true,
                })
                .then((response2) => {
                  this.getData();
                  this.commandes.splice(this.editedIndex, 1);
                  this.closeDelete();
                })
                .catch((err) => {
                  console.log(err);
                });
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.commandes[this.editedIndex], this.editedItem);
      } else {
        this.commandes.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>