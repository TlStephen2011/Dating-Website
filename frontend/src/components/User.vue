<template>
  <v-card max-width="250px">
    <v-img height="150px" :src="image"></v-img>
    <v-card-text>
      <div>Age: {{ user.age }}</div>
      <div>{{ user.distance.toFixed(2) }}km away</div>
      <div class="username">@{{ user.username }}</div>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="goToProfile" color="primary">View Profile</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { getImage } from "@/api/api";

export default {
  name: "User",
  props: ["user"],
  data() {
    return {
      image: "/defaultprofile.png"
      // age: 0
    };
  },
  mounted() {
    // handle age
    // if (!this.user.dateOfBirth) {
    //   this.age = "Unknown";
    // } else {
    //   this.age =
    //     new Date().getFullYear() -
    //     new Date(Date.parse(this.user.dateOfBirth)).getFullYear();
    // }

    //handle profile pic
    if (this.user.images) {
      this.user.images.forEach(i => {
        if (i.ImageNumber === 1) {
          getImage(i.ImagePath).then(response => {
            this.image =
              "data:image/jpeg;base64," +
              Buffer.from(response.data, "binary").toString("base64");
          });
        }
      });
    }
  },
  methods: {
    goToProfile() {
      this.$router.replace(`/profile/${this.user.username}`);
    }
  }
};
</script>

<style scoped>
.username {
  font-weight: bolder;
  font-size: 1.2rem;
}
</style>