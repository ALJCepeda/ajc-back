import {NextFunction, Request, Response} from "express";

export default function HeaderMiddleware(req:Request, res:Response, next:NextFunction) {
  if(process.env.NODE_ENV === 'development') {
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE');
  }

  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
}
