import { isUndefined } from 'lodash';
import * as fs from 'fs';
import * as moment from 'moment';
import { promisify } from 'bluebird';

const stat = promisify(fs.stat);
const mkdir = promisify(fs.mkdir);
const log = console.log;

const makeDirectory = function(dir) {
  return mkdir(dir).catch((err) => {
    log(err);
    throw err;
  });
};

const initiateDirectory = function(dir) {
  return stat(dir).catch((err) => {
    if(err.code === 'ENOENT') {
      return makeDirectory(dir);
    } else {
      log('Unexpected error while stating logs directory:', err);
      throw err;
    }
  });
};

const onStreamError = function(streamName) {
  return (err) => {
    log(`${streamName} stream encountered error:`, err);
  };
};

const Logger = function() {
  this.errorCount = 0;
  this.accessCount = 0;

  this.errorStream = null;
  this.accessStream = null;
  this.consoleStream = null;

  this.verbose = false;
  this.muteCount = false;
  this.consoleErrors = false;
  this.consoleAccess = false;
};

Logger.prototype.doVerbose = function(message, override) {
  if(this.verbose === true || this[override] === true) {
    this.log(message);
  }
};

Logger.prototype.init = function(dir) {
  return initiateDirectory(dir).then(() => {
    this.errorStream = fs.createWriteStream(`${dir}/error.log`, { flags:'a' });
    this.accessStream = fs.createWriteStream(`${dir}/access.log`, { flags:'a' });
    this.consoleStream = fs.createWriteStream(`${dir}/console.log`, { flags:'a' });

    this.errorStream.on('error', onStreamError('Error'));
    this.accessStream.on('error', onStreamError('Access'));
    this.consoleStream.on('error', onStreamError('Console'));

    log('Created Log Streams, switching to logger');
    return true;
  });
};

Logger.prototype.timestamp = function() {
  return moment.utc().format('MM-DD HHmm');
};

Logger.prototype.error = function() {
  const timestamp = this.timestamp();

  this.errorStream.write(`[${this.errorCount}]${timestamp} `);

  const args = Array.prototype.slice.call(arguments);
  args.forEach((arg) => {
    this.errorStream.write(arg);
    this.doVerbose(arg, 'consoleErrors');
    this.errorStream.write('\n');
  });
  this.errorStream.write(`----------------------------------------------------------------\n`);

  if(!this.muteCount) {
    this.log(`[${this.errorCount}] Error`);
  }

  this.errorCount++;
};

Logger.prototype.access = function (signature, req) {
  const timestamp = this.timestamp();
  const ip = req.connection.remoteAddress;

  const hit = `[${this.accessCount}]${timestamp} (${signature}) ${ip}`;
  this.accessStream.write(`${hit}\n`);
  this.doVerbose(hit, 'consoleAccess');

  this.accessStream.write(JSON.stringify(req.params));
  this.doVerbose(JSON.stringify(req.params), 'consoleAccess');
  this.accessStream.write(`\n`);

  this.accessStream.write(JSON.stringify(req.query));
  this.doVerbose(JSON.stringify(req.query), 'consoleAccess');
  this.accessStream.write(`\n`);

  if(!isUndefined(req.body)) {
    this.accessStream.write(JSON.stringify(req.body));
    this.doVerbose(JSON.stringify(req.body), 'consoleAccess');
    this.accessStream.write(`\n`);
  }

  if(!this.muteCount) {
    this.log(`[${this.accessCount}] Access`);
  }

  this.accessCount++;
};

Logger.prototype.debug = function() {
  if(this.verbose === true || this.consoleDebug === true) {
    this.log.apply(this, arguments);
  }
};

Logger.prototype.log = function () {
  const timestamp = this.timestamp();
  this.consoleStream.write(`${timestamp} `);

  const args = Array.prototype.slice.call(arguments);
  args.forEach((arg) => {
    this.consoleStream.write(arg);
  });

  this.consoleStream.write(`\n`);

  args.unshift(`${timestamp}`);
  log.apply(null, args);
};

Logger.prototype.erroredRequest = function(err, req) {
  this.error(`Request errored: `, err.stack);

  if(req.params) {
    this.error(JSON.stringify(req.params));
  }

  if(req.body) {
    this.error(JSON.stringify(req.body));
  }
};

Logger.prototype.internalError = function(id, res, err) {
  const cb = (err) => {
    if(err instanceof Error) {
      // @ts-ignore
      const stack = err.stack.split('\n');
      this.error(`${id}: ${err.message}`, ...stack);
    } else {
      err = JSON.stringify(err);
      this.error(`${id}: ${err}`);
    }

    return res.status(500).send('This incident has been logged and will be fixed soon!');
  };

  if(err) {
    cb(err);
  } else {
    return cb;
  }
};

export default new Logger();
