<template>
  <v-card class="mx-auto" max-width="600" :loading="loading" outlined>
    <p style="margin: 25px;">{{ message }}</p>
    <ul class="errors-list">
      <li v-for="(error, i) in errors" :key="i">
         {{Object.keys(error)[0] }}: {{ error[Object.keys(error)[0]] }}
      </li>
    </ul>
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
              <v-btn color="primary" @click="register" :disabled="loading">Register</v-btn>
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
        confirmPassword: "",
        longitude: 0,
        latitude: 0
      },
      loading: false,
      message: "",
      errors: []
    };
  },
  methods: {
    register() {
      this.loading = true;
      api.post('/user', this.user)
        .then(({ data }) => {
          if (data.success) {
            this.message = "You have been registered, check your email for activation";
          } else {
            this.errors = data.errors;
            setTimeout(() => {
              this.errors = [];
            }, 10000)
          }
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
        })
    }
  },
  created() {
    this.$getLocation()
    .then(coordinates => {
      this.user.latitude = coordinates.lat;
      this.user.longitude = coordinates.lng;
    }).catch(err => {
      this.axios.get("https://ipinfo.io?token=53234ea778b079")
      .then((response) => {
        let data = response.data.loc;
        let coords = data.split(',');
        this.user.latitude = coords[0];
        this.user.longitude = coords[1];
      }).catch(err => {
        console.log(err);
      })
    });
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

.errors-list {
  margin: 15px;
}
</style>
