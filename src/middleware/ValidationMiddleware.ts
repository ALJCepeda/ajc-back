import {NextFunction, Request, Response} from "express";
import {validationResult} from "express-validator";

export default function (req:Request, resp:Response, next:NextFunction) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return resp.status(422).json({ errors: errors.array() });
  }
  
  next();
}
