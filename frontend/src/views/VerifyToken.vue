<template>
  <v-card class="mx-auto my-auto elevation" min-width="400" raised elevation="12">
    <v-card-title>Matcha - Activate Account</v-card-title>
    <v-card-text>
      <Alert :type="alertType">
        {{ alertMessage }}
      </Alert>
        <v-form class="mx-auto">
          <v-text-field label="Enter your token..." v-model="token" outlined></v-text-field>
          <v-btn @click="verify" color="primary">Submit</v-btn>
        </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import { api } from "@/api/api.js";
import Alert from "@/components/shared/Alert";

export default {
  name: 'VerifyToken',
  components: {
    Alert
  },
  data() {
    return {
      token: "",
      alertType: "none",
      alertMessage: ""
    };
  },
  methods: {
    verify() {
      const username = this.$route.params.username;

      api.post('/token/' + username, {
        token: this.token
      })
      .then(({data}) => {
        if (data.success === true) {
          this.alertType = "success";
          this.alertMessage = data.message;
          setTimeout(() => {
            window.location.href = '/';
          }, 4000);
        } else {
          this.alertType = "error";
          this.alertMessage = data.message;
        }
      }).catch(err => {
        this.alertType = "error";
        this.alertMessage = "An unknown error occurred, please try again later.";
      });
    }
  }
};
</script>

<style scoped>
</style>