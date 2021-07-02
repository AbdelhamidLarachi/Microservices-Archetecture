<template>
  <div>
    <Navigation />
    <v-container>
      <v-row>
        <v-col cols="4">
          <v-card height="200">
            <div align="center" justify="center">
              <h1>Boutton</h1>
              <br />
              <div class="d-flex">
                <Button text="Primary" color="primary" />
                <Button text="Secondary" color="secondary" />
                <Button text="Danger" color="danger" />
                <Button text="Warning" color="warning" />
                <Button text="Info" color="info" />
              </div>
              <br />
              <div class="d-flex">
                <Button text="Dark" color="dark" />
                <Button text="Successs" color="success" />
                <Button text="Light" color="light" />
              </div>
            </div>
          </v-card>
        </v-col>

        <v-col cols="4">
          <v-card height="240">
            <div align="center" justify="center">
              <h1>Alert</h1>
              <br />
              <div class="d-flex">
                <Alert text="Primary" type="primary" />
                <Alert text="Secondary" type="secondary" />
                <Alert text="Danger" type="danger" />
                <Alert text="Warning" type="warning" />
              </div>
              <br />
              <div class="d-flex">
                <Alert text="Dark" type="dark" />
                <Alert text="Successs" type="success" />
                <Alert text="Light" type="light" />
                <Alert text="Info" type="info" />
              </div>
            </div>
          </v-card>
        </v-col>
        <v-col cols="4">
          <v-card height="400">
            <div align="center" justify="center">
              <h1>Card</h1>
              <br />
              <Card
                title="CardTitle"
                source="https://picsum.photos/600/300/?image=25"
                imageAlt="cobotique"
                description="Description de la carte"
                buttonText="Confirmer"
              />
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Navigation from "../components/Navigation.vue";
import projetdominante from "projetdominante";


export default {
  components: {
    Navigation,
    ...projetdominante,
  },
  data: () => ({}),
  methods: {
    klimqx() {
      console.log("TEST");
    },
  },
};
</script>
