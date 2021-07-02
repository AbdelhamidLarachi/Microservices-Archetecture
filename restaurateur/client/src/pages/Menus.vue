<template>
  <div align="center">
    <Navigation />
    <br />
    <br />
    <br />
    <v-card width="1200">
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="menus"
        sort-by="price"
        class="elevation-1"
        :search="search"
        :loading="isLoading"
        loading-text="Chargement des données"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Liste des menus</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px" persistent>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  Ajouter un menu
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>
                <!-- ADD NEW MENU -->
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="12">
                        <v-text-field
                          v-model="editedItem.menuName"
                          label="Donnez un nom à ce menu"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" sm="6" md="12">
                        <v-text-field
                          v-model="editedItem.menuDescription"
                          label="Décrivez ce menu"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" sm="6" md="12">
                        <v-text-field
                          v-model="editedItem.menuPrice"
                          label="Le prix du menu"
                          type="number"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>

                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="12">
                        <v-select
                          :items="articles"
                          label="Sélectionnez parmis les articles existants"
                          @input="selectedArticle"
                          multiple
                          :menu-props="{ maxHeight: '400' }"
                        ></v-select>
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
            <v-dialog v-model="deleteDialog" max-width="500px">
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
            <v-dialog v-model="viewDialog" max-width="1000" persistent>
              <v-card>
                <v-card-title class="text-h5"
                  >{{ viewId.menuName }} :
                  {{ viewId.menuDescription }}</v-card-title
                >
                <v-container
                  v-for="article in viewId.articles"
                  :key="article.name + article.description"
                >
                  <v-list-item-title class="text-h5 mb-1">
                    Article: {{ article.name }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    Description: {{ article.description }}</v-list-item-subtitle
                  >
                </v-container>
                <v-list-item-title class="text-h5 mb-1">
                  Prix : {{ viewId.menuPrice }} DA
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

            <v-dialog v-model="editDialog" max-width="500px">
              <v-card>
                <v-card-title>
                  <span class="text-h5">Editer un menu</span>
                </v-card-title>
                <!-- ADD NEW MENU -->
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="12">
                        <v-text-field
                          v-model="editedItem.menuName"
                          label="Donnez un nom à ce menu"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" sm="6" md="12">
                        <v-text-field
                          v-model="editedItem.menuDescription"
                          label="Décrivez ce menu"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" sm="6" md="12">
                        <v-text-field
                          v-model="editedItem.menuPrice"
                          label="Le prix du menu"
                          type="number"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" sm="6" md="12">
                        <v-subheader>Articles :</v-subheader>
                      </v-col>
                    </v-row>
                  </v-container>

                  <v-container
                    v-for="article in editedItem.articles"
                    :key="article.name + article.description"
                  >
                    <v-row>
                      <v-col cols="12" sm="6" md="12">
                        <v-list-item>
                          <v-list-item-content>
                            <v-list-item-title>{{
                              article.name
                            }}</v-list-item-title>
                            <v-list-item-subtitle>{{
                              article.description
                            }}</v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                      </v-col>
                    </v-row>
                  </v-container>
                  <!-- EDIT SELECT -->
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="12">
                        <v-select
                          :items="articles2"
                          label="Ajouter d'autres articles"
                          @input="selectedArticle2"
                          multiple
                          :menu-props="{ maxHeight: '400' }"
                        ></v-select>
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
          </v-toolbar>
          <v-snackbar v-model="snackbar" :timeout="timeout">
            Le menu {{ deletedMenu }} a été supprimé avec succes
            <template v-slot:action="{ attrs }">
              <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
                Fermer
              </v-btn>
            </template>
          </v-snackbar>
          <v-snackbar v-model="editSnackbar" :timeout="timeout">
            Le menu {{ editedMenu }} a été supprimé avec succes
            <template v-slot:action="{ attrs }">
              <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
                Fermer
              </v-btn>
            </template>
          </v-snackbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small class="mr-2" @click="viewItem(item)"> mdi-eye </v-icon>
          <v-icon small class="mr-2" @click="editDialogOpen(item)">
            mdi-pencil
          </v-icon>
          <v-icon small v-on:click="deleteItem(item)"> mdi-delete </v-icon>
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
    search: "",
    dialog: false,
    deleteDialog: false,
    headers: [
      {
        text: "Nom Menu",
        align: "start",
        sortable: true,
        value: "menuName",
      },
      { text: "Prix", value: "menuPrice" },
      { text: "Description", value: "menuDescription" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    editedIndex: -1,
    editedItem: {
      menuName: "",
      menuDescription: "",
      menuPrice: 0,
      articles: [],
    },
    defaultItem: {
      name: "",
      description: "",
    },
    // articleMenus: [{ name: "", description: "", key: 0, price: 0 }],
    keyCount: 0,
    menuName: "",
    menuPrice: 0,
    menus: [],
    menuDescription: "",
    snackbar: false,
    deletedMenu: "",
    timeout: 3000,
    deleteId: {},
    viewId: {},
    viewDialog: false,
    articles: [],
    articles2: [],
    selected: null,
    selectedArticles: [],
    selectedArticles2: [],
    editDialog: false,
    selected2: null,
    editSnackbar: false,
    editedMenu: "",
    isLoading: true,
    // editArticles = []
  }),

  /*
{
  text: string | number | object,
  value: string | number | object,
  disabled: boolean,
  divider: boolean,
  header: string
}
*/

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Ajouter un menu" : "Editer un menu";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    deleteDialog(val) {
      val || this.closeDelete();
    },
  },

  created() {
    // GET MENUS
    http
      .get("/api/restaurateur/menu/" + restaurateur_id)
      .then((res) => {
        if (res.data) {
          this.initialize(res.data);
        }
      })
      .catch((err) => console.log("FRONT NOT RECIEVED: ", err));
    // GET ARTICLES
    http
      .get("/api/articles/" + restaurateur_id)
      .then((res) => {
        res.data.map((article) => {
          this.articles.push({
            value: article._id,
            text: article.name + " (" + article.description + " ).",
            name: article.name,
            description: article.description,
            price: article.price,
          });
        });
        // console.log("FINAL LIST:", this.articles);
      })
      .catch((err) => console.log("FRONT NOT RECIEVED: ", err));
  },

  methods: {
    initialize(data) {
      this.menus = data;
      this.isLoading = false;
    },

    editItem(item) {
      console.log("clicked", JSON.parse(JSON.stringify(item)));
      this.editedIndex = this.menus.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      console.log("clicked", JSON.parse(JSON.stringify(item.menuName)));
      this.editedIndex = this.menus.indexOf(item);
      this.deleteId = item;
      this.deleteDialog = true;
    },

    editDialogOpen(item) {
      // create a copy of original article
      this.articles2 = this.articles;
      // console.log("item", JSON.parse(JSON.stringify(item)));
      // console.log("articles", JSON.parse(JSON.stringify(this.articles)));
      this.editedItem = Object.assign({}, item);
      this.editedIndex = this.menus.indexOf(item);
      console.log("editedIndex: ", this.editedIndex);
      // console.log(JSON.parse(JSON.stringify(this.editedItem.articles)));
      // REMOVE ITEM FROM ALL ALRTICLES
      var arr = [];
      item.articles.map((one) => {
        arr.push(one._id);
      });
      // console.log('BEFORE: ', this.articles2.length)
      for (var i = 0; i < this.articles2.length; i++) {
        for (var j = 0; j < arr.length; j++) {
          if (this.articles2[i].value == arr[j]) {
            // console.log('FOUND MATCH')
            this.articles2.splice(i, 1);
          }
        }
      }
      // console.log('AFTER: ', this.articles2.length)
      this.editDialog = true;
    },

    deleteItemConfirm() {
      http
        .delete("/api/restaurateur/menus/" + this.deleteId._id, {
          data: { restaurateur_id },
        })
        .then((result) => {
          if (result.data.success) {
            this.menus.splice(this.editedIndex, 1);
            this.deletedMenu = this.deleteId.menuName;
            this.snackbar = true;
          }
        });
      this.close();
    },

    close() {
      this.dialog = false;
      this.deleteDialog = false;
      this.selectedArticles = [];
      this.selectedArticles2 = [];
      this.deleteId = {};
      // this.articleMenus = [{ name: "", description: "", key: 0, price: 0 }];
      this.menuPrice = 0;
      this.menuName = "";
      this.menuDescription = "";
      this.selected = null;
      this.editDialog = false;
      this.editedItem = {
        menuName: "",
        menuDescription: "",
        menuPrice: 0,
        articles: [],
      };
    },

    closeDelete() {
      this.deleteDialog = false;
      this.deleteId = {};
    },

    save(item) {
      // console.log("item: ", JSON.parse(JSON.stringify(item)));
      if (this.editedIndex > -1) {
        // const editData = {
        //   menuName: this.editedItem.menuName,
        //   menuPrice: this.editedItem.menuPrice,
        //   menuDescription: this.editedItem.description,
        //   restaurateur_id: '60d4c95adb3781484841a281',
        //   articles: this.editItem.articles
        // }
        item.restaurateur_id = restaurateur_id;
        http
          .put("/api/restaurateur/menu/" + item._id, item)
          .then((res) => {
            // console.log(res);
            Object.assign(this.menus[this.editedIndex], res.data);
            this.editedMenu = res.data.menuName;
          })
          .catch((err) => console.log(err));
        this.close();
        this.editSnackbar = true;
      } else {
        console.log(this.editedIndex);
        var selectedArticles = [];

        this.selectedArticles.map((article) => {
          selectedArticles.push({
            _id: article.value,
            name: article.text,
            description: article.description,
            price: article.price,
          });
        });

        var postData = {
          articles: selectedArticles,
          menuName: this.editedItem.menuName,
          menuPrice: this.editedItem.menuPrice,
          menuDescription: this.editedItem.menuDescription,
          restaurateur_id
        };
        console.log("postData: ", postData);

        http
          .post("/api/restaurateur/menu", postData)
          .then((res) => {
            console.log(
              "SERVER RESPONSE",
              JSON.parse(JSON.stringify(res.data))
            );
            this.menus.push(res.data);
          })
          .catch((e) => console.log(e));
      }
      this.close();
    },
    addArticleMenu(key) {
      this.keyCount = this.keyCount + 1;
      console.log("keyCount: ", this.keyCount);
      console.log("article.key: ", key);
      this.articleMenus.push({
        name: "",
        description: "",
        key: this.keyCount,
        price: 0,
      });
    },
    // removeArticleMenu(key) {
    //   this.keyCount = this.keyCount - 1;
    //   console.log(key);
    //   var newArray = [];
    //   newArray = this.articleMenus.filter(function (obj) {
    //     return obj.key !== key;
    //   });
    //   console.log(JSON.parse(JSON.stringify(newArray)));
    //   this.articleMenus = newArray;
    // },
    viewItem(item) {
      console.log(JSON.parse(JSON.stringify(item)));
      this.viewId = item;
      this.viewDialog = true;
    },
    closeView() {
      this.viewDialog = false;
      this.viewId = {};
    },
    selectedArticle(event) {
      // event has the selected article's ID
      this.selected = event;
      // we loop through the articles array to store the selected article object in a new array
      for (var i = 0; i < this.articles.length; i++) {
        var last = event[event.length - 1];
        if (this.articles[i].value == last) {
          this.selectedArticles.push(this.articles[i]);
        }
      }
      console.log(JSON.parse(JSON.stringify(this.selectedArticles)));
    },
    selectedArticle2(event) {
      // event has the selected article's ID
      this.selected2 = event;
      console.log(event);
      // we loop through the articles array to store the selected article object in a new array
      for (var i = 0; i < this.articles.length; i++) {
        var last = event[event.length - 1];
        if (this.articles[i].value == last) {
          // this.selectedArticles2.push(this.articles[i]);
          this.editedItem.articles.push(this.articles[i]);
        }
      }
      console.log(
        "SEND TO BACKEND",
        JSON.parse(JSON.stringify(this.selectedArticles2))
      );
    },
  },
};
</script>
