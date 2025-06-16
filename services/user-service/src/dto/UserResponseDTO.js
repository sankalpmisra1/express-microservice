class UserResponseDTO {
    constructor({ id, name, email, created_at }) {
      this.id = id;
      this.name = name;
      this.email = email;
      this.createdAt = created_at;
    }
  }

  module.exports = UserResponseDTO;