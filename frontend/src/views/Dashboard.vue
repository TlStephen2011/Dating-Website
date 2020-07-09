<template>
  <DashboardLayout @navLinkClicked="updateView">
    <v-container v-if="users">
      <h1>Dashboard</h1>
      <div class="results-grid">
        <User v-for="user in users" :key="user.id" :user="user"></User>
      </div>
      <paginate
        class="pagination-bar"
        :page-count="numPages"
        :margin-pages="2"
        :page-range="3"
        :container-class="'pagination'"
        :page-class="'page-item'"
        :page-link-class="'page-link-item'"
        :prev-class="'prev-item'"
        :prev-link-class="'prev-link-item'"
        :next-class="'next-item'"
        :next-link-class="'next-link-item'"
        :break-view-class="'break-view'"
        :break-view-link-class="'break-view-link'"
        :first-last-button="true"
        :click-handler="updateUsers"
      ></paginate>
    </v-container>
    <v-container v-else>
      <h1>No users to display</h1>
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
    // calulate num pages required
    this.numPages = Math.ceil(this.$store.state.users.length / 20);
    this.users = this.$store.state.users.slice(0, 20);
  },
  data() {
    return {
      users: [],
      numPages: 0
    };
  },
  methods: {
    updateView(requestedView) {
      if (requestedView === "Logout") {
        localStorage.removeItem("token");
        this.$router.replace("/");
      }
    },
    updateUsers(pageNum) {
      let end = pageNum * 20;
      let start = end - 20;
      this.users = this.$store.state.users.slice(start, end);
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
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
  margin: 15px 0px 15px 0px;
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 25px;
  margin-bottom: 25px;
}

.pagination-bar {
  margin-bottom: 50px;
}
</style>