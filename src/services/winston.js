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

const internalError = function(id, res) {
  return (err) => {
    winston.log.error(`${id}: ${err}`);
    return res.status(500).send('This incident has been logged and will be fixed soon!');
  }
};

export default { log, access, erroredRequest, internalError };
