<template>
  <div>
    <v-app-bar color="green" dark>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title>{{ title }}</v-toolbar-title>

      <!-------------------------------------- Notifications dropdown ----------------------------------------->
      <div class="text-center" style="position: absolute; right: 50px">
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          :nudge-width="200"
          offset-x
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="green" dark v-bind="attrs" v-on="on">
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
            <v-list v-for="notif in notifications" :key="notif">
              <v-list-item>
                <v-list-item-title>{{ notif.description }}</v-list-item-title>
              </v-list-item>
              <v-list-item-action>
                <v-row>
                  <v-btn color="red" text @click="menu = false">
                    Refuser
                  </v-btn>
                  <v-btn color="green" text @click="menu = false">
                    Accepter
                  </v-btn>
                </v-row>
              </v-list-item-action>
              <v-divider></v-divider>
            </v-list>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn text @click="menu = false"> Fermer </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </div>
    </v-app-bar>

    <!------------------------------------- Sidebar Menu ------------------------------------------------->
    <v-navigation-drawer v-model="drawer" absolute temporary app>
      <v-list>
        <v-list-item class="px-2">
          <v-list-item-avatar>
            <v-img
              src="https://randomuser.me/api/portraits/man/85.jpg"
            ></v-img>
          </v-list-item-avatar>
        </v-list-item>

        <v-list-item link>
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              {{ livreur_data.name }} {{ livreur_data.lastname }}
            </v-list-item-title>
            <v-list-item-subtitle
              style="color: green"
              v-if="livreur_data.active"
              >Livraison en cours</v-list-item-subtitle
            >
            <v-list-item-subtitle v-else
              >Aucune livraison en cours</v-list-item-subtitle
            >
          </v-list-item-content>
        </v-list-item>
      </v-list>

      <v-divider></v-divider>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item @click="redirect('/')">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-item @click="redirect('commandes')">
            <v-list-item-icon>
              <v-icon>mdi-archive</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Commandes</v-list-item-title>
          </v-list-item>

          <v-list-item @click="redirect('account')">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Account</v-list-item-title>
          </v-list-item>
          <v-list-item @click="redirect('login')">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-title
              ><v-list-item-title
                >Déconnecter</v-list-item-title
              ></v-list-item-title
            >
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {api} from "../config/axios";

export default Vue.extend({
  name: "Navigation",
  props: ["title"],
  data: () => ({
    drawer: false,
    group: null,
    livreur_data: {},
    show: false,
    livreur_id: localStorage.getItem("livreur_id"),
    // Notification dropdown values
    menu: false,
    messages: 0,
    notifications: [],
  }),
  mounted() {
    api
      .get("/livreur/" + this.livreur_id)
      .then((res) => {
        console.log(res.data);
        this.livreur_data = res.data;
        api
          .get("/notification/" + this.livreur_id)
          .then((res2) => {
            this.notifications = res2.data;
            this.messages = this.notifications.length;
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    redirect(path: string) {
      this.$router.push(path);
    },
  },
});
</script>