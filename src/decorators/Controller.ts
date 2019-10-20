import DecoratorManifest from "./DecoratorManifest";
import {decorate, injectable} from "inversify";
type ControllerConstructor = new (...args:any[]) => any;

export default function Controller(basePath:string) {
  return (target:ControllerConstructor) => {
    decorate(injectable(), target);
    DecoratorManifest.recordController(target, basePath);
  }
}
