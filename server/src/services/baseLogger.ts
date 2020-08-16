import * as fs from 'fs';
import * as moment from 'moment';
import { promisify } from 'bluebird';
import {WriteStream} from "fs";
import {Request, Response} from "express";
import { parse } from 'url';
import {omit} from 'lodash';
import {createLogger, transports, format} from "winston";
import {PostgresTransport} from "../transports/PostgresTransport";

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

  constructor(config:Partial<Logger> = {}) {
    Object.assign(this, config);
  }

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
    return moment.utc().format('HH:mm:ss');
  }

  error(...args:string[]) {
    const timestamp = this.timestamp();

    this.errorStream.write(`[${this.errorCount}]${timestamp} `);

    args.forEach((arg) => {
      const argStr = JSON.stringify(arg, Object.getOwnPropertyNames(arg));
      this.errorStream.write(argStr);
      this.doVerbose(argStr, 'consoleErrors');
      this.errorStream.write('\n');
    });
    this.errorStream.write(`----------------------------------------------------------------\n`);

    if(!this.muteCount) {
      this.log(`[${this.errorCount}] Error`);
    }

    this.errorCount++;
  }

  access(req:Request) {
    const parsedUrl = parse(req.originalUrl);
    const path = parsedUrl.pathname;

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

    const hit = `${timestamp} ${path} ${ip}`;
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
    if(this.verbose || this.consoleDebug) {
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
    if(this.verbose || this[override] === true) {
      this.log(message);
    }
  };

  internalError(resp:Response, err:Error) {
    const parsedUrl = parse((resp.req as Request).originalUrl);
    const path = parsedUrl.pathname;

    const cb = (err) => {
      if(err instanceof Error) {
        const stack = (err.stack as string).split('\n');
        this.error(`${path}: ${err.message}`, ...stack);
      } else {
        err = JSON.stringify(err);
        this.error(`${path}: ${err}`);
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

export const BaseLogger = createLogger({
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3,
    blab: 4
  },
  transports:[
    new PostgresTransport(),
    new transports.Console({
      level:'blab',
      format: format.combine(
        format.timestamp(),
        format.printf((info) => {
          const time = info.timestamp.substring(11, 19);
          const data = omit(info, ['timestamp', 'message', 'level']);
          return `${time} ${info.message} ${JSON.stringify(data)}`;
        })
      )
    })
  ]
});

export const logger = BaseLogger.child({});

export default new Logger({
  consoleErrors: process.env.CONSOLE_ERRORS === 'true',
  consoleAccess: process.env.CONSOLE_ACCESS === 'true',
  verbose: process.env.VERBOSE === 'true',
  muteCount: process.env.MUTE_COUNT === 'true'
})