<template>
  <div>
    <IndexLayout @navLinkClicked="updateView">
      <v-container>
        <component :is="dynamicComponent" />
      </v-container>
    </IndexLayout>
  </div>
</template>

<script>
import IndexLayout from "@/layouts/Index.vue";
import Login from "@/components/Login.vue";
import Register from "@/components/Register.vue";

export default {
  name: "App",
  components: {
    IndexLayout,
    Register,
    Login
  },

  data: () => ({
    dynamicComponent: "Login"
  }),
  methods: {
    updateView(requestedView) {
      this.dynamicComponent = requestedView;
    }
  },
  created() {
    localStorage.clear();
  }
};
</script>

<style scoped>
</style>