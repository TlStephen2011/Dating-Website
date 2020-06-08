<template>
  <div v-if="type !== 'none'">
    <v-alert dense text :type="type" border="left" dismissible>
      <slot />
    </v-alert>
  </div>
</template>

<script>
export default {
  name: "Alert",
  props: ["type"]
};
</script>

<style scoped>
</style>