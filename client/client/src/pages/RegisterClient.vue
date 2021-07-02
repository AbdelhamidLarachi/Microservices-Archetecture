<template>
  <v-card elevation="3" outlined>
    <br />
    <v-container justify="center" align="center">
      <v-form ref="form" lazy-validation>
        <v-row>
          <v-col cols="12" sm="6" md="3">
            <v-text-field
              label="Prénom"
              placeholder="Entrez votre prénom"
              v-model="name"
              :rules="nameRules"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-textarea
              name="input-7-1"
              label="Nom"
              placeholder="Entrez votre nom"
              v-model="lastname"
              :rules="lastnameRules"
              required
              rows="1"
            ></v-textarea>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" sm="6" md="3">
            <v-text-field
              label="N° de Téléphone"
              v-model="phone_number"
              required
              :rules="phoneRules"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-textarea
              name="input-7-1"
              label="Adresse"
              v-model="address"
              :rules="addressRules"
              required
              rows="1"
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

        <!-- <v-row>
          <v-checkbox v-model="stats" v-on:change="toggleCheckbox($event)">
            <template v-slot:label>
              <div>J'accepte que vous partagiez mes données personnelles</div>
            </template>
          </v-checkbox>
        </v-row> -->

        <v-row v-on:click="redirectLogin()">
          <h5>Vous disposez déja d'un compte ? Connectez vous !</h5>
        </v-row>
        <br />
        <v-btn color="success" class="mr-4" @click="signUp()"> Créer </v-btn>
        <v-btn color="error" class="mr-4" @click="reset"> Reset </v-btn>
      </v-form>
    </v-container>
  </v-card>
</template>

<script>
import Vue from "vue";
import router from "../router/index";
import { api } from "../config";

export default {
  name: "RegisterClient",
  data() {
    return {
      name: "",
      lastname:"",
      stats: false,
      phone_number: "",
      email: "",
      address: "",
      show2: true,
      password: "",
      pw: {
        required: (value) => !!value || "Obligatoire.",
        min: (v) => v.length >= 8 || "Min 8 caractères",
      },
      nameRules: [
        (v) => !!v || "Le prénom est obligatoire",
        (v) =>
          (v && v.length <= 15) ||
          "Le nom ne doit pas dépasser les 10 caractères",
      ],
      lastnameRules: [
        (v) => !!v || "Le nom est obligatoire",
        (v) =>
          (v && v.length <= 15) ||
          "Le nom ne doit pas dépasser les 15 caractères",
      ],
      emailRules: [
        (v) => !!v || "E-mail est obligatoire",
        (v) => /.+@.+\..+/.test(v) || "E-mail n'est pas valide",
      ],
      phoneRules: [(v) => !!v || "Le numéro de telephone est obligatoire"],
      addressRules: [(v) => !!v || "L'adresse est obligatoire"],
    };
  },
  created(){
    api.get("/api/client").then((res) => {
        console.log(res)
    }).catch((e) => {
        console.log(e)
    })
  },
  methods: {
    signUp() {
      try {
        if (
          this.name == "" ||
          this.lastname == "" ||
          this.email == "" ||
          this.phone_number == "" ||
          this.password == "" ||
          this.address == ""
        ) {
          throw "Veuillez remplir tous les champs !";
        } else {
          console.log("on est là !");

          const postData = {
            credential_id: 12,
            name: this.name,
            lastname: this.lastname,
            email: this.email,
            password: this.password,
            phone_number: this.phone_number,
            address: this.address,
          };
          api
            .post("/api/client/add", postData)
            .then((res) => {
              console.log("Server response :", res);
            })
            .catch((e) => console.log(" Error : " + e));
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
    validate() {
      this.$refs.form.validate();
      this.signUp();
    },
    reset() {
      this.$refs.form.reset();
    },
    redirectLogin() {
      router.push({ name: "LoginClient" });
    },

    // toggleCheckbox(e) {
    //   this.$nextTick(() => {
    //     this.stats = e;
    //   });
    // },
  },
};
</script>
