<template>
  <v-card class="mx-auto" max-width="600" outlined :loading="loading">
    <v-card-title class>Sign in to your account</v-card-title>
    <ul v-if="Object.keys(error).length !== 0">
      <li>{{ Object.keys(error)[0] }}: {{ error[Object.keys(error)[0]] }}</li>
    </ul>
    <v-card-text>
      <v-form>
        <v-container>
          <v-row dense>
            <v-col cols="12">
              <v-text-field
                label="Username"
                :error-messages="usernameErrors"
                @input="$v.user.username.$touch()"
                @blur="$v.user.username.$touch()"
                v-model="user.username"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                type="password"
                label="Password"
                :error-messages="passwordErrors"
                @input="$v.user.password.$touch()"
                @blur="$v.user.password.$touch()"
                v-model="user.password"
                outlined
              ></v-text-field>
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
import { required } from "vuelidate/lib/validators";

export default {
  name: "Login",
  data() {
    return {
      user: {
        username: "",
        password: ""
      },
      loading: false,
      error: {}
    };
  },
  computed: {
    usernameErrors() {
      const errors = [];
      if (!this.$v.user.username.$dirty) return errors;
      !this.$v.user.username.required && errors.push("Username is required");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.user.password.$dirty) return errors;
      !this.$v.user.password.required && errors.push("Password is required");
      return errors;
    }
  },
  validations() {
    return {
      user: {
        username: { required },
        password: { required }
      }
    };
  },
  methods: {
    login() {
      this.$v.user.$touch();
      if (this.$v.user.$error) return;

      const loader = this.$loading.show({
        loader: "dots",
        canCancel: false,
        color: "#1976d2"
      });

      api
        .post("/auth", this.user)
        .then(async ({ data }) => {
          if (!data.success) {
            this.error = data.errors;
            setTimeout(() => {
              this.error = {};
            }, 5000);
            loader.hide();
            return;
          }
          localStorage.setItem("token", data.authToken);

          this.$store
            .dispatch("getUsers")
            .then(() => {
              this.$store
                .dispatch("getMatches")
                .then(res => {
                  this.$store
                    .dispatch("getOutgoingRequests")
                    .then(res => {
                      this.$store
                        .dispatch("getIncomingRequests")
                        .then(res => {
                          this.$store
                            .dispatch("getUserProfile")
                            .then(() => {
                              this.$router.push("/dashboard");
                              loader.hide();
                            })
                            .catch(err => {
                              console.log(err);
                              loader.hide();
                            });
                        })
                        .catch(err => {
                          console.log(err);
                          loader.hide();
                        });
                    })
                    .catch(err => {
                      console.log(err);
                      loader.hide();
                    });
                })
                .catch(err => {
                  console.log(err);
                });
            })
            .catch(err => {
              console.log(err);
              loader.hide();
            });
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
