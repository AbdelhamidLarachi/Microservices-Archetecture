<template>
  <v-row justify="center">
    <v-col cols="12" sm="10" md="8" lg="6">
      <v-card ref="form">
        <v-card-title justify="center">
          Se connecter
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="user.email"
            :rules="[() => !!user.email || 'This field is required']"
            label="Email"
            placeholder="user@gmail.com"
            required
          ></v-text-field>
          <v-text-field
            v-model="user.password"
            :rules="[() => !!user.password || 'This field is required']"
            :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show1 ? 'text' : 'password'"
            hint="At least 8 characters"
            counter
            @click:append="show1 = !show1"
            label="Password"
            placeholder="Password"
            required
          ></v-text-field>
        </v-card-text>
        <v-divider class="mt-12"></v-divider>
        <v-card-actions>
          <v-btn text>
            Annuler
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="login">
            Se connecter
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      show1: false,
      user: {
        email: null,
        password: null
      }
    };
  },
  methods: {
    login() {
      if (!this.user.email || !this.user.password) {
        return this.$notify({
          type: 'error',
          text: 'All Field are required'
        });
      }
      this.$http
        .post('/login', {
          email: this.user.email,
          password: this.user.password
        })
        .then(({ data }) => {
          this.$storage.set('token', data.response.token);
          this.$notify({
            type: 'success',
            text: 'Connection success'
          });
          this.token = data.response.token;
          console.log(data.response);
          this.$router.push({ path: '/restaurant' });
          window.location.reload();
        })
        .catch(err => {
          console.log(err);
          this.$notify({ type: 'error', text: err.response.data.message });
        });
    }
  }
};
</script>

<style></style>
