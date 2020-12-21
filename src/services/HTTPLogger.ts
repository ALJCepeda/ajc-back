import {Logger as WinstonLogger} from "winston";
import {inject, injectable} from "expressman";
import {tokens} from "../tokens";
import {Request, Response} from "express";
import {parse} from "url";
import {BaseLogger} from "./baseLogger";

@injectable()
export default class HTTPLogger {
  private logger:WinstonLogger = BaseLogger.child({});

  constructor(
    @inject(tokens.traceId) private traceId:string
  ) { }

  error(error: any, message:string = 'Error') {
    this.logger.error({
      message,
      error,
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
      data: JSON.stringify(data)
    });
  }
}
