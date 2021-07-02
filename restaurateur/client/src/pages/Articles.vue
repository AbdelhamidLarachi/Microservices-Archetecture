<template>
  <div align="center">
    <Navigation />
    <br />
    <br />
    <br />
    <v-card width="1200">
      <v-data-table
        :headers="headers"
        :items="articles"
        sort-by="price"
        class="elevation-1"
        :loading="isLoading"
        loading-text="Chargement des données"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Liste des articles</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  Ajouter un article
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          v-model="editedItem.name"
                          label="Nom d'article"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          v-model="editedItem.price"
                          label="Prix"
                        ></v-text-field>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="12" sm="6" md="12">
                        <v-textarea
                          solo
                          v-model="editedItem.description"
                          label="Decrivez l'article"
                        ></v-textarea>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    Annuler
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="save(editedItem)">
                    Enregistrer
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h5"
                  >Are you sure you want to delete this item?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete"
                    >Cancel</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm()"
                    >OK</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-snackbar v-model="snackbar" :timeout="timeout">
              L'article {{ deletedArticle }} a été supprimé avec succes
              <template v-slot:action="{ attrs }">
                <v-btn color="blue" text v-bind="attrs" @click="closeSnack">
                  Fermer
                </v-btn>
              </template>
            </v-snackbar>
            <v-snackbar v-model="snackAdd" :timeout="timeout">
              L'article {{ addArticle }} a été ajouté avec succes
              <template v-slot:action="{ attrs }">
                <v-btn color="blue" text v-bind="attrs" @click="closeSnack">
                  Fermer
                </v-btn>
              </template>
            </v-snackbar>
            <v-snackbar v-model="snackEdit" :timeout="timeout">
              L'article {{ editArticle }} a été modifié avec succès
              <template v-slot:action="{ attrs }">
                <v-btn color="blue" text v-bind="attrs" @click="closeSnack">
                  Fermer
                </v-btn>
              </template>
            </v-snackbar>
          </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
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
    dialogDelete: false,
    headers: [
      {
        text: "Nom Article",
        align: "start",
        sortable: true,
        value: "name",
      },
      { text: "Prix", value: "price" },
      { text: "Description", value: "description" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    articles: [],
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
    snackbar: false,
    snackAdd: false,
    deletedArticle: "",
    timeout: 3000,
    selectedItem: {},
    isLoading: true,
    addArticle: "",
    snackEdit: false,
    editArticle: "",
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1
        ? "Ajouter un produit"
        : "Editer un produit";
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

  async created() {
    console.log(restaurateur_id)
    const getArticles = await http.get("/api/articles/" + restaurateur_id);
    this.initialize(getArticles.data);
    console.log(JSON.parse(JSON.stringify(getArticles.data)));
  },

  methods: {
    initialize(data) {
      this.articles = data;
      this.isLoading = false;
    },

    editItem(item) {
      this.editedIndex = this.articles.indexOf(item);
      console.log(this.editedIndex);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.articles.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
      this.selectedItem = item;
    },

    deleteItemConfirm() {
      console.log(JSON.parse(JSON.stringify(this.selectedItem)));
      http
        .delete("/api/articles/" + this.selectedItem._id)
        .then((res) => {
          if (res.data.success) {
            this.articles.splice(this.editedIndex, 1);
            this.closeDelete();
            this.deletedArticle = this.selectedItem.name;
            this.snackbar = true;
          }
        })
        .catch((err) => console.log(err));
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

    save(item) {
      if (this.editedIndex > -1) {
        const postData = {
          name: this.editedItem.name,
          price: this.editedItem.price,
          description: this.editedItem.description,
        };

        http
          .put("/api/articles/" + item._id, postData)
          .then((res) => {
            if (res.status == 200) {
              console.log(res.data)
              this.snackEdit = true;
              this.editArticle = res.data.name;
              // Object.assign(this.articles[this.editedIndex], res.data);
              // console.log('INDEX; ', this.articles[this.editedIndex])
            } else {
              console.log('ERROR', res);
            }
          })
          .catch((err) => console.log('ERROR', err));
      } else {
        var postData = {
          name: this.editedItem.name,
          price: this.editedItem.price,
          description: this.editedItem.description,
          restaurateur_id,
        };

        http
          .post("/api/articles/add", postData)
          .then((res) => {
            if (res.data.success) {
              console.log(
                "Add : ",
                JSON.parse(JSON.stringify(res.data.article))
              );
              this.articles.push(res.data.article);
              this.addArticle = res.data.article.name;
              this.snackAdd = true;
            }
          })
          .catch((e) => console.log(e));
      }
      this.close();
    },
    closeSnack() {
      this.snackbar = false;
      this.deletedArticle = "";
    },
  },
};
</script>
