class LoginRequestDTO {
  constructor(body) {
    this.email = body.email;
    this.password = body.password;
  }

  validate() {
    if (!this.email || !this.password) {
      const err = new Error('Email and password are required');
      err.status = 400;
      throw err;
    }
    // Optionally validate email format, password length, etc.
  }
}

module.exports = LoginRequestDTO;
