<template>
  <div>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>Matcha</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text @click="$emit('navLinkClicked', 'Register')">
        Register
      </v-btn>
      <v-btn text @click="$emit('navLinkClicked', 'Login')">
        Login
      </v-btn>
    </v-app-bar>
    <v-content>
      <slot />
    </v-content>
  </div>
</template>

<script>

export default {
  name: "IndexLayout",
  components: {
  },

  data: () => ({
    //
  })
};
</script>

<style scoped>
</style>