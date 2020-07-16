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
      <v-col :cols="3">
        <p>Sexuality</p>
        <v-checkbox class="ma-0 pa-0" v-model="sexuality" label="Heterosexual" value="heterosexual"></v-checkbox>
        <v-checkbox class="ma-0 pa-0" v-model="sexuality" label="Homosexual" value="homosexual"></v-checkbox>
        <v-checkbox class="ma-0 pa-0" v-model="sexuality" label="Bisexual" value="bisexual"></v-checkbox>
      </v-col>
      <v-col :cols="3">
        <p>Gender</p>
        <v-checkbox class="ma-0 pa-0" v-model="gender" label="Male" value="male"></v-checkbox>
        <v-checkbox class="ma-0 pa-0" v-model="gender" label="Female" value="female"></v-checkbox>
      </v-col>
    </v-row>
    <v-row>
      <v-col :cols="12">
        <v-btn color="secondary" style="width:100%" @click="sendFilters">Apply Filters</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      ageRange: [0, 100],
      locationVal: 4,
      locationLabels: ["< 1km", "< 10km", "< 100km", "< 500km", "all"],
      fameRatingSort: "",
      interestsFilter: [],
      search: null,
      ageSort: "",
      sexuality: ["heterosexual", "bisexual", "homosexual"],
      gender: ["male", "female"]
    };
  },
  methods: {
    sendFilters() {
      const filters = {
        ageRange: this.ageRange,
        locationVal: this.locationVal,
        locationLabels: this.locationLabels,
        fameRatingSort: this.fameRatingSort,
        interestsFilter: this.interestsFilter,
        ageSort: this.ageSort,
        sexuality: this.sexuality,
        gender: this.gender
      };

      this.$emit("filterBy", filters);
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