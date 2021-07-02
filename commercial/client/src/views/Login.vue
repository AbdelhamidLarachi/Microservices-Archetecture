<template>
  <v-card height="500" width="500" style="margin-top: 100px" class="mx-auto">
    <form style="padding: 100px">
      <h1>Connexion</h1>

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
      <v-btn class="mr-4" @click="submit"> submit </v-btn>
      <v-btn @click="clear"> Reset </v-btn>
      <br />
      <br />
      <br />
      <a @click="navigateToRegister">Vous n'etes pas encore inscris ?</a>
    </form>
  </v-card>
</template>
<script>
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";
import axios from "axios"
import { baseURL } from "../config/axios";


export default {
  mixins: [validationMixin],

  validations: {
    email: { required, email },
    select: { required },
    checkbox: {
      checked(val) {
        return val;
      },
    },
  },

  mounted() {
    localStorage.clear();
  },

  data: () => ({
    email: "",
    password: "",
  }),

  computed: {
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
      this.$router.push("/register");
    },

    submit() {
      this.$v.$touch();

      const user = {
        email: this.email,
        password: this.password,
        role: 3,
        version: 1.1
      }

       axios.post(`${baseURL}/login`, user).then((res) => {
         
          if(res.status == 200){
            console.log(res.data.token)
            res.data.user.token = res.data.token;
            localStorage.setItem('user', JSON.stringify(res.data.user));
            localStorage.setItem("livreur_id", "60cf7cfa73a25e515cd4d73b");
            this.$router.push("/");
          }

        }).catch(function(err) {
          // display err
          console.log(err);
        });

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