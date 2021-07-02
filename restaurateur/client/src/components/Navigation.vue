<template>
  <nav>
    <v-app-bar color="blue darken-2" dark>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title>Restaurateur App</v-toolbar-title>
      <!-------------------------------------- Notifications dropdown ----------------------------------------->
      <div class="text-center" style="position: absolute; right: 50px">
        <v-menu
          v-model="menu"
          :close-on-content-click="false"
          :nudge-width="260"
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
                <p v-if="messages > 1">Vous avez {{messages}} nouvelles commandes</p>
                <p v-if="messages < 2">Vous avez {{messages}} nouvelle commande</p>
                <v-btn v-if="messages > 0" color="primary" @click="consulter"> Consulter </v-btn>
            </v-list>


            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn text @click="menu = false"> Fermer </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </div>
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
import { restaurateur_id, http } from "../config";

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
      { icon: "mdi-food", text: "Articles", route: "/articles" },
      { icon: "mdi-view-list", text: "Menues", route: "/menus" },
      { icon: "mdi-menu", text: "Commandes", route: "/commands" },
      { icon: "mdi-update", text: "Historique", route: "/history" },
      { icon: "mdi-moped", text: "Livraisons", route: "/livraisons" },
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
    initialize(data) {
      this.notifications = data;
      this.messages = data.length;
    },
    consulter(){
      http.put('/api/notifications/' + restaurateur_id, this.notifications).then((res) => {
        console.log(res)
        if(res.status == 200){
          router.push({name: 'Commands', path:"/commands"})
          this.messages = 0;
          this.menu = false;
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  },
  async mounted() {
    const getNotifications = await http.get("/api/notifications/" + restaurateur_id);
    console.log(
      "NOTIFICATIONS",
      JSON.parse(JSON.stringify(getNotifications.data))
    );
    this.initialize(getNotifications.data);
  },
};
</script>