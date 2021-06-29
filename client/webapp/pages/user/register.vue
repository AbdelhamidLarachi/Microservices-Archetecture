<template>
  <v-row justify="center">
    <v-col cols="12" sm="10" md="8" lg="6" xs="12">
      <v-stepper v-model="e1">
        <v-stepper-header>
          <v-stepper-step :complete="e1 > 1" step="1">
            Informations de connexion
          </v-stepper-step>

          <v-divider></v-divider>

          <v-stepper-step :complete="e1 > 2" step="2">
            Informations du profile
          </v-stepper-step>

          <v-divider></v-divider>
        </v-stepper-header>

        <v-stepper-items>
          <v-stepper-content step="1">
            <v-card ref="form">
              <v-card-text>
                <v-text-field
                  v-model="user.email"
                  :rules="[() => !!user.email || 'Ce champs est obligatoire']"
                  label="Email"
                  placeholder="user@gmail.com"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="user.password"
                  :rules="[
                    () => !!user.password || 'Ce champs est obligatoire',
                  ]"
                  :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show1 ? 'text' : 'password'"
                  hint="At least 8 characters"
                  counter
                  @click:append="show1 = !show1"
                  label="Password"
                  placeholder="Password"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="user.passwordConfirm"
                  :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show2 ? 'text' : 'password'"
                  hint="At least 8 characters"
                  counter
                  @click:append="show2 = !show2"
                  label="Confirm Password"
                  placeholder="Password"
                  required
                ></v-text-field>
              </v-card-text>
              <!-- <v-divider class="mt-12"></v-divider> -->
              <v-btn color="primary" @click="nextStep"> Etape suivante </v-btn>

              <v-btn text to="/" > Annuler </v-btn>
            </v-card>
          </v-stepper-content>

          <v-stepper-content step="2">
            <v-card ref="form">
              <v-card-text>
                <v-text-field
                  v-model="user.firstName"
                  :rules="[
                    () => !!user.firstName || 'Ce champs est obligatoire',
                  ]"
                  label="First Name"
                  placeholder="John"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="user.lastName"
                  :rules="[
                    () => !!user.lastName || 'Ce champs est obligatoire',
                  ]"
                  label="Last Name"
                  placeholder="Doe"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="user.address"
                  :rules="[() => !!user.city || 'Ce champs est obligatoire']"
                  label="Adress"
                  placeholder="56 rue de la noix, Paris, 75002"
                  required
                ></v-text-field>
              </v-card-text>

              <!-- <v-divider class="mt-12"></v-divider> -->
              <v-btn color="primary" @click="e1 = 1"> Inscription </v-btn>

            <v-btn text to="/" > Annuler </v-btn>
            </v-card>
          </v-stepper-content>
        </v-stepper-items>
      </v-stepper>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      show1: false,
      show2: false,
      e1: 1,
      user: {
        firstName: null,
        lastName: null,
        email: null,
        password: null,
        passwordConfirm: null,
        address: null,
      },
    };
  },

  methods: {
    nextStep() {
      if(!this.user.email) {
        // vue notifications
        return alert('u must put ur email')
      }
      if(! (this.user.password == this.user.passwordConfirm) ) {
        // vue notification
        return alert('paswd dont match !')
      }
      // axios call sql server db 
      this.e1 = 2
    },
    finalStep() {
      // get user info insert mongo
    },
    register() {
      if (this.user.password !== this.user.passwordConfirm) {
        console.log("user passwd dont match ! ");
        // return this.$notify({
        //   type: 'error',
        //   text: "Password don't match ! "
        // });
      }

      if (
        !this.user.firstName ||
        !this.user.lastName ||
        !this.user.city ||
        !this.user.email ||
        !this.user.password ||
        !this.user.passwordConfirm
      ) {
        console.log("all field are required !");
        // return this.$notify({
        //   type: 'error',
        //   text: 'All Field are required'
        // });
      }

      // Axios instance call to register -> middleware -> api microservices client (node instance)
      //
    },
  },
};
</script>

<style>
</style>