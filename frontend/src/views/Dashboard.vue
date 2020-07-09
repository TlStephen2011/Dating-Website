<template>
  <DashboardLayout @navLinkClicked="updateView">
    <h1>Dashboard</h1>
    <v-container>
      <div class="results-grid">
        <User v-for="user in users" :key="user.id" :user="user"></User>
      </div>
    </v-container>
  </DashboardLayout>
</template>

<script>
import DashboardLayout from "@/layouts/Dashboard";
import User from "@/components/User";

export default {
  name: "Dashboard",
  components: {
    User,
    DashboardLayout
  },
  created() {
    this.users = this.$store.state.users;
  },
  data() {
    return {
      users: []
    };
  },
  methods: {
    updateView(requestedView) {
      if (requestedView === "Logout") {
        localStorage.removeItem("token");
        this.$router.replace("/");
      }
    }
  }
};
</script>

<style scoped>
.recommendations {
  grid-area: recommendations;
  border: 1px solid black;
  height: 400px;
  margin: 15px 0px;
}

.filter-sort {
  grid-area: filter-sort;
  border: 1px solid black;
  height: 150px;
  margin: 15px 0px;
}

.results {
  grid-area: results;
  border: 1px solid black;
  height: 800px;
  margin: 15px 0px;
}

h1 {
  margin: 15px 0px 0px 0px;
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-gap: 25px;
}
</style>