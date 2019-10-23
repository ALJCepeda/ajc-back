import * as fs from 'fs';
import * as moment from 'moment';
import { promisify } from 'bluebird';
import {WriteStream} from "fs";
import {Request, Response} from "express";

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

class Logger {
  errorCount:number = 0;
  accessCount:number = 0;

  errorStream:WriteStream;
  accessStream:WriteStream;
  consoleStream:WriteStream;

  verbose:boolean = false;
  muteCount:boolean = false;
  consoleErrors:boolean = false;
  consoleAccess:boolean = false;
  consoleDebug:boolean = false;

  init(dir:string) {
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
  }

  timestamp() {
    return moment.utc().format('MM-DD HHmm');
  }

  error(...args:string[]) {
    const timestamp = this.timestamp();

    this.errorStream.write(`[${this.errorCount}]${timestamp} `);

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
  }

  access(signature:string, req:Request) {
    const writeObj = (identifier:string, obj:any) => {
      const objStr = JSON.stringify(obj);
      if(objStr !== '{}') {
        const objMessage = `${identifier} ${objStr}`;
        this.accessStream.write(`${objMessage}\n`);
        this.doVerbose(objMessage, 'consoleAccess');
      }
    };

    const timestamp = this.timestamp();
    const ip = req.connection.remoteAddress;

    const hit = `${timestamp} (${signature}) ${ip}`;
    this.accessStream.write(`${hit}\n`);
    this.doVerbose(hit, 'consoleAccess');

    writeObj('params', req.params);
    writeObj('query', req.query);
    writeObj('body', req.body);

    if(!this.muteCount) {
      this.log(`[${this.accessCount}] Access`);
    }

    this.accessCount++;
  }

  debug(...args:string[]) {
    if(this.verbose === true || this.consoleDebug === true) {
      this.log.apply(this, args);
    }
  }

  log(...args:string[]) {
    const timestamp = this.timestamp();
    this.consoleStream.write(`${timestamp} `);

    args.forEach((arg) => {
      this.consoleStream.write(arg);
    });

    this.consoleStream.write(`\n`);

    args.unshift(`${timestamp}`);
    log.apply(null, args);
  }

  doVerbose(message:string, override:string) {
    if(this.verbose === true || this[override] === true) {
      this.log(message);
    }
  };

  erroredRequest(err:Error, req:Request) {
    this.error(`Request errored: `, err.stack as string);

    if(req.params) {
      this.error(JSON.stringify(req.params));
    }

    if(req.body) {
      this.error(JSON.stringify(req.body));
    }
  }

  internalError(signature:string, resp:Response, err:Error) {
    const cb = (err) => {
      if(err instanceof Error) {
        const stack = (err.stack as string).split('\n');
        this.error(`${signature}: ${err.message}`, ...stack);
      } else {
        err = JSON.stringify(err);
        this.error(`${signature}: ${err}`);
      }

      return resp.status(500).send('This incident has been logged and will be fixed soon!');
    };

    if(err) {
      cb(err);
    } else {
      return cb;
    }
  }
}

export default new Logger();
