<template>
  <DashboardLayout>
    <v-container>
      <v-row>
        <v-col :cols="8">
          <div class="profile-info">
            <v-avatar tile size="200px">
              <v-img src="https://cdn.vuetifyjs.com/images/profiles/marcus.jpg"></v-img>
            </v-avatar>
            <div class="profile-details">
              <span class="profile-item">
                <h3>Marques Brownlee</h3>
              </span>
              <span class="profile-item">
                <v-icon>mdi-account</v-icon>
                <p>MKBHD</p>
              </span>
              <span class="profile-item">
                <v-icon>mdi-email</v-icon>
                <p>mkbhd@youtube.com</p>
              </span>
              <span class="profile-item">
                <v-icon>mdi-gender-male</v-icon>
                <p>Male</p>
              </span>
              <span class="profile-item">
                <v-icon>mdi-human-male-female</v-icon>
                <p>Heterosexual</p>
              </span>
              <span class="profile-item">
                <v-icon>mdi-map-marker</v-icon>
                <p>Los Angeles, United States</p>
              </span>
            </div>
            <div class="profile-actions">
              <v-btn color="primary">Update Profile</v-btn>
              <v-btn color="primary">Incoming Requests</v-btn>
            </div>
          </div>
          <div class="tags">
            <v-chip class="ma-2" color="secondary">#football</v-chip>
            <v-chip class="ma-2" color="secondary">#reading</v-chip>
            <v-chip class="ma-2" color="secondary">#photography</v-chip>
            <v-chip class="ma-2" color="secondary">#gaming</v-chip>
            <v-chip class="ma-2" color="secondary">#hiking</v-chip>
            <v-chip class="ma-2" color="secondary">#cycling</v-chip>
          </div>
          <div class="bio">
            <h2>Biography</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam maximus ullamcorper magna ullamcorper rutrum. Duis sed lobortis ante. Aenean nec aliquam ligula. Nulla ac nisi leo. Maecenas ultricies urna ultrices massa bibendum, maximus feugiat mi ultrices. Nam ornare est et mauris sagittis, sit amet blandit velit interdum. Aliquam a lectus sed ipsum maximus vestibulum ut et urna. Nulla massa purus, tempor id malesuada sed, lacinia sed nibh. Phasellus vel tellus nisl. Pellentesque convallis ligula in facilisis molestie. Praesent lacinia ultrices vehicula. In metus ex, varius non congue a, porta accumsan libero. Cras odio tellus, dapibus id mollis ac, suscipit a tortor. Nullam gravida purus sit amet ipsum sollicitudin, nec dapibus nunc semper. Cras in nunc justo.</p>
            <p>Etiam suscipit justo vitae ligula placerat ornare. Proin eu eros tortor. Nam maximus sem et elementum lacinia. Aliquam commodo massa odio, et pretium nisi dignissim vitae. Curabitur scelerisque metus ipsum, et mollis leo sollicitudin id. Aenean sit amet arcu risus. Fusce congue velit urna, ut euismod justo venenatis eu. In sed risus laoreet, rhoncus ex vitae, pellentesque leo. Vivamus sed posuere velit, tempor pellentesque tellus. Vestibulum quis nisi at nunc placerat cursus quis id ligula. Sed a urna vehicula est venenatis fermentum. Maecenas et lacus dignissim mi volutpat pulvinar mollis quis quam. Vivamus nec nisi orci. Ut diam lacus, posuere eget varius ut, dictum id nisl. Sed mi nibh, consequat sit amet elit ut, aliquet aliquet quam.</p>
          </div>
          <div class="profile-pictures">
            <h2>Pictures</h2>
            <div class="pictures">
              <v-img
                max-height="400px"
                src="https://images.unsplash.com/photo-1590486803895-270287dcdc4f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
              ></v-img>
              <v-img
                max-height="400px"
                src="https://images.unsplash.com/photo-1589988434425-757f48da27dc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
              ></v-img>
              <v-img
                max-height="400px"
                src="https://images.unsplash.com/photo-1590574508715-ed8fa0346f92?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80"
              ></v-img>
              <v-img
                max-height="400px"
                src="https://images.unsplash.com/photo-1590496037162-b699f991419b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1349&q=80"
              ></v-img>
            </div>
          </div>
        </v-col>
        <v-col :cols="4">
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
export default {
  components: {
    DashboardLayout
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