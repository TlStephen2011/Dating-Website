<template>
  <DashboardLayout @navLinkClicked="updateView">
    <v-container>
      <h1>Dashboard</h1>
      <SearchFilterSort @filterBy="filterUsers" />
      <div v-if="filteredUsers.length != 0">
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
      </div>
      <div v-else>
        <h1>No users to display</h1>
      </div>
    </v-container>
  </DashboardLayout>
</template>

<script>
import DashboardLayout from "@/layouts/Dashboard";
import User from "@/components/User";
import SearchFilterSort from "@/components/SearchFilterSort";

export default {
  name: "Dashboard",
  components: {
    User,
    DashboardLayout,
    SearchFilterSort
  },
  created() {
    // calulate num pages required
    this.filteredUsers = this.$store.state.users;
    this.users = this.filteredUsers.slice(0, 20);
  },
  watch: {
    filteredUsers: function(val) {
      this.users = this.filteredUsers.slice(0, 20);
    }
  },
  data() {
    return {
      users: [],
      filteredUsers: []
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
      this.users = this.filteredUsers.slice(start, end);
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      });
    },
    filterByAge(range) {
      this.filteredUsers = this.$store.state.users.filter(u => {
        return u.age >= range[0] && u.age <= range[1];
      });
    },
    sortByAge(type) {
      if (type === "ascending") {
        this.filteredUsers.sort((a, b) => {
          return a.age - b.age;
        });
      } else if (type === "descending") {
        this.filteredUsers.sort((a, b) => {
          return -1 * (a.age - b.age);
        });
      }
    },
    sortByFameRating(type) {
      if (type === "ascending") {
        this.filteredUsers.sort((a, b) => {
          return a.fameRating - b.fameRating;
        });
      } else if (type === "descending") {
        this.filteredUsers.sort((a, b) => {
          return -1 * (a.fameRating - b.fameRating);
        });
      }
    },
    sexualityFilter(sexualitySelected) {
      if (sexualitySelected.length !== 0) {
        this.filteredUsers = this.$store.state.users.filter(u => {
          for (let i = 0; i < sexualitySelected.length; i++)
            if (u.sexuality === sexualitySelected[i]) return u;
        });
      } else {
        this.filteredUsers = [];
      }
    },
    filterUsers({
      ageRange,
      locationVal,
      locationLabels,
      fameRatingSort,
      interestsFilter,
      ageSort,
      sexuality,
      gender
    }) {
      // first apply filters
      this.filteredUsers = this.$store.state.users.filter(u => {
        for (let i = 0; i < sexuality.length; i++) {
          for (let j = 0; j < gender.length; j++) {
            if (u.age >= ageRange[0] && u.age <= ageRange[1]) {
              if (u.sexuality === sexuality[i]) {
                if (u.gender === gender[j]) {
                  return u;
                }
              }
            }
          }
        }
      });

      //check interests
      this.filteredUsers = this.filteredUsers.filter(u => {
        var check = interestsFilter.every(el => {
          return u.interests.indexOf(el) !== -1;
        });
        if (check) return u;
      });

      if (ageSort !== "" && fameRatingSort !== "") {
        this.sortByAge(ageSort);
        this.sortByFameRating(fameRatingSort);
      } else if (ageSort !== "") {
        this.sortByAge(ageSort);
      } else if (fameRatingSort !== "") {
        this.sortByFameRating(fameRatingSort);
      }

      switch (locationVal) {
        case 0:
          this.filteredUsers = this.filteredUsers.filter(u => {
            u.distance <= 1;
          });
          break;
        case 1:
          this.filteredUsers = this.filteredUsers.filter(u => {
            u.distance <= 10;
          });
          break;
        case 2:
          this.filteredUsers = this.filteredUsers.filter(u => {
            u.distance <= 100;
          });
          break;
        case 3:
          this.filteredUsers = this.filteredUsers.filter(u => {
            u.distance <= 500;
          });
          break;
        default:
          break;
      }
    }
  },
  computed: {
    numPages() {
      return Math.ceil(this.filteredUsers.length / 20);
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