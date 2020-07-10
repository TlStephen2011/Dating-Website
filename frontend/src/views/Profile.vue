<template>
  <DashboardLayout>
    <v-container>
      <v-row>
        <v-col :cols="8">
          <div class="profile-info">
            <v-avatar tile size="200px">
              <v-img :src="profileImage"></v-img>
            </v-avatar>
            <div class="profile-details">
              <span class="profile-item">
                <h3>{{user.firstName}} {{user.lastName}}</h3>
              </span>
              <span class="profile-item">
                <v-icon>mdi-account</v-icon>
                <p>{{ user.username }}</p>
              </span>
              <span class="profile-item">
                <v-icon>mdi-gender-male</v-icon>
                <p>{{user.gender}}</p>
              </span>
              <span class="profile-item">
                <v-icon>mdi-human-male-female</v-icon>
                <p>{{ user.sexuality }}</p>
              </span>
              <!-- <span class="profile-item">
                <v-icon>mdi-map-marker</v-icon>
                <p>Los Angeles, United States</p>
              </span>-->
            </div>
            <div class="profile-actions" v-if="outgoingRequest">
              <v-btn color="primary" :disabled="true">Request Pending</v-btn>
            </div>
            <div class="profile-actions" v-else-if="!isMatch">
              <v-btn color="primary" @click="addMatch">Connect</v-btn>
            </div>
            <div class="profile-actions" v-else-if="isMatch">
              <v-btn color="primary" @click="removeMatch">Unconnect</v-btn>
            </div>
          </div>
          <div class="tags">
            <v-chip
              v-for="interest of user.interests"
              :key="interest"
              class="ma-2"
              color="secondary"
            >#{{ interest }}</v-chip>
          </div>
          <div class="bio">
            <h2>Biography</h2>
            <p>{{ user.biography }}</p>
          </div>
          <div class="profile-pictures">
            <h2>Pictures</h2>
            <div class="pictures">
              <v-img max-height="400px" :src="image_1"></v-img>
              <v-img max-height="400px" :src="image_2"></v-img>
              <v-img max-height="400px" :src="image_3"></v-img>
              <v-img max-height="400px" :src="image_4"></v-img>
            </div>
          </div>
        </v-col>
        <v-col :cols="4" v-if="isMyProfile">
          <div class="connections">
            <h2>My Connections</h2>
            <v-text-field hide-details label="Search" append-icon="search" class="search-friend"></v-text-field>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </DashboardLayout>
</template>

<script>
import DashboardLayout from "@/layouts/Dashboard";
import { getImage, createMatch } from "@/api/api";

export default {
  components: {
    DashboardLayout
  },
  data() {
    return {
      user: {},
      profileImage: "/defaultprofile.png",
      image_1: "/defaultprofile.png",
      image_2: "/defaultprofile.png",
      image_3: "/defaultprofile.png",
      image_4: "/defaultprofile.png"
    };
  },
  computed: {
    isMyProfile() {
      return this.$route.params.user === "me";
    },
    isMatch() {
      const user = this.$store.state.matches.find(
        u =>
          (u.Match === this.user.id || u.User === this.user.id) &&
          u.Mutual == true
      );
      return user ? true : false;
    },
    outgoingRequest() {
      const user = this.$store.state.outgoingRequests.find(
        u => u.Match === this.user.id
      );
      return user ? true : false;
    }
  },
  created() {
    // find the user
    const userParam = this.$route.params.user;

    if (userParam === "me") {
    } else {
      const userDetails = this.$store.state.users.find(
        o => o.username === userParam
      );

      if (userDetails) {
        this.user = userDetails;

        this.user.images.forEach(i => {
          // let pos = this.images.map(j => j.ImageNumber).indexOf(i.ImageNumber);
          // console.log(pos);
          // this.images.splice(pos, 1);
          // console.log(this.images);
          getImage(i.ImagePath).then(response => {
            let imageData =
              "data:image/jpeg;base64," +
              Buffer.from(response.data, "binary").toString("base64");
            switch (i.ImageNumber) {
              case 1:
                this.profileImage = imageData;
                break;
              case 2:
                this.image_1 = imageData;
                break;
              case 3:
                this.image_2 = imageData;
                break;
              case 4:
                this.image_3 = imageData;
                break;
              case 5:
                this.image_4 = imageData;
                break;
              default:
                break;
            }
          });
        });
      } else {
        // show me
      }
    }
  },
  methods: {
    addMatch() {
      createMatch(this.user.id)
        .then(({ data }) => {
          this.$store.commit("addOutgoingRequest", this.user.id);
        })
        .catch(err => {
          console.log(err);
        });
    },
    removeMatch() {
      //TODO: Implement
    }
  }
};
</script>

<style scoped>
.profile-info {
  padding: 25px;
  border: 1px solid #ccc;
  display: flex;
  min-width: 800px;
}

.profile-details p {
  margin: 0;
}

.profile-details {
  margin-left: 15px;
  display: flex;
  flex-direction: column;
}

.profile-info:hover {
  box-shadow: 5px 5px 1px #fafafa, -5px -5px 1px #fafafa;
}

.profile-item {
  display: flex;
  margin: 4px 0px;
}

.profile-item .v-icon {
  margin-right: 5px;
}

.profile-actions {
  align-self: flex-end;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: flex-end;
}

.profile-actions .v-btn {
  margin: 5px;
}

.tags {
  margin-top: 15px;
  min-width: 800px;
}

.tags .v-chip:hover {
  color: #c25656;
}

.bio {
  margin-top: 15px;
  padding: 25px;
  border: 1px solid #ccc;
  min-width: 800px;
}

.bio:hover {
  box-shadow: 5px 5px 1px #fafafa, -5px -5px 1px #fafafa;
}

.bio h2 {
  margin-bottom: 15px;
}

.profile-pictures {
  margin: 15px 0px;
  margin-bottom: 50px;
  min-width: 800px;
  border: 1px solid #ccc;
  padding: 25px;
}

.profile-pictures h2 {
  margin-bottom: 10px;
}

.pictures {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
  grid-auto-flow: dense;
}

.profile-pictures:hover {
  box-shadow: 5px 5px 1px #fafafa, -5px -5px 1px #fafafa;
}

.connections {
  border: 1px solid #ccc;
  padding: 25px;
}

.connections:hover {
  box-shadow: 5px 5px 1px #fafafa, -5px -5px 1px #fafafa;
}

.search-friend {
  margin-top: 15px;
}
</style>