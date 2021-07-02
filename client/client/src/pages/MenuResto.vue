<template>
  <div>
    <v-card  max-width="100%">
      <template slot="progress">
        <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
        ></v-progress-linear>
      </template>

      <v-img
        height="400"
        src="https://images.unsplash.com/photo-1534797258760-1bd2cc95a5bd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1049&q=80"
      ></v-img>

      <v-card-title>{{ restaurateur.name }}</v-card-title>

      <v-card-text>
        <v-row align="center" class="mx-0">
          <div class="grey--text ms-4">{{ restaurateur.phone }}</div>
        </v-row>

        <div class="my-4 text-subtitle-1">{{ restaurateur.address }}</div>

        <div>
          {{ restaurateur.description }}
        </div>
      </v-card-text>

      <v-divider class="mx-4"></v-divider>

      <!-- <v-card-title>Tonight's availability</v-card-title>

    <v-card-text>
      <v-chip-group
        v-model="selection"
        active-class="deep-purple accent-4 white--text"
        column
      >
        <v-chip>5:30PM</v-chip>

        <v-chip>7:30PM</v-chip>

        <v-chip>8:00PM</v-chip>

        <v-chip>9:00PM</v-chip>
      </v-chip-group>
    </v-card-text> -->
    </v-card>
    <div style="margin: 30px">
      <v-row>
      <v-card max-width="344" outlined v-for="menu in menus" :key="menu._id" style="margin: 30px;">
        <v-list-item three-line>
          <v-list-item-content>
            <div class="text-overline mb-4">{{ menu.menuName }}</div>
            <v-list-item-title class="text-h5 mb-1">
              {{ menu.menuPrice }} DA
            </v-list-item-title>
            <v-list-item-subtitle
              >{{ menu.menuDescription }}</v-list-item-subtitle
            >
          </v-list-item-content>

        </v-list-item>


        <v-card-actions>
          <v-btn outlined rounded text @click="commander(menu)"> Commander </v-btn>
        </v-card-actions>
                <v-list-group>
          <v-list-item-group color="dark" v-for="article in menu.articles" :key="article._id" style="margin-left: 20px;">
            {{ article.name }}
            <br />
            <br />
          </v-list-item-group>
        </v-list-group>
      </v-card>
      
      </v-row>
    </div>
  </div>
</template>

<script>
import { api } from "../config";

export default {
  data: () => ({
    search: "",
    dialog: false,
    dialogDelete: false,
    menus: [],
    restaurateur: {},

  }),

  created() {
    // GET Restaurateurs

    this.menus = this.$route.params.restaurateur.menus;
    this.restaurateur = this.$route.params.restaurateur;

      console.log(
        "DATA: ",
        JSON.parse(JSON.stringify(this.$route.params.restaurateur.menus))
      );
  },

  methods: {
    commander(item) {
      console.log(item);

      var postData = {
        restaurateur_id: this.$route.params.restaurateur._id,
        restaurateur_name: this.$route.params.restaurateur.name,
        restaurateur_address: this.$route.params.restaurateur.address,
        restaurateur_phone: this.$route.params.restaurateur.phone,
        id_client: localStorage.getItem("client_id"),
        client_name: "Ryan",
        client_phone: 6554,
        client_address: "Shaoula",
        menu: item.menuName,
        articles: item.articles,
        prix: item.menuPrice,
        payement_method: "Card",
        date: Date(),
        state: 0,
      };

      console.log(postData);

      api
        .post("/api/commandes/add", postData)
        .then((res) => {
          console.log("SERVER RESPONSE", JSON.parse(JSON.stringify(res.data)));
        })

        .catch((e) => console.log(e));
    },
  },
};
</script>
