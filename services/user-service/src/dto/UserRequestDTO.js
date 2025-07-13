class UserRequestDTO {
    constructor(body) {
      this.name = body.name;
      this.email = body.email;
      this.password = body.password;
    }
    validate() {
      if (!this.name || !this.email || !this.password) {
        const err = new Error('Name , email and password are required'); err.status = 400; throw err;
      }
      // additional validation
    }
  }
  module.exports = UserRequestDTO;