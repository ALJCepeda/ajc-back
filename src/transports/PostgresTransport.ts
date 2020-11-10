import Transport from "winston-transport";
import {getConnection} from "typeorm";
import Log from "../models/Log";
import {omit} from "lodash";
import {HTTPLog} from "../models/HTTPLog";

export class PostgresTransport extends Transport {
  constructor(opts = {}) {
    super(opts);
  }
  
  async log(info, callback) {
    if(info.traceId) {
      await getConnection().getRepository(HTTPLog).insert({
        traceId: info.traceId,
        level: info.level,
        message: info.message,
        data: omit(info, ['traceId', 'level', 'message'])
      });
    } else {
      await getConnection().getRepository(Log).insert({
        level: info.level,
        message: info.message,
        data: omit(info, ['level', 'message'])
      });
    }
    
    callback();
  }
}