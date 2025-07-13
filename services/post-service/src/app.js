require('dotenv').config();
const express = require('express');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const PORT = process.env.PORT || 3000;
const { sessionPool }  = require('./db');
const routes = require('./routes/post.routes');
const errorHandler = require('./middlewares/error.middleware');
const logger = require('./logger');

const app = express();
app.use(express.json());
console.log('[SESSION_DB]', {
  host: process.env.SESSION_DB_HOST,
  port: process.env.SESSION_DB_PORT,
  user: process.env.SESSION_DB_USER,
  database: process.env.SESSION_DB_NAME
});
app.use(session({
  store: new pgSession({ pool: sessionPool, tableName: 'session' }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',  // set true on HTTPS
    maxAge: 1000 * 60 * 60 * 24    // 1 day
  }
}));
app.use((req, res, next) => { logger.info(`${req.method} ${req.url}`); next(); });
app.use('/api', routes);
app.use(errorHandler);

app.listen(PORT, () => logger.info(`Post service running on port ${PORT}`));