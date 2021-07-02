<template>
  <nav>
    <v-app-bar color="blue darken-2" dark>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title>Developer App</v-toolbar-title>
      <!-------------------------------------- Notifications dropdown ----------------------------------------->
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" absolute temporary app>
      <v-list nav dense>
        <v-list>
          <v-list-item class="px-2">
            <v-list-item-avatar>
              <v-img
                src="https://pbs.twimg.com/profile_images/1157273718994984961/5kSLSlmP_400x400.jpg"
              ></v-img>
            </v-list-item-avatar>
          </v-list-item>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-title class="text-h6">
                Soltane Benghezal
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

export default {
  data: () => ({
    drawer: false,
    group: null,
    links: [
      {
        icon: "mdi-home",
        text: "Dashboard",
        route: "/",
      },
      { icon: "mdi-account-cog", text: "Paramètres", route: "/settings" },
    ],
    menu: false,
    messages: 0,
    notifications: [],
  }),
  methods: {
    loadDashboard() {
      console.log("Dashboard Loaded !");
    },
    loadArticles() {
      console.log("Articles Loaded !");
    },
    loadMenus() {
      console.log("Menu Loaded !");
    },
    loadCommands() {
      console.log("Commands Loaded !");
    },
    logout() {
      console.log("Logged out");

      router.push({ name: "Login" });
    },
  },
};
</script>