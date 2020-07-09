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
        confirmPassword: "",
        longitude: 0,
        latitude: 0
      },
      loading: false
    };
  },
  methods: {
    register() {
      this.loading = true;
      api.post('http://localhost:3000/user', this.user)
        .then(({ data }) => {
          console.log(data);
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
      console.log(coordinates);
      this.user.latitude = coordinates.lat;
      this.user.longitude = coordinates.lng;
    }).catch(err => {
      this.axios.get("https://ipinfo.io?token=53234ea778b079")
      .then((response) => {
        let data = response.data.loc;
        console.log(data);
        let coords = data.split(',');
        console.log(coords);
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
</style>
