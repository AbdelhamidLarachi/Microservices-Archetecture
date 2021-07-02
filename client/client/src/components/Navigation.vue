<template>
  <nav>
    <v-app-bar color="yellow darken-3" dark>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title>Client App</v-toolbar-title>
      <div class="text-center" style="position: absolute; right: 50px">
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          :nudge-width="200"
          offset-x
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="yellow darken-2" dark v-bind="attrs"  v-on="on">
              <v-badge
                :content="messages"
                :value="messages"
                color="red"
                overlap
              >
                <v-icon color="white">mdi-bell</v-icon>
              </v-badge>
            </v-btn>
          </template>

          <v-card>
            <v-list>
              <v-list-item-content>
                <v-list-item-title style="margin-left: 20px; font-weight: bold"
                  >Notifications</v-list-item-title
                >
              </v-list-item-content>
              <v-divider></v-divider>
            </v-list>
            <v-list v-for="notif in notifications" :key="notif._id">
              <v-list-item>
                <v-list-item-title>{{ notif.description }}</v-list-item-title>
              </v-list-item>
              <v-divider></v-divider>
            </v-list>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn text @click="seen()"> Marquer comme VU </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </div>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary app>
      <v-list nav dense>
        <v-list>
          <v-list-item class="px-2">
            <v-list-item-avatar>
              <v-img src="https://www.pikpng.com/pngl/m/581-5819580_user-client-client-images-png-clipart.png"></v-img>
            </v-list-item-avatar>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="text-h6">
                Ryan Chouarbi
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-divider></v-divider>

          <v-list-item
            v-for="link in links"
            :key="link.text"
            router
            :to="link.route"
          >
            <v-list-item-icon>
              <v-icon color="blue darken-2">{{ link.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ link.text }}</v-list-item-title>
          </v-list-item>
        </v-list-item-group>

        <!-- ITEM WITH CHILDREN -->
        <!-- <v-list-group :value="false" prepend-icon="mdi-account-circle">
          <template v-slot:activator>
            <v-list-item-title>Users</v-list-item-title>
          </template>

          <v-list-item-group
            v-model="group"
            active-class="deep-purple--text text--accent-4"
          >
            <v-list-item>
              <v-list-item-icon>
                <v-icon color="blue darken-2">mdi-home</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Afficher</v-list-item-title>
            </v-list-item>
          </v-list-item-group> -->

        <!-- <v-list-item-group
            v-model="group"
            active-class="deep-purple--text text--accent-4"
          >
            <v-list-item>
              <v-list-item-icon>
                <v-icon color="blue darken-2">mdi-home</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Créer</v-list-item-title>
            </v-list-item>
          </v-list-item-group>
        </v-list-group> -->
      </v-list>

      <template v-slot:append>
        <div class="pa-2" v-on:click="logout()">
          <v-btn block> Logout </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import router from "../router/index";
import { api } from "../config";

export default {
  name: "Navigation",
  data: () => ({
    drawer: false,
    menu: false,
    messages: 0,
    notifications: [],
    group: null,
    links: [
      { icon: "mdi-home", text: "Accueil", route: "/" },
      {
        icon: "mdi-notebook-check-outline",
        text: "Historique des Commandes",
        route: "/commands",
      },
      { icon: "mdi-moped", text: "Vos livraisons", route: "/livraison-client" },
      {
        icon: "mdi-account-cog",
        text: "Paramètres de profil",
        route: "/settings",
      },
    ],
  }),

  mounted() {
    this.getNotifs()
  },

  methods: {
    seen(){
      api.put("/api/notifications/" + localStorage.getItem("client_id")).then((res) => {
          console.log(res);
          this.getNotifs();
      }).catch((err) => {
          console.log(err);
      })
    },
    getNotifs() {
      api
        .get("/api/notifications/" + localStorage.getItem("client_id"))
        .then((response) => {
          this.notifications = response.data;
          this.messages = response.data.length;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    loadAccueil() {
      console.log("Accueil Loaded !");
    },

    loadCommands() {
      console.log("Commands Loaded !");
    },
    logout() {
      console.log("Logged out");

      router.push({ name: "LoginClient" });
    },
  },
};
</script>
