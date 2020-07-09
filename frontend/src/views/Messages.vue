
<template>
  <DashboardLayout>
    <v-container>
      <ChatWindow></ChatWindow>
    </v-container>
  </DashboardLayout>
</template>

<script>
import DashboardLayout from "@/layouts/Dashboard";
import ChatWindow from "@/components/ChatWindow";
export default {
  components: {
    DashboardLayout,
    ChatWindow
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
