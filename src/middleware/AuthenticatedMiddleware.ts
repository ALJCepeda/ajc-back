import {Request, Response} from "express";

export default function AuthenticatedMiddleware(req:Request, resp:Response, next) {
  console.log('User', req.user);
  if(req.user) {
    next();
  } else {
    resp.status(401);
    resp.send('Unauthorized');
  }
}