<template>
  <DashboardLayout>
    <v-container>
      <v-row>
        <v-col :cols="12">
          <div class="profile-info">
            <v-avatar tile size="200px">
              <v-img :src="profileImage" @click="triggerProfileImage"></v-img>
            </v-avatar>
            <div class="profile-details">
              <span class="profile-item">
                <h3>{{user.firstName}} {{user.lastName}}</h3>
              </span>
              <span class="profile-item">
                <v-icon>mdi-account</v-icon>
                <p>{{ user.username }}</p>
              </span>
              <span class="profile-item">
                <v-icon>mdi-gender-male</v-icon>
                <p>{{user.gender}}</p>
              </span>
              <span class="profile-item">
                <v-icon>mdi-human-male-female</v-icon>
                <p>{{ user.sexuality }}</p>
              </span>
              <span class="profile-item">
                <v-icon>mdi-star</v-icon>
                <p>{{user.fameRating}}</p>
              </span>
            </div>
            <div class="profile-actions">
              <v-btn color="primary" @click="updateProfileDialog = true">Update Profile</v-btn>
              <v-btn color="primary">Incoming Requests</v-btn>
            </div>
          </div>
          <div class="tags">
            <v-autocomplete
              class="interest-selector"
              v-model="interests"
              :items="stateInterests"
              outlined
              chips
              small-chips
              label="Interests"
              multiple
              @blur="updateAllInterests"
              @focus="removeAllInterests"
            ></v-autocomplete>
          </div>
          <div class="bio">
            <div class="heading">
              <h2>Biography</h2>
              <span>
                <v-icon @click="editingBio = true">mdi-pencil</v-icon>
              </span>
            </div>
            <p v-if="!editingBio">{{ user.biography }}</p>
            <div v-if="editingBio">
              <p>{{bioErr}}</p>
              <v-textarea ref="bio" v-model="biography"></v-textarea>
              <v-btn color="primary" @click="updateBio">SAVE</v-btn>
            </div>
          </div>
          <div class="profile-pictures">
            <h2>
              Pictures
              <span class="muted-sub-header">- click on an image to replace it</span>
            </h2>
            <div class="pictures">
              <v-img max-height="400px" @click="clickImage(1)" :src="image_1"></v-img>
              <v-img max-height="400px" @click="clickImage(2)" :src="image_2"></v-img>
              <v-img max-height="400px" @click="clickImage(3)" :src="image_3"></v-img>
              <v-img max-height="400px" @click="clickImage(4)" :src="image_4"></v-img>
            </div>
          </div>
        </v-col>
        <v-col :cols="12">
          <div class="connections">
            <h2>My Connections</h2>
            <v-text-field hide-details label="Search" append-icon="search" class="search-friend"></v-text-field>
            <div class="user-connections">
              <User v-for="user in connections" :key="user.id" :user="user"></User>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-container>
    <v-dialog v-model="updateProfileDialog" max-width="800">
      <v-card>
        <v-card-title class="headline">Update Profile</v-card-title>
        <v-container class="update-profile-dialog">
          <p>{{ error }}</p>
          <p v-for="err in errsArr" :key="err">{{err}}</p>
          <v-form>
            <v-text-field
              label="First Name"
              required
              :error-messages="firstNameErrors"
              v-model="firstName"
              @input="$v.firstName.$touch()"
              @blur="$v.firstName.$touch()"
            ></v-text-field>
            <v-text-field
              label="Last Name"
              v-model="lastName"
              :error-messages="lastNameErrors"
              @input="$v.lastName.$touch()"
              @blur="$v.lastName.$touch()"
            ></v-text-field>
            <v-select
              v-model="gender"
              :items="['male', 'female']"
              append-icon="mdi-arrow-down"
              label="Gender"
            ></v-select>
            <v-select
              v-model="sexuality"
              :items="['bisexual', 'homosexual', 'heterosexual']"
              append-icon="mdi-arrow-down"
              label="Sexuality"
            ></v-select>
            <v-text-field
              label="Email"
              type="email"
              v-model="email"
              :error-messages="emailErrors"
              @input="$v.email.$touch()"
              @blur="$v.email.$touch()"
              :hint="'If you change your email you will need to reactivate your account'"
            ></v-text-field>
            <v-menu
              ref="menu"
              v-model="datePicker"
              :close-on-content-click="false"
              :return-value.sync="date"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="dateOfBirth"
                  label="Date of Birth"
                  append-icon="event"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  :error-messages="dateOfBirthErrors"
                  @input="$v.dateOfBirth.$touch()"
                  @blur="$v.dateOfBirth.$touch()"
                ></v-text-field>
              </template>
              <v-date-picker v-model="date" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="closeMenu">Cancel</v-btn>
                <v-btn text color="primary" @click="updateDate">OK</v-btn>
              </v-date-picker>
            </v-menu>
            <v-text-field
              label="Password"
              type="password"
              :error-messages="passwordErrors"
              @input="$v.password.$touch()"
              v-model="password"
            ></v-text-field>
            <v-text-field
              label="Confirm Password"
              type="password"
              :error-messages="confirmPasswordErrors"
              @input="$v.confirmPassword.$touch()"
              @blur="$v.confirmPassword.$touch()"
              v-model="confirmPassword"
            ></v-text-field>
          </v-form>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="red darken-1" text :disabled="busy" @click="updateProfile('cancel')">Cancel</v-btn>

          <v-btn color="green darken-1" :disabled="busy" text @click="updateProfile('save')">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <input
      type="file"
      ref="profileImage"
      accept="image/*"
      @change="uploadProfileImage"
      style="display: none"
    />
    <input
      type="file"
      ref="image_1"
      accept="image/*"
      @change="uploadImage($event, 2)"
      style="display: none"
    />
    <input
      type="file"
      ref="image_2"
      accept="image/*"
      @change="uploadImage($event, 3)"
      style="display: none"
    />
    <input
      type="file"
      ref="image_3"
      accept="image/*"
      @change="uploadImage($event, 4)"
      style="display: none"
    />
    <input
      type="file"
      ref="image_4"
      accept="image/*"
      @change="uploadImage($event, 5)"
      style="display: none"
    />
  </DashboardLayout>
</template>

<script>
import DashboardLayout from "@/layouts/Dashboard";
import User from "@/components/User";
import {
  getImage,
  updateProfile,
  updateInterests,
  removeInterests,
  saveProfileImage,
  saveImage
} from "@/api/api";
import { required, email, minLength, sameAs } from "vuelidate/lib/validators";
import { isPastDate } from "@/validators/dateOfBirth";
import {
  hasMinimumOneLowercase,
  hasMinimumOneUppercase,
  hasMinimumOneNumeric,
  hasMinimumOneSpecial
} from "@/validators/password";

export default {
  components: {
    DashboardLayout,
    User
  },
  data() {
    return {
      user: {},
      profileImage: "/defaultprofile.png",
      image_1: "/defaultprofile.png",
      image_2: "/defaultprofile.png",
      image_3: "/defaultprofile.png",
      image_4: "/defaultprofile.png",
      editingBio: false,
      updateProfileDialog: false,
      // updateUser: {},
      connections: [],
      datePicker: false,
      date: new Date().toISOString().substr(0, 10),
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      gender: "",
      sexuality: "",
      dateOfBirth: "",
      error: "",
      errsArr: [],
      busy: false,
      bioErr: "",
      interests: [],
      stateInterests: []
    };
  },
  validations() {
    return {
      firstName: { required },
      lastName: { required },
      email: { required, email },
      dateOfBirth: { isPastDate },
      password: {
        hasMinimumOneLowercase,
        hasMinimumOneUppercase,
        hasMinimumOneNumeric,
        hasMinimumOneSpecial,
        minLength: minLength(8)
      },
      confirmPassword: {
        required,
        sameAs: sameAs("password")
      }
    };
  },
  computed: {
    firstNameErrors() {
      const errors = [];
      if (!this.$v.firstName.$dirty) return errors;
      !this.$v.firstName.required && errors.push("First Name is required");
      return errors;
    },
    lastNameErrors() {
      const errors = [];
      if (!this.$v.lastName.$dirty) return errors;
      !this.$v.lastName.required && errors.push("Last Name is required");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.required && errors.push("Email is required");
      !this.$v.email.email && errors.push("Must be a valid email address");
      return errors;
    },
    dateOfBirthErrors() {
      const errors = [];
      if (!this.$v.dateOfBirth.$dirty) return errors;
      !this.$v.dateOfBirth.isPastDate &&
        errors.push("Must be a valid date of birth");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.hasMinimumOneLowercase &&
        errors.push("Must contain at least 1 lowercase letter");
      !this.$v.password.hasMinimumOneUppercase &&
        errors.push("Must contain at least 1 uppercase letter");
      !this.$v.password.hasMinimumOneNumeric &&
        errors.push("Must contain at least 1 numeric character");
      !this.$v.password.hasMinimumOneSpecial &&
        errors.push("Must contain at least 1 special character");
      !this.$v.password.minLength &&
        errors.push("Must be a minimum of 8 characters");
      return errors;
    },
    confirmPasswordErrors() {
      const errors = [];
      if (!this.$v.confirmPassword.$dirty) return errors;
      !this.$v.confirmPassword.required &&
        errors.push("Confirm password is required");
      !this.$v.confirmPassword.sameAs && errors.push("Passwords must match");
      return errors;
    },
    addInterests() {
      return this.interests.length <= 5;
    }
  },
  created() {
    this.user = this.$store.state.user;

    // TODO: unescape escaped chars
    // this.user.biography = htmlspecialchars(this.user.biography);
    if (this.user.dateOfBirth) {
      this.user.dateOfBirth = new Date(Date.parse(this.user.dateOfBirth))
        .toLocaleString("za")
        .substr(0, 10);
    }

    // this.updateUser = JSON.parse(JSON.stringify(this.user));

    // GET user images
    if (this.user.images) {
      this.user.images.forEach(i => {
        getImage(i.ImagePath).then(response => {
          let imageData =
            "data:image/jpeg;base64," +
            Buffer.from(response.data, "binary").toString("base64");
          switch (i.ImageNumber) {
            case 1:
              this.profileImage = imageData;
              break;
            case 2:
              this.image_1 = imageData;
              break;
            case 3:
              this.image_2 = imageData;
              break;
            case 4:
              this.image_3 = imageData;
              break;
            case 5:
              this.image_4 = imageData;
              break;
            default:
              break;
          }
        });
      });
    }
    this.firstName = this.user.firstName;
    this.lastName = this.user.lastName;
    this.biography = this.user.biography;
    this.password = "12345678";
    this.confirmPassword = "12345678";
    this.email = this.user.email;
    this.dateOfBirth = this.user.dateOfBirth;
    this.gender = this.user.gender;
    this.sexuality = this.user.sexuality;

    this.interests = this.user.interests;

    this.stateInterests = this.$store.state.interests;

    let connections = this.$store.state.matches;
    //build users from ids

    connections.forEach(c => {
      const matchedUsers = this.$store.state.users.find(
        u =>
          (u.id === c.User || u.id === c.Match) &&
          c.Mutual == true &&
          this.user.id != u.id
      );
      // console.log(matchedUsers);
      this.connections.push(matchedUsers);
    });

    if (this.user.dateOfBirth)
      this.date = new Date(Date.parse(this.user.dateOfBirth))
        .toISOString()
        .substr(0, 10);
  },
  watch: {
    updateProfileDialog: function(val) {
      this.firstName = this.user.firstName;
      this.lastName = this.user.lastName;
      this.biography = this.user.biography;
      this.password = "Password1!";
      this.confirmPassword = "Password1!";
      this.email = this.user.email;
      this.dateOfBirth = this.user.dateOfBirth;
      this.gender = this.user.gender;
      this.sexuality = this.user.sexuality;
    }
  },
  methods: {
    closeMenu() {
      this.$refs.menu.isActive = false;
    },
    updateBio() {
      // handle bio save to state and api
      this.user.biography = this.biography;
      updateProfile({
        biography: this.user.biography
      })
        .then(data => {
          if (!data.success) {
            if (data.errors) {
              this.bioErr = data.errors;
            } else {
              this.bioErr = data.error;
            }
          }
          this.$store.commit("saveProfile", this.user);
          this.editingBio = !this.editingBio;
        })
        .catch(err => {
          console.log(err);
          this.editingBio = !this.editingBio;
        });
    },
    updateDate() {
      this.dateOfBirth = this.date;
      this.$refs.menu.save(this.date);
    },
    updateProfile(payload) {
      this.error = "";
      if (payload === "save") {
        // update user with new info
        this.$v.$touch();
        if (this.$v.$error) return;

        //attemp to send to api

        // build obj to send
        let updateObj = {};

        if (this.user.firstName !== this.firstName)
          updateObj.firstName = this.firstName;

        if (this.user.lastName !== this.lastName)
          updateObj.lastName = this.lastName;

        if (this.user.email !== this.email) updateObj.email = this.email;

        if (this.user.gender !== this.gender) updateObj.gender = this.gender;

        if (this.user.sexuality !== this.sexuality)
          updateObj.sexuality = this.sexuality;

        if (this.user.dateOfBirth !== this.dateOfBirth)
          updateObj.dateOfBirth = this.dateOfBirth;

        if (this.user.lastName !== this.lastName)
          updateObj.lastName = this.lastName;
        // save user in api
        this.busy = true;
        updateProfile(updateObj)
          .then(({ data }) => {
            if (data.success) {
              // save user in state
              if (updateObj.password) delete updateObj.password;
              Object.keys(updateObj).forEach(u => {
                this.user[u] = updateObj[u];
              });
              this.$store.commit("saveProfile", this.user);
              if (updateObj.email) {
                this.$router.push("/");
              }
              this.updateProfileDialog = false;
            } else {
              if (Array.isArray(data.errors)) {
                this.errsArr = data.errors;
              } else {
                this.error = data.error;
              }
            }
            this.busy = false;
          })
          .catch(err => {
            console.log(err);
            this.error =
              "Something went wrong saving your profile, try update it again later.";
            this.busy = false;
          });
      } else if (payload === "cancel") {
        this.$v.$reset();
        this.firstName = this.user.firstName;
        this.lastName = this.user.lastName;
        this.biography = this.user.biography;
        this.password = "12345678";
        this.confirmPassword = "12345678";
        this.email = this.user.email;
        this.dateOfBirth = this.user.dateOfBirth;
        this.gender = this.user.gender;
        this.sexuality = this.user.sexuality;
        this.updateProfileDialog = false;
      }
    },
    updateAllInterests() {
      updateInterests(this.interests)
        .then(({ data }) => {
          if (data.success) {
            this.$store.state.user.interests = this.interests;
          } else {
            this.interests = [];
          }
        })
        .catch(err => {
          this.interests = [];
        });
    },
    removeAllInterests() {
      removeInterests(this.interests)
        .then(({ data }) => {
          if (!data.success) {
          }
        })
        .catch(err => {});
    },
    triggerProfileImage() {
      this.$refs.profileImage.click();
    },
    uploadProfileImage(event) {
      if (event.target.files[0]) {
        const formData = new FormData();
        formData.append("profileImage", event.target.files[0]);
        saveProfileImage(formData)
          .then(({ data }) => {
            if (data.success) {
              // remove any object with 1 as image number
              if (this.user.images) {
                this.user.images = this.$store.state.user.images.filter(u => {
                  return u.ImageNumber !== 1;
                });
                this.$store.state.users.images = this.user.images;

                //add new image
                const newImageObj = {
                  ImageNumber: 1,
                  ImagePath: data.image["1"].filename
                };
                this.$store.state.user.images.push(newImageObj);
                getImage(data.image["1"].filename).then(response => {
                  let imageData =
                    "data:image/jpeg;base64," +
                    Buffer.from(response.data, "binary").toString("base64");
                  this.profileImage = imageData;
                });
              }
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        console.log("no file");
      }
    },
    clickImage(imageNum) {
      switch (imageNum) {
        case 1:
          this.$refs.image_1.click();
          break;
        case 2:
          this.$refs.image_2.click();
          break;
        case 3:
          this.$refs.image_3.click();
          break;
        case 4:
          this.$refs.image_4.click();
          break;
        default:
          break;
      }
    },
    handleImageState(imageNumber, imagePath) {
      // save to current user
      const newImageObj = {
        ImageNumber: imageNumber,
        ImagePath: imagePath
      };

      if (this.user.images) {
        let filtered = this.user.images.filter(u => {
          return u.ImageNumber !== imageNumber;
        });
        this.user.images = filtered;
        this.user.images.push(newImageObj);
      }

      //save to state
      this.$store.state.user = this.user;
    },
    handleImageRender(imageNumber, imagePath) {
      getImage(imagePath).then(response => {
        let imageData =
          "data:image/jpeg;base64," +
          Buffer.from(response.data, "binary").toString("base64");
        switch (imageNumber) {
          case 2:
            this.image_1 = imageData;
            break;
          case 3:
            this.image_2 = imageData;
            break;
          case 4:
            this.image_3 = imageData;
            break;
          case 5:
            this.image_4 = imageData;
            break;
          default:
            break;
        }
      });
    },
    async uploadImage(event, imageNum) {
      if (!event.target.files[0]) return;
      const formData = new FormData();
      formData.append("myImage", event.target.files[0]);
      try {
        let ret;
        switch (imageNum) {
          case 2:
            ret = await saveImage(2, formData);
            this.handleImageState(2, ret.data.image.imageNumber.filename);
            this.handleImageRender(2, ret.data.image.imageNumber.filename);
            break;
          case 3:
            ret = await saveImage(3, formData);
            this.handleImageState(3, ret.data.image.imageNumber.filename);
            this.handleImageRender(3, ret.data.image.imageNumber.filename);
            break;
          case 4:
            ret = await saveImage(4, formData);
            this.handleImageState(4, ret.data.image.imageNumber.filename);
            this.handleImageRender(4, ret.data.image.imageNumber.filename);
            break;
          case 5:
            ret = await saveImage(5, formData);
            this.handleImageState(5, ret.data.image.imageNumber.filename);
            this.handleImageRender(5, ret.data.image.imageNumber.filename);
            break;
          default:
            break;
        }
      } catch (error) {
        console.log(error);
      }
    }
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
  /* margin-bottom: 50px; */
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
  margin-bottom: 100px;
}

.connections:hover {
  box-shadow: 5px 5px 1px #fafafa, -5px -5px 1px #fafafa;
}

.search-friend {
  margin-top: 15px;
}

.heading {
  display: flex;
  justify-content: space-between;
}

.heading span {
  margin-top: 25px;
}

.update-profile-dialog {
  padding: 5px 25px;
}

.user-connections {
  margin-top: 25px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 1rem;
}
.muted-sub-header {
  font-size: 0.75rem;
  color: #777;
}
</style>