<template>
  <div>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title class="heading-matcha">Matcha</v-toolbar-title>
      <!-- <v-text-field hide-details label="Search" append-icon="search" class="search-bar"></v-text-field> -->
      <v-autocomplete
        class="search-bar"
        v-model="model"
        :items="usernames"
        chips
        clearable
        hide-details
        hide-selected
        label="Search"
        solo
      ></v-autocomplete>

      <v-spacer></v-spacer>
      <router-link to="/dashboard">
        <v-btn text>
          <p>Dashboard</p>
        </v-btn>
      </router-link>
      <router-link to="/profile/me" exact>
        <v-btn text @click="$emit('navLinkClicked', 'MyProfile')">
          <p>My Profile</p>
        </v-btn>
      </router-link>
      <router-link to="/messages">
        <v-btn text @click="$emit('navLinkClicked', 'Messages')">
          <p>Messages</p>
        </v-btn>
      </router-link>
      <router-link to="/">
        <v-btn text @click="$emit('navLinkClicked', 'Logout')">
          <p>Logout</p>
        </v-btn>
      </router-link>
    </v-app-bar>
    <v-content>
      <slot />
    </v-content>
    <v-footer absolute color="primary" padless>
      <v-col class="text-center footer" cols="12" style="color:white;">
        &copy;{{ new Date().getFullYear() }} —
        <strong>Matcha</strong>
      </v-col>
    </v-footer>
  </div>
</template>

<script>
import { getMatches } from "@/api/api.js";

export default {
  name: "DashboardLayout",
  components: {},

  data: () => ({
    // polling: null
    model: null,
    usernames: []
  }),
  created() {
    this.usernames = this.$store.state.users.map(u => u.username);
  },
  watch: {
    model: function() {
      if (this.model) this.$router.replace({ path: `/profile/${this.model}` });
    }
  }
};
</script>

<style scoped>
.v-btn p {
  margin: 15px;
  color: white;
  vertical-align: center;
}

.card-form {
  margin-top: 50px;
}

.search-bar {
  max-width: 400px;
}

a {
  text-decoration: none;
}
.heading-matcha {
  margin-right: 50px;
}
</style>
