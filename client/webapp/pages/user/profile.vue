<template>
  <v-container align="start">
    <v-row justify="center" align="start">
      <v-col cols="12" sm="10" md="6" lg="6">
        <v-row justify="center">
          <v-avatar color="indigo" justify="center" align="center" size="80">
            <v-icon dark size="60">
              mdi-pencil
            </v-icon>
          </v-avatar>
        </v-row>
        <br /><br />
        <v-card ref="form">
          <v-card-title justify="center" align="center">
            Modifier mon profil
          </v-card-title>
          <v-spacer></v-spacer>
          <v-divider></v-divider>
          <v-card-text>
            <v-text-field
              label="First Name"
              v-model="user.firstName"
              placeholder="John"
              required
            ></v-text-field>
            <v-text-field
              label="Last Name"
              v-model="user.lastName"
              placeholder="Doe"
              required
            ></v-text-field>
            <v-text-field
              label="Email"
              v-model="user.email"
              placeholder="John@email.com"
              required
            ></v-text-field>
            <v-text-field
              label="Mot de passe *"
              v-model="user.password"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="show1 ? 'text' : 'password'"
              hint="At least 8 characters"
              counter
              @click:append="show1 = !show1"
              required
            ></v-text-field>
            <v-text-field label="Ville" v-model="user.city"> </v-text-field>
            
          </v-card-text>
          <v-card-actions>
            <v-btn text>
              Retour
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary" text>
              Appliquer les modifications
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'profile',

  data() {
    return {
      show1: false,
      mobilite: [
        { text: 'Département', value: 1 },
        { text: 'Région', value: 2 },
        { text: 'National', value: 3 },
        { text: 'International', value: 4 }
      ],
      user: {
        initials: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        city : ''
      }
    };
  },
  mounted() {
    // this.getMe();
  },
  methods: {
    // MUST ADD EMAIL VALIDATOR!!!!!!!!!!
    editUser() {
      if (!this.user.password) {
        return this.$notify({
          type: 'error',
          text: ' Mot de passe requis'
        });
      }
      this.$http
        .put('/user/update', this.user)
        .then(({ data }) => {
          this.$notify({
            type: 'success',
            text: 'Updated Successfuly !'
          });
          this.$router.push({ path: '/redirect' });
        })
        .catch(err => {
          return this.$notify({
            type: 'error',
            text: err.response.data.message
          });
        });
    }
  }
};
</script>

<style></style>
