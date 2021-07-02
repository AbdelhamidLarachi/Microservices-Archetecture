<template>
  <div class="container-fluid">
    <div class="row no-gutter">
      <!-- The image half -->
      <div class="col-md-6 d-none d-md-flex bg-image"></div>
      <!-- The content half -->
      <div class="col-md-6 bg-light">
        <div class="login d-flex align-items-center py-5">
          <!-- Demo content-->
          <div class="container">
            <div class="row">
              <div class="col-lg-10 col-xl-7 mx-auto">
                <h3 class="display-4">Bienvenue</h3>
                <form>
                  <div class="form-group mb-3">
                    <input
                            v-model="email"
                      id="inputEmail"
                      type="email"
                      placeholder="Adresse email"
                      required=""
                      autofocus=""
                      class="form-control rounded-pill border-0 shadow-sm px-4"
                    />
                  </div>
                  <div class="form-group mb-3">
                    <input
                            v-model="password"
                      id="inputPassword"
                      type="password"
                      placeholder="Mot de passe"
                      required=""
                      class="
                        form-control
                        rounded-pill
                        border-0
                        shadow-sm
                        px-4
                        text-primary
                      "
                    />
                  </div>
                  <v-btn class="mr-4" @click="login"> submit </v-btn>
                  <div class="text-center d-flex justify-content-between mt-4">
                    <p>
                      Vous êtes nouveau ?
                      <u v-on:click="redirectRegister()">Inscrivez</u> vous
                      gratuitement !
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <!-- End -->
        </div>
      </div>
      <!-- End -->
    </div>
  </div>
</template>

<script>
import router from "../router/index";
import axios from "axios";
import { baseURL } from "../config";

export default {
  name: "Login",
  
  data: () => ({
    email: "",
    password: "",
  }),


  methods: {
    redirectRegister() {
      router.push({ path: "/register", name: "Register" });
    },

    login() {
      const user = { email: this.email, password: this.password }

       axios.post(`${baseURL}/login`, user).then((res) => {
          
          if(res.status == 200){
            console.log(res.data.user.token);
            res.data.user.token = res.data.token;
            localStorage.setItem('user', JSON.stringify(res.data.user));
            router.push({ path: "/", name: "Dashboard" });
          }
        }).catch(function(err) {
          // display err
          window.alert("Unauthorized!")
          console.log(err);
        });
    },
  },
};
</script>

<style>
.login,
.image {
  min-height: 100vh;
}
.bg-image {
  /* https://therichpost.com/wp-content/uploads/2021/02/login-split.jpg */
  background-image: url("../../public/images/bg3.jpg");
  background-size: cover;
  background-position: center center;
}
</style>
