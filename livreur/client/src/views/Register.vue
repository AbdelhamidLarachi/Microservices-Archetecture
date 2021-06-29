<template>
  <v-card
    height="620"
    width="500"
    style="margin-top: 50px"
    class="mx-auto"
    elevation="20"
  >
    <form style="padding: 50px">
      <h1>Inscription</h1>
      <v-text-field
        v-model="name"
        label="Nom"
        required

      ></v-text-field>

      <v-text-field
        v-model="lastname"
        label="Prénom"
        required

      ></v-text-field>

      <v-text-field
        v-model="phone_number"
        label="N° Téléphone"
        type="number"
        required

      ></v-text-field>

      <v-text-field
        v-model="email"
        :error-messages="emailErrors"
        label="E-mail"
        required
        @input="$v.email.$touch()"
        @blur="$v.email.$touch()"
      ></v-text-field>

      <v-text-field
        v-model="password"
        label="Mot de passe"
        type="password"
        required
      ></v-text-field>

      <v-checkbox
        v-model="checkbox"
        :error-messages="checkboxErrors"
        label="Do you agree?"
        required
        @change="$v.checkbox.$touch()"
        @blur="$v.checkbox.$touch()"
      ></v-checkbox>

      <v-btn class="mr-4" @click="submit"> submit </v-btn>
      <v-btn @click="clear"> clear </v-btn>
      <br />
      <br />
      <a @click="navigateToRegister">Vous etes déja inscris ?</a>
    </form>
  </v-card>
</template>
<script>
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
import {api} from "../config/axios";

export default {
  mixins: [validationMixin],

  validations: {
    email: { required, email },
    checkbox: {
      checked(val) {
        return val;
      },
    },
  },

  data: () => ({
    name: "",
    lastname: "",
    email: "",
    password: "",
    phone_number: "",
    checkbox: false,
  }),

  computed: {
    checkboxErrors() {
      const errors = [];
      if (!this.$v.checkbox.$dirty) return errors;
      !this.$v.checkbox.checked && errors.push("You must agree to continue!");
      return errors;
    },

    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
    },
  },

  methods: {
    navigateToRegister() {
      this.$router.push("/login");
    },
    submit() {
      api
        .post("/livreur", {
          credential_id: 18,
          name: this.name,
          lastname: this.lastname,
          phone_number: this.phone_number,
          active: false,
          verified: false,
          private: false,
        })
        .then((res) => {
          localStorage.setItem("livreur_data", JSON.stringify(res.data));
          this.$router.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
      this.$v.$touch();
    },
    clear() {
      this.$v.$reset();
      this.name = "";
      this.email = "";
      this.select = null;
      this.checkbox = false;
    },
  },
};
</script>