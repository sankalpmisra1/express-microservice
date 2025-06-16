const logger = require('../logger');
module.exports = (err, req, res, next) => {
  logger.error({ msg: err.message, stack: err.stack });
  const status = err.status || 500;
  res.status(status).json({ error: err.message || 'Internal Server Error' });
};