<template>
  <v-layout>
  <v-data-table
    :headers="headers"
    :items="components"
    sort-by="category"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Components</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              New Component
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.name"
                      label="Component name"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-select
                    :items="categories"
                    v-model="editedItem.category"
                    label="Category"
                    dense
                    outlined
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-select
                    :items="subCategories"
                    v-model="editedItem.subCategory"
                    label="Sub-Category"
                    dense
                    outlined
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.npm"
                      label="Npm"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.description"
                      label="Description"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close"> Cancel </v-btn>
              <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
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
              <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                >OK</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
      <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template>
  </v-data-table>
  </v-layout>
</template>

<script>

/* ============
 * Account Index Page
 * ============
 *
 * Page where the user can view the account information.
 */

  import VLayout from "@/layouts/Default.vue";
  import { http } from "@/config/index.js";

  export default {
    /**
     * The name of the page.
     */
    name: "ComponentsIndex",

    /**
     * The components that the page can use.
     */
    components: {
      VLayout
    },

    data: () => ({
      categories: ["layout", "inputs", "navigation", "feedback", "surfaces", "dataDisplay", "lab", "alert"],
      subCategories: ["dataGrid", "button", "buttonGroup", "tooltip", "table", "list", "dialog", "stepper", "link", "switch", "select", "grid", "textfeild", "alert" ],
      dialog: false,
      dialogDelete: false,
      headers: [
        { text: 'Component', align: 'start', sortable: false, value: 'name' },
        { text: 'Category', value: 'category', sortable: false},
        { text: 'Sub-Category', value: 'subCategory', sortable: false },
        { text: 'Npm', value: 'npm', sortable: false },
        { text: 'Description', value: 'description', sortable: false },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      components: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        category: '',
        subCategory: '',
        npm: '',
        description: '',
      },
      defaultItem: {
        name: '',
        category: '',
        subCategory: '',
        npm: '',
        description: '',
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Component' : 'Edit Item'
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
      this.load()
    },

    methods: {
      initialize () {
        this.components = [
          {
            name: 'Frozen Yogurt',
            category: 159,
            subCategory: 6.0,
            npm: 24,
            description: 4.0,
          },
          {
            name: 'Ice cream sandwich',
            category: 237,
            subCategory: 9.0,
            npm: 37,
            description: 4.3,
          },
          {
            name: 'Eclair',
            category: 262,
            subCategory: 16.0,
            npm: 23,
            description: 6.0,
          },
          {
            name: 'Cupcake',
            category: 305,
            subCategory: 3.7,
            npm: 67,
            description: 4.3,
          }
        ]
      },

      editItem (item) {
        this.editedIndex = this.components.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        /*
        this.editedIndex = this.components.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
        */
        http.post('components/delete', { id: item._id }).then((res) => {
          this.load();
        }).catch(function(err) {
          // display err
          console.log(err);
        });
      },

      deleteItemConfirm () {
        this.components.splice(this.editedIndex, 1)
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
          Object.assign(this.components[this.editedIndex], this.editedItem)
        } else {
          this.editedItem.sourceCode = "<script/>"

          http.post('components/add', this.editedItem).then((res) => {
            console.log(res);
          }).catch(function(err) {
            // display err
            console.log(err);
          });

          this.components.push(this.editedItem)
        }
        this.close()
      },


      load () {
        http.get('technique/components/all').then((res) => {
          this.components = res.data;
        }).catch(function(err) {
          // display err
          console.log(err);
        });
      },
    }
  };
</script>

