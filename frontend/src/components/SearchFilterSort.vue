<template>
  <v-container>
    <v-row>
      <!-- Age Slider -->
      <v-col class="px-4" :cols="6">
        <v-range-slider
          v-model="ageRange"
          thumb-label
          label="Age"
          :max="100"
          :min="0"
          class="align-center"
          @change="filterAge"
        ></v-range-slider>
      </v-col>
      <!-- Location Slider -->
      <v-col :cols="6">
        <v-slider
          v-model="locationVal"
          :max="4"
          step="1"
          label="Location"
          ticks="always"
          tick-size="3"
          :tick-labels="locationLabels"
          @change="filterLocation"
        ></v-slider>
      </v-col>
    </v-row>
    <v-row>
      <v-col :cols="12">
        <v-autocomplete
          v-model="interestsFilter"
          :items="interests"
          :search-input.sync="search"
          chips
          clearable
          hide-details
          hide-selected
          item-text="name"
          item-value="symbol"
          label="Search for interests..."
          solo
          multiple
          @change="search=''"
          @blur="filterByInterests"
        >
          <template v-slot:selection="{ attr, on, item, selected }">
            <v-chip
              v-bind="attr"
              :input-value="selected"
              color="blue-grey"
              class="white--text"
              v-on="on"
            >
              <v-icon left>mdi-coin</v-icon>
              <span v-text="item"></span>
            </v-chip>
          </template>
          <template v-slot:item="{ item }">
            <v-list-item-content>
              <v-list-item-title v-text="item"></v-list-item-title>
            </v-list-item-content>
          </template>
        </v-autocomplete>
      </v-col>
    </v-row>
    <v-row>
      <v-col :cols="3">
        <p>Fame Rating</p>
        <v-radio-group v-model="fameRatingSort">
          <v-radio label="Ascending" value="ascending"></v-radio>
          <v-radio label="Descending" value="descending"></v-radio>
        </v-radio-group>
      </v-col>
      <v-col :cols="3">
        <p>Age</p>
        <v-radio-group v-model="ageSort">
          <v-radio label="Ascending" value="ascending"></v-radio>
          <v-radio label="Descending" value="descending"></v-radio>
        </v-radio-group>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      ageRange: [0, 100],
      locationVal: 5,
      locationLabels: ["< 1km", "< 10km", "< 100km", "< 500km", "all"],
      fameRatingSort: "ascending",
      interestsFilter: [],
      search: null,
      ageSort: "ascending"
    };
  },
  methods: {
    filterAge() {
      console.log(this.ageRange);
    },
    filterLocation() {
      console.log(this.locationVal);
    },
    filterByInterests() {
      console.log(this.interestsFilter);
    }
  },
  computed: {
    interests() {
      return this.$store.state.interests;
    }
  }
};
/*
age-gap
location
fame-rating
tags
sexuality
gender
*/
</script>

<style>
.subheadings {
  margin: auto;
}
</style>