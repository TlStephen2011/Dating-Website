<template>
  <v-card max-width="250">
    <v-img
      class="white--text align-end"
      height="200px"
      src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
    >
      <v-card-title>@{{ user.username }}</v-card-title>
    </v-img>
    <v-card-text>
      <div>{{ user.bio }}</div>
    </v-card-text>
    <v-card-actions>
      <v-btn color="orange">Connect</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "User",
  props: ["user"]
};
</script>

<style scoped>
</style>