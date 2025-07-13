class LoginResponseDTO {
  constructor(user) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.message = 'Logged in successfully';
  }
}

module.exports = LoginResponseDTO;
