import {NextFunction, Request, Response} from "express";
import {AppConfig} from "../config/app";

export default function HeaderMiddleware(req:Request, res:Response, next:NextFunction) {
  if(AppConfig.environment === 'development') {
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Origin', `http://${AppConfig.client.host}:${AppConfig.client.port}`);
    res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE');
  }

  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
}
