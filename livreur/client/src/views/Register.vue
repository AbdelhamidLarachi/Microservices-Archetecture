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
        v-model="user.name"
        label="Nom"
        required

      ></v-text-field>

      <v-text-field
        v-model="user.lastname"
        label="Prénom"
        required

      ></v-text-field>

      <v-text-field
        v-model="user.phone_number"
        label="N° Téléphone"
        type="number"
        required

      ></v-text-field>

      <v-text-field
        v-model="user.email"
        :error-messages="emailErrors"
        label="E-mail"
        required
        @input="$v.email.$touch()"
        @blur="$v.email.$touch()"
      ></v-text-field>

      <v-text-field
        v-model="user.password"
        label="Mot de passe"
        type="password"
        required
      ></v-text-field>

      <v-text-field
        v-model="user.passwordConfirm"
        label="Confirmer Mot de passe"
        type="password"
        required
      ></v-text-field>

      <v-checkbox
        v-model="user.checkbox"
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
    </form>
  </v-card>
</template>
<script>
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
import {api} from "../config/axios";
import axios from "axios";

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
    user: {
      credential_id: 18,
      name: "",
      lastname: "",
      email: "",
      password: "",
      passwordConfirm: "",
      phone_number: "",
      checkbox: false,
      active: false,
      verified: false,
      private: false
  }
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
      // check password match
      if(this.user.passwordConfirm != this.user.password){
        window.alert("Password do not match");
        return;
      }

      this.user.role = "livreur";
      axios.post('signup', this.user).then((res) => {
          
          if(res.status == 201){
            this.register();
            window.alert("Registred");
            this.$router.push({ path: 'login' });   
          } else {
            window.alert("Try again.");
          }
        }).catch(function(err) {
          // display err
          console.log(err);
        });
      
    },
    clear() {
      this.$v.$reset();
      this.user.name = "";
      this.user.email = "";
      this.user.checkbox = false;
    },

    register(){
      api
        .post("/livreur", this.user)
        .then((res) => {
          localStorage.setItem("livreur_data", JSON.stringify(res.data));
          this.$router.push("/");
        })
        .catch((err) => {
          console.log(err);
        });
      this.$v.$touch();
    }
  },
};
</script>