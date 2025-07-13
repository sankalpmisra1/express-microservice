require('dotenv').config();
const {Pool} = require('pg');
const pool = new Pool({
    host:process.env.DB_HOST,
    port:parseInt(process.env.DB_PORT, 10),
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
})

const sessionPool = new Pool({
  host: process.env.SESSION_DB_HOST,
  port: parseInt(process.env.SESSION_DB_PORT, 10),
  user: process.env.SESSION_DB_USER,
  password: process.env.SESSION_DB_PASSWORD,
  database: process.env.SESSION_DB_NAME,
});

sessionPool.query('SELECT NOW()')
  .then(res => console.log('✅ Connected to session DB:', res.rows[0]))
  .catch(err => console.error('❌ Failed to connect to session DB:', err));
module.exports = {
  pool,
  sessionPool,
};