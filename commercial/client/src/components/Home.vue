<template>
  <div>
    <div>
      <v-card :loading="loading" class="mx-auto my-12" max-width="1400">
        <h1 style="text-align: center">Etat des opérations</h1>
        <b-card-group>
          <b-card
            bg-variant="primary"
            text-variant="white"
            header="Commandes en attente"
            class="text-center"
            style="margin: 20px"
          >
            <b-card-text
              ><p style="font-size: 40px">
                {{ nb_commandes_attente }}
              </p></b-card-text
            >
          </b-card>

          <b-card
            bg-variant="secondary"
            text-variant="white"
            header="Commandes acceptées"
            class="text-center"
            style="margin: 20px"
          >
            <b-card-text
              ><p style="font-size: 40px">
                {{ nb_commandes_acceptee }}
              </p></b-card-text
            >
          </b-card>

          <b-card
            bg-variant="success"
            text-variant="white"
            header="Livraisons acceptées"
            class="text-center"
            style="margin: 20px"
          >
            <b-card-text
              ><p style="font-size: 40px">
                {{ nb_livraison_acceptee }}
              </p></b-card-text
            >
          </b-card>
          <b-card
            bg-variant="info"
            text-variant="white"
            header="Livraisons aquitées"
            class="text-center"
            style="margin: 20px"
          >
            <b-card-text
              ><p style="font-size: 40px">
                {{ nb_livraison_aquitee }}
              </p></b-card-text
            >
          </b-card>
        </b-card-group>
        <TrendChart
          style="height: 500px"
          :datasets="[
            {
              data: [10, 50, 20, 100, 40, 60, 80],
              smooth: true,
              fill: true,
            },

          ]"
          :grid="{
            verticalLines: true,
            horizontalLines: true,
          }"
          :labels="{
            xLabels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            yLabels: 5,
          }"
          :min="0"
        >
        </TrendChart>
      </v-card>
    </div>
  </div>
</template>
<script>
import {api} from "../config/axios";

export default {
  data: () => ({
    nb_commandes_attente: 0,
    nb_commandes_acceptee: 0,
    nb_livraison_acceptee: 0,
    nb_livraison_aquitee: 0,

  }),

  mounted() {
    api
      .get("/stats")
      .then((res) => {
        console.log(res);
        this.nb_commandes_attente = res.data[0].number;
        this.nb_livraison_acceptee = res.data[1].number;
        this.nb_commandes_acceptee = res.data[2].number;
        this.nb_livraison_aquitee = res.data[3].number;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {},
};
</script>