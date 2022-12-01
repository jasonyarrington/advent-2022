const winston = require('winston');

module.exports = winston.createLogger({
  level: 'info',
  format: winston.format.cli(),
  transports: [
    new winston.transports.Console()
    ],
});