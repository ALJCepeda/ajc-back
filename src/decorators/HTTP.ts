import {RequestHandler} from 'express';
import DecoratorManifest from "./DecoratorManifest";
import {Middleware} from "../types";

export function HTTP(action:string, path:string, ...middleware:Middleware[]) {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    DecoratorManifest.recordHTTP(target.constructor, action, path, propertyKey, ...middleware);
  }
}

export function GET(path:string, ...middleware:Middleware[]) {
  debugger;
  return HTTP('get', path, ...middleware);
}

export function POST(path:string, ...middleware:Middleware[]) {
  return HTTP('post', path, ...middleware);
}

export function REMOVE(path:string, ...middleware:Middleware[]) {
  return HTTP('delete', path, ...middleware);
}
