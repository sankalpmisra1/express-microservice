class PostRequestDTO {
    constructor(body) {
      this.userId = body.userId;
      this.title = body.title;
      this.content = body.content;
    }
    validate() {
      if (!this.userId || !this.title) {
        const err = new Error('userId and title are required'); err.status = 400; throw err;
      }
    }
  }
  module.exports = PostRequestDTO;
  