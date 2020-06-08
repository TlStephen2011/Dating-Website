<template>
  <DashboardLayout>
    <v-container>
      <h1>Dashboard</h1>
      <v-row>
        <v-col :cols="8">
          <div class="filter-sort">FILTER AND SORT</div>
          <div class="results">RESULTS</div>
        </v-col>
        <v-col :cols="4">
          <div class="recommendations">RECOMMENDATIONS</div>
        </v-col>
      </v-row>
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
  data() {
    return {
      users: [
        {
          id: "1",
          username: "tstpehen",
          bio: "I am helpful"
        },
        {
          id: "2",
          username: "tstpehen",
          bio: "I am helpful"
        },
        {
          id: "3",
          username: "tstpehen",
          bio: "I am helpful"
        },
        {
          id: "4",
          username: "tstpehen",
          bio: "I am helpful"
        },
        {
          id: "5",
          username: "tstpehen",
          bio: "I am helpful"
        },
        {
          id: "6",
          username: "tstpehen",
          bio: "I am helpful"
        },
        {
          id: "7",
          username: "tstpehen",
          bio: "I am helpful"
        }
      ]
    };
  }
};
</script>

<style scoped>
/* .grid {
  margin-top: 25px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 2rem;
} */
/* 
.grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-areas:
    "filter-sort none"
    "results recommendations";
  grid-gap: 1.5rem;
  margin-top: 50px;
} */

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
</style>