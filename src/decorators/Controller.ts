import DecoratorManifest from "./DecoratorManifest";
import {decorate, injectable} from "inversify";
import {ControllerConstructor, Middleware} from "../types";

export default function Controller(basePath:string, ...middleware:Middleware[]) {
  return (target:ControllerConstructor) => {
    decorate(injectable(), target);
    DecoratorManifest.recordController(target, basePath, ...middleware);
  }
}
