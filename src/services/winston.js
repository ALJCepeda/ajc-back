const winston = require('winston');

const format = winston.format.combine(
  winston.format.timestamp(),
  winston.format.printf(info => {
    return `${info.timestamp} [${info.level}] ${info.message}`;
  })
);

const log = winston.createLogger({
  format:format,
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ level:'info', filename: 'logs/error.log' })
  ]
});

const access = winston.createLogger({
  format:format,
  transports: [
    new winston.transports.File({ level:'info', filename: 'logs/access.log' })
  ]
});

const erroredRequest = function(err, req) {
  log.error(err.stack);
  if(req.params) {
    log.info(JSON.stringify(req.params));
  }

  if(req.body) {
    log.info(JSON.stringify(req.body));
  }
};

export default { log, access, erroredRequest };
