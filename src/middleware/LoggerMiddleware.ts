import {NextFunction, Request, Response} from "express";
import HTTPLogger from "../services/HTTPLogger";

export default function(req:Request, resp:Response, next:NextFunction) {
  const logger:HTTPLogger = resp.locals.container.resolve(HTTPLogger);
  logger.request(req);

  const send = resp.send;
  resp.send = (data) => {
    if(!resp.locals.loggedResponse) {
      logger.response(resp, data);
      resp.locals.loggedResponse = true;
    }

    return send.call(resp, data);
  }

  next();
}
