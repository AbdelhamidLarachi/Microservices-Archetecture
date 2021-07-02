<template>
  <div>
    <Navigation />
    <v-card elevation="3" outlined>
      <v-container justify="center" align="center">
        <v-form ref="form" lazy-validation>
          <v-row>
            <v-col cols="12" sm="6" md="3">
              <input
                id="name"
                type="text"
                placeholder="Nom"
                required=""
                v-model="name"
                autofocus=""
                class="form-control rounded-pill border-0 shadow-sm px-4"
              />
            </v-col>
            <v-col cols="12" sm="6" md="3">
              <v-text-field
                label="Téléphone"
                placeholder="0........"
                v-model="phone"
                required
                type="number"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" sm="6" md="3">
              <v-text-field
                label="Email"
                placeholder="...exp@gmail.com"
                v-model="email"
                required
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6" md="3">
              <v-text-field
                :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                :type="show2 ? 'text' : 'password'"
                name="input-10-2"
                label="Mot de passe"
                hint="Au moins 8 caractères"
                value=""
                class="input-group--focused"
                @click:append="show2 = !show2"
                v-model="password"
                required
              ></v-text-field>
            </v-col>
          </v-row>

          <br />
          <v-btn color="success" class="mr-4" @click="save">Enregistrer</v-btn>
        </v-form>
      </v-container>
      <v-snackbar v-model="snackbar" :timeout="timeout">
        Les informations de votre compte ont été modifié
        <template v-slot:action="{ attrs }">
          <v-btn color="blue" text v-bind="attrs" @click="snackbar = false">
            Fermer
          </v-btn>
        </template>
      </v-snackbar>
    </v-card>
  </div>
</template>

<script>

import Vue from "vue";
import { http } from "../config";
import Navigation from "../components/Navigation.vue";
export default {
  name: "Settings",
  components: {
    Navigation,
  },
  data() {
    return {
      name: "dzas",
      phone: "",
      email: "",
      show2: true,
      password: "",
      snackbar: false,
      timeout: 2000,
    };
  },
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    initialize(data) {
      this.name = data.name;
      this.phone = data.phone;
      // this.stats = data.private;
      // password missing
    },
    save() {
      try {
        if (this.name == "" || this.email == "" || this.password == "") {
          throw "Veuillez remplir tous les champs !";
        } else {
          const postData = {
            name: this.name,
            email: this.email,
            phone: this.phone,
            password: this.password,
          };
          const credential_id = 1;
          http
            .put("/api/dev/" + credential_id, postData)
            .then((res) => {
              console.log(res);
              if (res.status == 200) {
                this.snackbar = true;
              }
            })
            .catch((err) => console.log(err));
        }
      } catch (err) {
        console.log(err);
        Vue.swal.fire({
          icon: "error",
          title: "Erreur",
          text: err,
        });
      }
    },
  },

  created() {
    const credential_id = 1;
    http
      .get("/api/dev/" + credential_id)
      .then((res) => {
        if (res.data) {
          this.initialize(res.data.doc);
        }
      })
      .catch((err) => console.log("FRONT NOT RECIEVED: ", err));
  },
};
</script>
