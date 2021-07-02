<template>
  <div style="margin: 50px" >
  <v-data-table
    :headers="headers"
    :items="commandes"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Commandes disponiblles</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Confirmer la commande ?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">Quiiter</v-btn>
              <v-btn color="blue darken-1" text @click="confirm_command">OK</v-btn>
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
import { http, restaurateur_id } from "../config";

  export default {
    data: () => ({
      dialog: false,
      dialogDelete: false,
      headers: [
        {
          text: 'Restaurateur',
          align: 'start',
          sortable: false,
          value: 'restaurateur_name',
        },
        { text: 'Addresse du restaurateur', value: 'restaurateur_address' },
        { text: 'Client', value: 'client_name' },
        { text: 'Addresse du client', value: 'client_address' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      commandes: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
      defaultItem: {
        name: '',
        calories: 0,
        fat: 0,
        carbs: 0,
        protein: 0,
      },
    }),

    mounted(){
        http.get("/commande").then((response) => {
          this.commandes = response.data
        }).catch((err) => {
          console.log(err);
        })
    },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.commandes = []
      },

      dialog_open (item) {
        this.editedIndex = this.commandes.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      confirm_command () {
        console.log(this.commandes[this.editedIndex]._id)
        //this.commandes.splice(this.editedIndex, 1)
        http.patch("/commande/" + this.commandes[this.editedIndex]._id, {
          state: "2"
        }).then((response) => {
            console.log(response);
        }).catch((err) => {
          console.log(err);
        })
        this.closeDelete()
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.commandes[this.editedIndex], this.editedItem)
        } else {
          this.commandes.push(this.editedItem)
        }
        this.close()
      },
    },
  }
</script>