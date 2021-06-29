<template>
  <v-card max-width="700" max-height="500" outlined>
    <v-list-item three-line>
      <v-list-item-content>
        <div class="text-overline mb-4">Gerer mon compte</div>
        <v-list-item-title class="text-h5 mb-1"
          >{{ data.name }} {{ data.lastname }}</v-list-item-title
        >
        <br />
        <br />
        <br />

        <div class="text-overline mb-4">Autres informations</div>
        <v-list-item-subtitle
          >Numéro de téléphone : {{ data.phone_number }}</v-list-item-subtitle
        >
      </v-list-item-content>

      <v-list-item-avatar tile size="80" color="grey"></v-list-item-avatar>
    </v-list-item>

    <v-card-actions>
      <v-btn outlined rounded text @click="dialog_updateform()">
        Modifier
      </v-btn>
      <v-btn outlined rounded text @click="dialog_delete()">
        Supprimer mon compte
      </v-btn>
    </v-card-actions>

    <!------------------------------------ Update form dialog -------------------------------------->
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-text-field
              label="Nom"
              required
              type="text"
              v-model="name"
              v-bind:value="data.name"
            ></v-text-field>
            <v-text-field
              label="Prénom"
              type="text"
              v-model="lastname"
              hint="example of helper text only on focus"
              v-bind:value="data.lastname"
            ></v-text-field>
            <v-text-field
              label="N° Téléphone"
              type="number"
              v-model="phone_number"
              v-bind:value="data.phone_number"
              required
            ></v-text-field>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="update_account()">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>

      <!------------------------------------ Delete dialog -------------------------------------->
    </v-dialog>
    <v-dialog v-model="dialog_delete_var" persistent max-width="400">
      <v-card>
        <v-card-title class="text-h5">
          Etes-vous sur de vouloir supprimer votre compte ?
        </v-card-title>
        <v-card-text
          >Si vous supprimez votre compte, vous perdez definitivement accés à ce
          dernier. Faites pas le fou.</v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color=" darken-1" text @click="dialog_delete_var = false">
            Annuler
          </v-btn>
          <v-btn color="red darken-1" text @click="delete_account()">
            Confirmer
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>
<script>
import {api} from "../config/axios";
export default {
  name: "Account",
  data: () => ({
    livreur_id: localStorage.getItem("livreur_id"),
    data: {},
    name: null,
    lastname: null,
    phone_number: null,
    dialog: false,
    dialog_delete_var: false,
  }),
  mounted() {
    this.getData();
  },
  methods: {
    dialog_updateform() {
      this.dialog = !this.dialog;
    },
    dialog_delete() {
      this.dialog_delete_var = !this.dialog_delete_var;
    },
    update_account() {
      api
        .patch("/livreur/" + this.livreur_id, {
          name: this.name,
          lastname: this.lastname,
          phone_number: this.phone_number,
        })
        .then((response) => {
          console.log(response);
          this.getData();
        })
        .catch((err) => {
          console.log(err);
        });
      this.dialog_updateform();
    },

    getData() {
      api
        .get("/livreur/" + this.livreur_id)
        .then((response) => {
          console.log(response);
          this.data = response.data;
          this.name = this.data.name;
          this.lastname = this.data.lastname;
          this.phone_number = this.data.phone_number;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    delete_account() {
      api
        .delete("/livreur/" + this.livreur_id)
        .then((res) => {
          console.log(res);
          this.$router.push("/login");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>