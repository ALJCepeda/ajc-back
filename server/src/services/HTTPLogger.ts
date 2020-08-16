import {Logger as WinstonLogger} from "winston";
import {PostgresTransport} from "../transports/PostgresTransport";
import {inject} from "inversify";
import {tokens} from "../tokens";
import {Request, Response} from "express";
import {parse} from "url";
import {BaseLogger} from "./baseLogger";

export default class HTTPLogger {
  private logger:WinstonLogger = BaseLogger.child({}).add(
    new PostgresTransport({})
  );
  
  constructor(
    @inject(tokens.traceId) private traceId:string
  ) { }
  
  error(err:Error, message?:string) {
    this.logger.error(message || err.message, {
      error: err,
      traceId: this.traceId
    });
  }
  
  request(req:Request, message:string = 'Request') {
    const parsedUrl = parse(req.originalUrl);
    const route = parsedUrl.pathname;
    const ip = req.connection.remoteAddress;
    const {params, query, body, headers, cookies} = req;
    
    this.logger.info(message, {
      route, ip, params, query, body, headers, cookies, traceId: this.traceId
    });
  }
  
  response(resp:Response, data:any, message:string = 'Response') {
    this.logger.info(message, {
      traceId: this.traceId,
      headers: resp.getHeaders(),
      data
    });
  }
}