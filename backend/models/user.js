module.exports = class User {
  constructor(obj) {
    if (!obj) {
      throw new Error("Object required as a parameter for new User");
    }

    this.firstName = obj.firstName;
    this.lastName = obj.lastName;
    this.location = obj.location;
    this.gender = obj.gender;
    this.orientation = obj.orientation;
    this.photos = obj.photos;
    this.email = obj.email;
    this.username = obj.username;
    this.password = obj.password;
    
    if (obj.location !== undefined && obj.location.coordinates !== undefined && obj.location.coordinates.length === 2) {
      this.location = [obj.location.coordinates[0], obj.location.coordinates[1]]
    }
  }

  isValidEmailAddress() {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(this.email);
  }

  isValidUsername() {
    return !this.username ? false : this.username.length > 0;
  }

  isValidGender() {
    return !this.gender
      ? false
      : this.gender.toLowerCase() === "female" ||
          this.gender.toLowerCase() === "male";
  }

  static validatePasswordStrength(password) {
    const re = new RegExp(
      "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})"
    );
    return !password ? false : re.test(password);
  }
};
