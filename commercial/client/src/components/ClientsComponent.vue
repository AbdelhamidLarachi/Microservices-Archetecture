<template>
  <v-data-table
    :headers="headers"
    :items="clients"
    sort-by="calories"
    class="elevation-1"
    style="margin: 100px"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Clients</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Voulez vous vraiment supprimer cet utilisateur ?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Cancel</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogSuspend" max-width="500px">
          <v-card>
            <v-card-title  class="text-h5"
              >Etes-vous sur de vouloir modifier le statut de cet utilisateur?</v-card-title
            >

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeSuspend"
                >Cancel</v-btn
              >
              <v-btn color="blue darken-1" text @click="suspendItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small @click="suspendItem(item)"> mdi-account </v-icon>
      <br />
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template>
  </v-data-table>
</template>
<script>
import {api} from "@/config/axios";
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    dialogSuspend: false,
    headers: [
      {
        text: "Nom",
        align: "start",
        value: "name",
      },
      { text: "Prenom", value: "lastname" },
      { text: "N° téléphone", value: "phone_number" },
      { text: "Addresse", value: "address" },
      { text: "Suspendu", value: "suspended" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    clients: [],
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
    dialogSuspend(val) {
      val || this.closeSuspend();
    },
  },

  mounted() {
    this.getData();
  },

  methods: {
    initialize(data) {
      this.clients = data;
    },
    getData() {
      api
        .get("/clients")
        .then((res) => {
          this.initialize(res.data);
          console.log(res.data)
        })
        .catch((err) => {
          console.log(err);
        });
    },
    suspendItem(item) {
      this.editedIndex = this.clients.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogSuspend = true;
    },
    deleteItem(item) {
      this.editedIndex = this.clients.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      api
        .delete("/clients/" + this.clients[this.editedIndex]._id)
        .then((res) => {
          console.log(res.data);
          this.clients.splice(this.editedIndex, 1);
          this.closeDelete();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    suspendItemConfirm() {
      var status 
      if(this.clients[this.editedIndex].suspended){
        status = false
      }else{
        status = true
      }
      api
        .put("/clients/" + this.clients[this.editedIndex]._id, {
          suspended: status 
        })
        .then((res) => {
          console.log(res.data);
          this.getData();
          this.closeSuspend();
        })
        .catch((err) => {
          console.log("");
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

    closeSuspend() {
      this.dialogSuspend = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },
  },
};
</script>