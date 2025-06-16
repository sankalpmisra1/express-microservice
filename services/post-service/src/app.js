require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT || 3000;
const routes = require('./routes/post.routes');
const errorHandler = require('./middlewares/error.middleware');
const logger = require('./logger');

const app = express();
app.use(express.json());
app.use((req, res, next) => { logger.info(`${req.method} ${req.url}`); next(); });
app.use('/api', routes);
app.use(errorHandler);

app.listen(PORT, () => logger.info(`Post service running on port ${PORT}`));