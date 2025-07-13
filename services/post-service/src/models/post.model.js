const { pool } = require('../db');
module.exports = {
  async createPost({ userId, title, content }) {
    const result = await pool.query(
      'INSERT INTO posts (user_id, title, content) VALUES ($1, $2, $3) RETURNING *',
      [userId, title, content]
    );
    return result.rows[0];
  },
  async getAllPosts(limit, offset) {
    const result = await pool.query('SELECT * FROM posts ORDER BY id DESC LIMIT $1 OFFSET $2', [limit, offset]);
    return result.rows;
  },
  async countPosts(){
    const result = await pool.query('SELECT COUNT(*) FROM posts');
    return parseInt(result.rows[0].count, 10);
  }
};