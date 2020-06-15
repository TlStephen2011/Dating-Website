class User {
    constructor({
        Id,
        FirstName,
        LastName,
        Username,
        Email,
        Password,
        Activated = false,
        Longitude = 0,
        Latitude = 0,
        Biography = "",
        Interests = "",
        Gender = "",
        Sexuality = "",
        LastOnline = "",
        RegistrationDate = "",
        ForgotPasswordToken = ""
    }) {
        this.id = Id;
        this.firstName = FirstName;
        this.lastName = LastName;
        this.username = Username;
        this.email = Email;
        this.password = Password;
        this.activated = Activated;
        this.longitude = Longitude;
        this.latitude = Latitude;
        this.biography = Biography;
        this.interests = Interests;
        this.gender = Gender;
        this.sexuality = Sexuality;
        this.lastOnline = LastOnline;
        this.registrationDate = RegistrationDate;
        this.forgotPasswordToken = ForgotPasswordToken;
    }
}

module.exports = User;