<template>
  <v-card max-width="250">
    <v-img height="150px" :src="image">
      <v-card-title>@{{ user.username }}</v-card-title>
    </v-img>
    <v-card-text>
      <div>Age: {{ age }}</div>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary">View Profile</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { getProfilePic } from "@/api/api";

export default {
  name: "User",
  props: ["user"],
  data() {
    return {
      image: "/defaultprofile.png",
      age: 0
    };
  },
  mounted() {
    // handle age
    if (!this.user.dateOfBirth) {
      this.age = "Unknown";
    } else {
      this.age =
        new Date().getFullYear() -
        new Date(Date.parse(this.user.dateOfBirth)).getFullYear();
    }

    //handle profile pic
    if (this.user.images) {
      this.user.images.forEach(i => {
        if (i.ImageNumber === 1) {
          getProfilePic(i.ImagePath).then(response => {
            this.image =
              "data:image/jpeg;base64," +
              Buffer.from(response.data, "binary").toString("base64");
          });
        }
      });
    }
  }
};
</script>

<style scoped>
.v-card__title {
  color: #555;
}
</style>