class UserRequestDTO {
    constructor(body) {
      this.name = body.name;
      this.email = body.email;
    }
    validate() {
      if (!this.name || !this.email) {
        const err = new Error('Name and email are required'); err.status = 400; throw err;
      }
      // additional validation
    }
  }
  module.exports = UserRequestDTO;