<template>
  <v-card class="mx-auto" max-width="600" :loading="loading" outlined>
    <v-card-title>Create your account</v-card-title>
    <v-card-text>
      <v-form>
        <v-container>
          <v-row dense>
            <v-col cols="12">
              <v-text-field label="First Name" v-model.lazy="user.firstName" required outlined></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field label="Last Name" v-model.lazy="user.lastName" required outlined></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field label="Username" v-model.lazy="user.username" required outlined></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field type="email" label="Email" v-model.lazy="user.email" required outlined></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field type="password" label="Password" v-model.lazy="user.password" required outlined></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field type="password" label="Confirm Password" v-model.lazy="user.confirmPassword" required outlined></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-btn color="primary" @click="register">Register</v-btn>
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
  name: "Register",
  data() {
    return {
      user: {
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: ""
      },
      loading: false
    };
  },
  methods: {
    register() {
      this.loading = true;
      api.post('/signup', this.user)
        .then(({ data }) => {
          console.log(data);
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
        })
    }
  }
};
</script>

<style scoped>
.v-btn {
  width: 100%;
}

.v-col {
  margin: 0;
}
</style>