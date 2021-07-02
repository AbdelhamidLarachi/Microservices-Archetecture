<template>
  <div>
    <v-app-bar color="blue" dark>
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
            <v-btn color="blue" dark v-bind="attrs" v-on="on">
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
              Name Lastname
            </v-list-item-title>

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
            <v-list-item-title>Dashboard</v-list-item-title>
          </v-list-item>

          <v-list-item @click="redirect('/clients')">
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Clients</v-list-item-title>
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

export default Vue.extend({
  name: "Navigation",
  props: ["title"],
  data: () => ({
    drawer: false,
    group: null,
    show: false,
    // Notification dropdown values
    menu: false,
    messages: 0,
    notifications: [],
  }),
  mounted() {

  },
  methods: {
    redirect(path: string) {
      this.$router.push(path);
    },
  },
});
</script>