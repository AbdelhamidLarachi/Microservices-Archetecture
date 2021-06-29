<template>
  <div>
    <v-card style="margin-top: 30px" max-width="500" v-if="livreur_active">
      <v-row>
        <v-card-title> Livraison en cours 🟢 </v-card-title>
        <v-btn
          elevation="2"
          style="position: absolute; right: 20px; top: 20px"
          small
          @click="dialog_handler()"
          >Aquitter</v-btn
        >
      </v-row>
      <v-card-title> Client </v-card-title>
      <v-card-subtitle>
        Addresse de livraison : {{ livraison.client_address }} <br />
        N° de téléphone : {{ livraison.client_phone }}
      </v-card-subtitle>

      <v-card-title> Restaurateur </v-card-title>
      <v-card-subtitle>
        Nom : {{ livraison.restaurateur_name }} <br />
        Addresse de recuperation : {{ livraison.restaurateur_address }} <br />
        N° de téléphone : {{ livraison.restaurateur_phone }}
      </v-card-subtitle>
      <v-card-subtitle> </v-card-subtitle>

      <v-card-actions>
        <p style="font-weight: bold; margin-left: 10px">Voir plus de détails</p>

        <v-spacer></v-spacer>

        <v-btn icon @click="show = !show">
          <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
        </v-btn>
      </v-card-actions>

      <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>

          <v-card-text>
            Prix : {{ livraison.prix }} DA<br />
            Articles :
            <ul>
              <li v-for="article in livraison.articles" :key="article.name">
                {{ article.name }}
              </li>
            </ul>
          </v-card-text>
        </div>
      </v-expand-transition>
      <v-dialog v-model="dialog_aquitter" persistent max-width="400">
        <v-card>
          <v-card-title class="text-h5"> Aquitter la livraison </v-card-title>
          <v-card-text
            >Confirmez la reception du client des articles suivants : <br />
            <br />
            Articles :
            <ul>
              <li v-for="article in livraison.articles" :key="article.name">
                {{ article.name }}
              </li>
            </ul>
            <br />
            ainsi que le bon paiement de cette somme : {{ livraison.prix }} DA
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color=" darken-1" text @click="dialog_handler()">
              Annuler
            </v-btn>
            <v-btn color="green darken-1" text @click="aquitter_livraison()">
              Confirmer
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>

    <v-card style="margin-top: 30px" max-width="500" v-else>
      <v-row>
        <v-card-title> Aucune livraison en cours 🟢 </v-card-title>
      </v-row>
    </v-card>
  </div>
</template>
<script>
import {api} from "../config/axios";

export default {
  data: () => ({
    show: false,
    livraison: null,
    dialog_aquitter: false,
    livreur_active: false,
    livreur_id : localStorage.getItem("livreur_id")
  }),

  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      //Get active livraison
    
      api
        .get("/livraison/active/" +this.livreur_id)
        .then((res) => {
          this.livraison = res.data;
          api.get("/livreur/" + this.livreur_id).then((response) =>{
              this.livreur_active = response.data.active
          }).catch((err) => {
              console.log(err);
          })
        })
        .catch((err) => {
          console.log(err);
        });
    },
    dialog_handler() {
      this.dialog_aquitter = !this.dialog_aquitter;
    },
    aquitter_livraison() {
      api
        .patch("/livraison/state/" + this.livraison._id)
        .then((res) => {
            console.log(res);
            api.patch("/livreur/active/" + this.livreur_id).then((res2) => {
              console.log(res2);
            }).catch((err) => {
              console.log(err);
            })
            this.getData()
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>