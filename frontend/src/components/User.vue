<template>
  <v-card max-width="300">
    <v-img height="100px" :src="image">
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
export default {
  name: "User",
  props: ["user"],
  data() {
    return {
      image: "",
      age: 0
    };
  },
  mounted() {
    // this.age =
    //   new Date().getFullYear - new Date(this.user.dateOfBirth).getFullYear();
  }
};
</script>

<style scoped>
</style>