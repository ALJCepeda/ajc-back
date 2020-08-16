import {NextFunction, Request, Response} from "express";
import HTTPLogger from "../services/HTTPLogger";

export default function(req:Request, resp:Response, next:NextFunction) {
  const logger:HTTPLogger = resp.locals.container.get(HTTPLogger);
  logger.request(req);
  
  const send = resp.send;
  resp.send = (data) => {
    logger.response(resp, data);
    return send.apply(resp, arguments);
  };
  
  next();
}
