const pool = require('../db');
module.exports = {
  async createPost({ userId, title, content }) {
    const result = await pool.query(
      'INSERT INTO posts (user_id, title, content) VALUES ($1, $2, $3) RETURNING *',
      [userId, title, content]
    );
    return result.rows[0];
  },
  async getAllPosts() {
    const result = await pool.query('SELECT * FROM posts');
    return result.rows;
  }
};