<template>
  <v-card class="mx-auto" max-width="600" :loading="loading" outlined>
    <p style="margin: 25px;">{{ message }}</p>
    <ul class="errors-list">
      <li
        v-for="(error, i) in errors"
        :key="i"
      >{{Object.keys(error)[0] }}: {{ error[Object.keys(error)[0]] }}</li>
    </ul>
    <v-card-title>Create your account</v-card-title>
    <v-card-text>
      <v-form>
        <v-container>
          <v-row dense>
            <v-col cols="12">
              <v-text-field
                label="First Name"
                :error-messages="firstNameErrors"
                @input="$v.user.firstName.$touch()"
                @blur="$v.user.firstName.$touch()"
                v-model.lazy="user.firstName"
                required
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Last Name"
                :error-messages="lastNameErrors"
                @input="$v.user.lastName.$touch()"
                @blur="$v.user.lastName.$touch()"
                v-model.lazy="user.lastName"
                required
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                label="Username"
                :error-messages="usernameErrors"
                @input="$v.user.username.$touch()"
                @blur="$v.user.username.$touch()"
                v-model.lazy="user.username"
                hint="Think carefully, this can't be changed"
                required
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                type="email"
                :error-messages="emailErrors"
                @input="$v.user.email.$touch()"
                @blur="$v.user.email.$touch()"
                label="Email"
                v-model.lazy="user.email"
                required
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                type="password"
                :error-messages="passwordErrors"
                @input="$v.user.password.$touch()"
                @blur="$v.user.password.$touch()"
                label="Password"
                v-model.lazy="user.password"
                required
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                type="password"
                :error-messages="confirmPasswordErrors"
                @input="$v.user.confirmPassword.$touch()"
                @blur="$v.user.confirmPassword.$touch()"
                label="Confirm Password"
                v-model.lazy="user.confirmPassword"
                required
                outlined
              ></v-text-field>
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
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
import {
  hasMinimumOneLowercase,
  hasMinimumOneUppercase,
  hasMinimumOneNumeric,
  hasMinimumOneSpecial
} from "@/validators/password";

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
  validations() {
    return {
      user: {
        firstName: { required },
        lastName: { required },
        username: { required, minLength: minLength(3) },
        email: { required, email },
        password: {
          required,
          hasMinimumOneLowercase,
          hasMinimumOneUppercase,
          hasMinimumOneNumeric,
          hasMinimumOneSpecial,
          minLength: minLength(8)
        },
        confirmPassword: { required, sameAsPassword: sameAs("password") }
      }
    };
  },
  computed: {
    firstNameErrors() {
      const errors = [];
      if (!this.$v.user.firstName.$dirty) return errors;
      !this.$v.user.firstName.required && errors.push("First Name is required");
      return errors;
    },
    lastNameErrors() {
      const errors = [];
      if (!this.$v.user.lastName.$dirty) return errors;
      !this.$v.user.lastName.required && errors.push("Last Name is required");
      return errors;
    },
    usernameErrors() {
      const errors = [];
      if (!this.$v.user.username.$dirty) return errors;
      !this.$v.user.username.required && errors.push("Username is required");
      !this.$v.user.username.minLength &&
        errors.push("Username must be at least 3 characters");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.user.email.$dirty) return errors;
      !this.$v.user.email.required && errors.push("Email is required");
      !this.$v.user.email.email && errors.push("Must be a valid email address");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.user.password.$dirty) return errors;
      !this.$v.user.password.required && errors.push("Password is required");
      !this.$v.user.password.hasMinimumOneLowercase &&
        errors.push("Must contain at least 1 lowercase letter");
      !this.$v.user.password.hasMinimumOneUppercase &&
        errors.push("Must contain at least 1 uppercase letter");
      !this.$v.user.password.hasMinimumOneNumeric &&
        errors.push("Must contain at least 1 numeric character");
      !this.$v.user.password.hasMinimumOneSpecial &&
        errors.push("Must contain at least 1 special character");
      !this.$v.user.password.minLength &&
        errors.push("Must be a minimum of 8 characters");
      return errors;
    },
    confirmPasswordErrors() {
      const errors = [];
      if (!this.$v.user.confirmPassword.$dirty) return errors;
      !this.$v.user.confirmPassword.required &&
        errors.push("Confirm password is required");
      !this.$v.user.confirmPassword.sameAsPassword &&
        errors.push("Passwords must match");
      return errors;
    }
  },
  methods: {
    register() {
      this.$v.user.$touch();
      if (this.$v.user.$error) return;
      console.log("jere");
      this.loading = true;
      api
        .post("/user", this.user)
        .then(({ data }) => {
          console.log("ehre");
          if (data.success) {
            this.message =
              "You have been registered, check your email for activation";
          } else {
            this.errors = data.errors;
            setTimeout(() => {
              this.errors = [];
            }, 10000);
          }
          this.loading = false;
        })
        .catch(err => {
          console.log(err);
          this.loading = false;
        });
    }
  },
  created() {
    this.$getLocation()
      .then(coordinates => {
        this.user.latitude = coordinates.lat;
        this.user.longitude = coordinates.lng;
      })
      .catch(err => {
        this.axios
          .get("https://ipinfo.io?token=53234ea778b079")
          .then(response => {
            let data = response.data.loc;
            let coords = data.split(",");
            this.user.latitude = coords[0];
            this.user.longitude = coords[1];
          })
          .catch(err => {
            console.log(err);
          });
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
