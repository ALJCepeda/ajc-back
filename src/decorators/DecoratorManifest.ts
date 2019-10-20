import {Application, NextFunction, Request, Response} from "express";
import {Container} from "inversify";
import { normalize, isAbsolute } from "path";
import logger from "../libs/logger";

type ControllerConstructor = new (...args:any[]) => any;

class ControllerEntry {
  basePath:string = '/';
  handlers:Map<string, Map<string, string>> = new Map();

  pathMapFor(method:string):Map<string, string> {
    if(!this.handlers.has(method)) {
      this.handlers.set(method, new Map());
    }

    return this.handlers.get(method) as Map<string, string>;
  }
}

class DecoratorManifest {
  controllers:Map<ControllerConstructor, ControllerEntry> = new Map();

  entryForController(constructor:ControllerConstructor):ControllerEntry {
    if(!this.controllers.has(constructor)) {
      this.controllers.set(constructor, new ControllerEntry());
    }

    return this.controllers.get(constructor) as ControllerEntry;
  }

  recordController(constructor:ControllerConstructor, basePath:string) {
    const entry = this.entryForController(constructor);
    entry.basePath = basePath;
  }

  recordHTTP(constructor:ControllerConstructor, action:string, path:string, methodKey:string) {
    const entry = this.entryForController(constructor);
    const pathMap = entry.pathMapFor(path);
    pathMap.set(action, methodKey);
  }

  generateRoutes(app:Application, container:Container) {
    this.controllers.forEach((controllerEntry, constructor) => {
      container.bind(constructor).to(constructor);
      const basePath = controllerEntry.basePath;

      controllerEntry.handlers.forEach((pathMap, path) => {
        pathMap.forEach((methodKey, action) => {
          let route = normalize(`${basePath}/${path}`);

          if(!isAbsolute(route)) {
            route = `/${route}`;
          }

          logger.log(action, route, constructor.name);

          app[action](route, (req:Request, resp:Response, next:NextFunction) => {
            const controller = resp.locals.container.get(constructor);
            controller[methodKey](req, resp, next);
          });
        });
      });
    });
  }
}

export default new DecoratorManifest();
