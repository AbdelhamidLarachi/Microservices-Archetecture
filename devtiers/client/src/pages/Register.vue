<template>
  <div class="container-fluid">
    <div class="row no-gutter">
      <!-- The image half -->
      <div class="col-md-6 d-none d-md-flex bg-image"></div>
      <!-- The content half -->
      <div class="col-md-6 bg-light">
        <div class="login d-flex align-items-center py-5">
          <v-form ref="form" v-model="valid" lazy-validation>
            <!-- Demo content-->
            <div class="container">
              <div class="row">
                <div class="col-lg-10 col-xl-7 mx-auto">
                  <h3 class="display-4">Bienvenue</h3>
                  <form>
                    <div class="form-group mb-3">
                      <v-text-field
                        label="Nom"
                        placeholder="Entrez votre nom"
                        v-model="name"
                        :rules="nameRules"
                        required
                      ></v-text-field>
                    </div>
                    <div class="form-group mb-3">
                      <v-text-field
                        label="N° de Téléphone"
                        v-model="phone"
                        required
                        type="number"
                        :rules="phoneRules"
                      ></v-text-field>
                    </div>
                    <div class="form-group mb-3">
                      <v-text-field
                        label="Email"
                        placeholder="...exp@gmail.com"
                        v-model="email"
                        :rules="emailRules"
                        required
                      ></v-text-field>
                    </div>
                    <div class="form-group mb-3">
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
                    </div>
                    <v-btn
                      class="
                      btn btn-primary btn-block
                      text-uppercase
                      mb-2
                      rounded-pill
                      shadow-sm
                    "
                      v-on:click="validate"
                    >
                      S'inscrire
                    </v-btn>
                    <div
                      class="text-center d-flex justify-content-between mt-4"
                    >
                      <p>
                        Vous êtes déja inscrit ?
                        <u v-on:click="redirectLogin()">Connectez</u> vous
                      </p>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </v-form>
          <!-- End -->
        </div>
      </div>
      <!-- End -->
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { http } from "../config";
import router from "../router/index";

export default {
  name: "Register",
  data() {
    return {
      valid: true,
      name: "",
      phone: "",
      email: "",
      password: "",
      show2: false,
      //   RULES FOR INPUTS (MIDDLEWARE)
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
    };
  },
  methods: {
    signUp() {
      try {
        if (
          this.name == "" ||
          this.email == "" ||
          this.phone == "" ||
          this.password == "" ||
          this.isNumber(this.phone) == false
        ) {
          throw "Veuillez remplir tous les champs correctement !";
        } else {
          const postData = {
            name: this.name,
            email: this.email,
            password: this.password,
            phone: this.phone,
          };
          console.log(postData);
          http
            .post("/api/dev/add", postData)
            .then((res) => {
              console.log("Server response :", res);
              if (res.status == 200) {
                this.redirectDashboard();
              }
            })
            .catch((e) => console.log("FRONT END ERROR", e.message));
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
    redirectLogin() {
      router.push({ name: "Login" });
    },
    redirectDashboard() {
      router.push({ name: "Dashboard", path: "/" });
    },
    validate() {
      this.$refs.form.validate();
      this.signUp();
    },
    reset() {
      this.$refs.form.reset();
    },
    isNumber(n) {
      return /^-?[\d.]+(?:e-?\d+)?$/.test(n);
    },
  },
};
</script>

<style>
.login,
.image {
  min-height: 100vh;
}
.bg-image {
  /* https://therichpost.com/wp-content/uploads/2021/02/login-split.jpg */
  background-image: url("../../public/images/bg4.jpg");
  background-size: cover;
  background-position: center center;
}
</style>
