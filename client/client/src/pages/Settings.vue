<template>
  <v-card elevation="3" outlined>
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
            <v-text-field
              label="Nom"
              placeholder="Entrez votre nom"
              v-model="lastname"
              :rules="nameRules"
              required
            ></v-text-field>
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
            ></v-textarea>
          </v-col>
        </v-row>

        <!-- <v-row>
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
        </v-row> -->

       
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
</template>




<script>
import Vue from "vue";
import { api } from "../config";

export default {
  name: "Register",
  data() {
    return {
      name: "",
      lastname:" ",
      stats: false,
      phone_number: "",
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
      this.lastname = data.lastname;
      this.phone_number = data.phone_number;
      this.email = data.email;
      this.address = data.address;
      this.password= data.password;
    },
    save() {
      try {
        if (
          this.name == "" ||
          this.lastname == "" ||
          this.email == "" ||
          this.phone_number == "" ||
          this.password == "" ||
          this.address == "" 
          
        ) 
        
        {
          throw "Veuillez remplir tous les champs !";
        } else {
          const postData = {
            name: this.name,
            lastname: this.lastname,
            phone_number: this.phone_number,
            address: this.address
          };
          api
            .put("/api/client/" + localStorage.getItem("client_id"),
              postData,
            )
            .then((res) => {
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
    // GET client INFO
    api
      .get("/api/client/" + localStorage.getItem("client_id"))
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



