import {NextFunction, Request, Response} from "express";
import logger from "../services/logger";

export default function(req:Request, resp:Response, next:NextFunction) {
  logger.access(req);
  next();
}
