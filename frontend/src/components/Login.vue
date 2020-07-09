<template>
  <v-card class="mx-auto" max-width="600" outlined :loading="loading">
    <v-card-title class>Sign in to your account</v-card-title>
    <v-card-text>
      <v-form>
        <v-container>
          <v-row dense>
            <v-col cols="12">
              <v-text-field label="Username" v-model="user.username" outlined></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field type="password" label="Password" v-model="user.password" outlined></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-btn color="primary" @click="login">Login</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import { api } from "@/api/api.js";

export default {
  name: "Login",
  data() {
    return {
      user: {
        username: "",
        password: ""
      },
      loading: false
    };
  },
  methods: {
    login() {
      const loader = this.$loading.show({
        loader: "dots",
        canCancel: false,
        color: "#1976d2"
      });

      api
        .post("/auth", this.user)
        .then(async ({ data }) => {
          localStorage.setItem("token", data.authToken);

          await this.$store.dispatch("getUsers");
          this.$router.push("/dashboard");
          loader.hide();
        })
        .catch(err => {
          console.log(err);
          loader.hide();
        });
    }
  }
};
</script>

<style scoped>
.v-btn {
  width: 100%;
}
</style>
