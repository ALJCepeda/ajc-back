import {Request, RequestHandler} from "express";
import User from "./models/User";

export type ControllerConstructor = new (...args:any[]) => any;
export type Middleware = RequestHandler | Array<RequestHandler>;

export interface RequestContext extends Request {
  user: User
}