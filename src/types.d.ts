import {RequestHandler} from "express";

export type ControllerConstructor = new (...args:any[]) => any;
export type Middleware = RequestHandler | Array<RequestHandler>;
