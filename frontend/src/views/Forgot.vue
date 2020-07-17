<template>
  <v-card class="mx-auto my-auto elevation" min-width="400" raised elevation="12">
    <v-card-title>Matcha - Request Forgot Password</v-card-title>
    <v-card-text>
      <Alert :type="alertType">{{ alertMessage }}</Alert>
      <v-form class="mx-auto">
        <v-text-field
          label="Enter your username..."
          v-model="username"
          :error-messages="usernameErrors"
          @input="$v.username.$touch()"
          @blur="$v.username.$touch()"
          outlined
        ></v-text-field>
        <v-btn @click="requestForgotPassword" color="primary">Submit</v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import { requestPasswordReset } from "@/api/api.js";
import Alert from "@/components/shared/Alert";
import { required, minLength } from "vuelidate/lib/validators";

export default {
  name: "Forgot",
  components: {
    Alert
  },
  data() {
    return {
      username: "",
      alertType: "none",
      alertMessage: ""
    };
  },
  methods: {
    requestForgotPassword() {
      this.$v.$touch();
      if (this.$v.$error) return;
      requestPasswordReset(this.username)
        .then(({ data }) => {
          if (data.success) {
            this.$router.push(`/reset/${this.username}`);
          } else {
            this.alertType = "error";
            if (data.errors && data.errors.length >= 1) {
              this.alertMessage = data.errors;
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  validations() {
    return {
      username: { required, minLength: minLength(3) }
    };
  },
  computed: {
    usernameErrors() {
      const errors = [];
      if (!this.$v.username.$dirty) return errors;
      !this.$v.username.required && errors.push("Username is required");
      !this.$v.username.minLength && errors.push("Minimum length of 3");
      return errors;
    }
  }
};
</script>

<style scoped>
</style>
