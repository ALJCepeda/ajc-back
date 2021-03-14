import {NextFunction, Request, Response} from "express";
import HTTPLogger from "../services/HTTPLogger";
import {parse} from "url";

export default function(req:Request, resp:Response, next:NextFunction) {
  const logger:HTTPLogger = resp.locals.container.resolve(HTTPLogger);
  logger.request(req);
  
  const parsedUrl = parse(req.originalUrl);
  const route = parsedUrl.pathname || '';
  const send = resp.send;
  resp.send = (data) => {
    
    if(!resp.locals.loggedResponse && !route.includes('expressman') && !route.includes('swagger')) {
      logger.response(resp, data);
      resp.locals.loggedResponse = true;
    }

    return send.call(resp, data);
  }

  next();
}
