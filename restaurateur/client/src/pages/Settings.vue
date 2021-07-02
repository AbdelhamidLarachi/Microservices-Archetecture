<template>
<div>
  <Navigation />
  <v-card elevation="3" outlined>
    <v-container justify="center" align="center">
      <v-form ref="form" lazy-validation>
        <v-row>
          <v-col cols="12" sm="6" md="3">
            <v-text-field
              label="Nom"
              placeholder="Entrez votre nom"
              v-model="name"
              :rules="nameRules"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-textarea
              name="input-7-1"
              label="Adresse"
              v-model="address"
              :rules="addressRules"
              required
            ></v-textarea>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="6" md="3">
            <v-text-field
              label="N° de Téléphone"
              v-model="phone"
              required
              :rules="phoneRules"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-textarea
              name="input-7-1"
              label="Description du restauraunt"
              v-model="description"
              :rules="descriptionRules"
              required
            ></v-textarea>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="6" md="3">
            <v-text-field
              label="Email"
              placeholder="...exp@gmail.com"
              v-model="email"
              :rules="emailRules"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" sm="6" md="3">
            <v-text-field
              :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[pw.required, pw.min]"
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

        <v-row>
          <v-checkbox v-model="stats" v-on:change="toggleCheckbox($event)">
            <template v-slot:label>
              <div>J'accepte que vous partagiez mes statistiques</div>
            </template>
          </v-checkbox>
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
import { http, restaurateur_id } from "../config";
import Navigation from '../components/Navigation.vue'
export default {
  name: "Register",
  components: {
    Navigation
  },
  data() {
    return {
      name: "",
      stats: false,
      description: "",
      phone: "",
      email: "",
      address: "",
      show2: true,
      password: "",
      snackbar: false,
      timeout: 2000,
      pw: {
        required: (value) => !!value || "Obligatoire.",
        min: (v) => v.length >= 8 || "Min 8 caractères",
      },
      nameRules: [
        (v) => !!v || "Le nom est obligatoire",
        (v) =>
          (v && v.length <= 10) ||
          "Le nom ne doit pas dépasser les 10 caractères",
      ],
      emailRules: [
        (v) => !!v || "E-mail est obligatoire",
        (v) => /.+@.+\..+/.test(v) || "E-mail n'est pas valide",
      ],
      phoneRules: [(v) => !!v || "Le numéro de tel est obligatoire"],
      addressRules: [(v) => !!v || "L'adresse est obligatoire"],
      descriptionRules: [(v) => !!v || "La description est obligatoire"],
    };
  },
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    toggleCheckbox(e) {
      this.$nextTick(() => {
        this.stats = e;
        console.log('stats: ', this.stats)
      });
    },
    initialize(data) {
      this.name = data.name;
      this.description = data.description;
      this.phone = data.phone;
      this.email = data.email;
      this.address = data.address;
      this.stats = data.private;
      // password missing
    },
    save() {
      try {
        if (
          this.name == "" ||
          this.email == "" ||
          this.phone == "" ||
          this.password == "" ||
          this.address == "" ||
          this.description == ""
        ) {
          throw "Veuillez remplir tous les champs !";
        } else {
          const postData = {
            name: this.name,
            description: this.description,
            phone: this.phone,
            address: this.address,
            stats: this.stats,
            email: this.email,
            password: this.password,
          };
          http
            .put(
              "/api/restaurateur/" + restaurateur_id,
              postData
            )
            .then((res) => {
              console.log(res);
              if(res.status == 200){
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
    // GET RESTAURATUER INFO
    http
      .get("/api/restaurateur/" + restaurateur_id)
      .then((res) => {
        if (res.data) {
          this.initialize(res.data);
          console.log(res.data);
        }
      })
      .catch((err) => console.log("FRONT NOT RECIEVED: ", err));
  },
};
</script>



