<template>
  <v-dialog v-model="dialog" persistent max-width="600">
    <v-card>
      <v-card-title class="headline">Incoming Requests</v-card-title>
      <v-card-text v-if="incomingRequests && incomingRequests.length === 0">
        <p>No requests</p>
      </v-card-text>
      <v-list :flat="true" outlined>
        <v-list-item v-for="user in incomingRequests" :key="user.id">
          <v-list-item-content>
            <div class="list-item-incoming">
              <v-list-item-title>@{{user.username}}</v-list-item-title>
              <v-btn color="primary" @click="connectTo(user)">Connect</v-btn>
              <v-divider></v-divider>
            </div>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="red" text @click="$emit('close')">CLOSE</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { acceptRequest } from "@/api/api";

export default {
  props: ["dialog"],
  data() {
    return {};
  },
  computed: {
    incomingRequests() {
      const incoming = [];

      this.$store.state.incomingRequests.forEach(m => {
        let u = this.$store.state.users.filter(user => {
          if (m.User === user.id) return user;
        });
        incoming.push(...u);
      });
      return incoming;
    }
  },
  methods: {
    connectTo(user) {
      acceptRequest(user.id)
        .then(({ data }) => {
          if (data.success) {
            // update matches
            const userFrom = this.$store.state.incomingRequests.filter(i => {
              if (i.User === user.id) return i;
            });
            userFrom.Mutual = 1;
            this.$store.state.matches.push(userFrom);
            // remove from incoming requests
            const inc = this.$store.state.incomingRequests.filter(i => {
              if (i.User !== user.id) return i;
            });

            this.$store.commit("saveIncomingRequests", inc);
          } else {
            console.log(data);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style scoped>
.list-item-incoming {
  display: flex;
}
</style>