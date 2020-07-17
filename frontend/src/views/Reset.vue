<template>
  <v-card class="mx-auto my-auto elevation" min-width="400" raised elevation="12">
    <v-card-title>Matcha - Update Password</v-card-title>
    <v-card-text>
      <Alert :type="alertType">{{ alertMessage }}</Alert>
      <v-form class="mx-auto">
        <v-text-field
          label="Enter your token..."
          v-model="token"
          :error-messages="tokenErrors"
          @input="$v.token.$touch()"
          @blur="$v.token.$touch()"
          outlined
        ></v-text-field>
        <v-text-field
          label="Enter new password..."
          type="password"
          v-model="password"
          :error-messages="passwordErrors"
          @input="$v.password.$touch()"
          @blur="$v.password.$touch()"
          outlined
        ></v-text-field>
        <v-text-field
          label="Confirm password..."
          v-model="confirmPassword"
          :error-messages="confirmPasswordErrors"
          @input="$v.confirmPassword.$touch()"
          @blur="$v.confirmPassword.$touch()"
          type="password"
          outlined
        ></v-text-field>
        <v-btn @click="updatePassword" color="primary">Submit</v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
import { updatePassword } from "@/api/api.js";
import Alert from "@/components/shared/Alert";
import { required, minLength, sameAs } from "vuelidate/lib/validators";
import {
  hasMinimumOneLowercase,
  hasMinimumOneUppercase,
  hasMinimumOneNumeric,
  hasMinimumOneSpecial
} from "@/validators/password";

export default {
  name: "Reset",
  components: {
    Alert
  },
  data() {
    return {
      token: "",
      password: "",
      confirmPassword: "",
      alertType: "none",
      alertMessage: ""
    };
  },
  methods: {
    updatePassword() {
      this.$v.$touch();
      if (this.$v.$error) return;
      updatePassword(this.$route.params.username, this.token, this.password)
        .then(({ data }) => {
          if (data.success) {
            this.$router.push("/");
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
      token: { required },
      password: {
        hasMinimumOneLowercase,
        hasMinimumOneUppercase,
        hasMinimumOneNumeric,
        hasMinimumOneSpecial,
        minLength: minLength(8)
      },
      confirmPassword: {
        required,
        sameAs: sameAs("password")
      }
    };
  },
  computed: {
    tokenErrors() {
      const errors = [];
      if (!this.$v.token.$dirty) return errors;
      !this.$v.token.required && errors.push("Token is required");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.hasMinimumOneLowercase &&
        errors.push("Must contain at least 1 lowercase letter");
      !this.$v.password.hasMinimumOneUppercase &&
        errors.push("Must contain at least 1 uppercase letter");
      !this.$v.password.hasMinimumOneNumeric &&
        errors.push("Must contain at least 1 numeric character");
      !this.$v.password.hasMinimumOneSpecial &&
        errors.push("Must contain at least 1 special character");
      !this.$v.password.minLength &&
        errors.push("Must be a minimum of 8 characters");
      return errors;
    },
    confirmPasswordErrors() {
      const errors = [];
      if (!this.$v.confirmPassword.$dirty) return errors;
      !this.$v.confirmPassword.required &&
        errors.push("Confirm password is required");
      !this.$v.confirmPassword.sameAs && errors.push("Passwords must match");
      return errors;
    }
  },
  created() {
    if (!this.$route.params.username) {
      this.$router.push("/");
    }
  }
};
</script>

<style scoped>
</style>
