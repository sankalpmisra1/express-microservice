const pool = require('../db');
module.exports = {
    async createUser({name,email,password}){
        const result = await pool.query(
            'INSERT INTO users (name,email,password) VALUES ($1, $2, $3) RETURNING *',[name , email, password]
        );
        return result.rows[0];
    },
    async getAllUsers(limit, offset){
        const result = await pool.query('SELECT * FROM users ORDER BY id DESC LIMIT $1 OFFSET $2', [limit, offset]);
        return result.rows;
    },
    async getUserById(id) {
        const result = await pool.query(
          'SELECT * FROM users WHERE id = $1',
          [id]
        );
        return result.rows[0] || null;
    },
    async countUsers() {
        const result = await pool.query('SELECT COUNT(*) FROM users');
        return parseInt(result.rows[0].count, 10);
    },
    async getUserByEmail(email) {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        return result.rows[0] || null;
    }
}