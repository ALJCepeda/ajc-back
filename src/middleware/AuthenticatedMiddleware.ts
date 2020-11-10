import {Request, Response} from "express";

export default function AuthenticatedMiddleware(req:Request, resp:Response, next) {
  if(req.user) {
    next();
  } else {
    resp.status(401);
    resp.send('Unauthorized');
  }
}