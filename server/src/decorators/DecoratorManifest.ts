import {Application, NextFunction, Request, Response} from "express";
import {Container} from "inversify";
import { normalize, isAbsolute } from "path";
import logger from "../services/logger";
import {ControllerConstructor, Middleware} from "../types";
import ValidationMiddleware from "../middleware/ValidationMiddleware";
import LoggerMiddleware from "../middleware/LoggerMiddleware";

interface RouterHandlerEntry {
  methodKey:string;
  middleware:Middleware[]
}

class ControllerEntry {
  basePath:string = '/';
  middleware:Middleware[];
  handlers:Map<string, Map<string, RouterHandlerEntry>> = new Map();

  pathMapFor(method:string):Map<string, RouterHandlerEntry> {
    if(!this.handlers.has(method)) {
      this.handlers.set(method, new Map());
    }

    return this.handlers.get(method) as Map<string, RouterHandlerEntry>;
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

  recordController(constructor:ControllerConstructor, basePath:string, ...middleware:Middleware[]) {
    const entry = this.entryForController(constructor);
    entry.basePath = basePath;
    entry.middleware = middleware;
  }

  recordHTTP(constructor:ControllerConstructor, action:string, path:string, methodKey:string, ...middleware:Middleware[]) {
    const entry = this.entryForController(constructor);
    const pathMap = entry.pathMapFor(path);
    pathMap.set(action, {
      methodKey,
      middleware
    });
  }

  generateRoutes(app:Application, container:Container) {
    this.controllers.forEach((controllerEntry, constructor) => {
      container.bind(constructor).to(constructor);
      const basePath = controllerEntry.basePath;

      controllerEntry.handlers.forEach((pathMap, path) => {
        pathMap.forEach((routeHandlerEntry, action) => {
          let route;

          if(path) {
            route = normalize(`${basePath}/${path}`)
          } else {
            route = normalize(basePath);
          }

          if(!isAbsolute(route)) {
            route = `/${route}`;
          }

          logger.log(action, route, constructor.name);

          app[action](route,
            LoggerMiddleware,
            controllerEntry.middleware,
            routeHandlerEntry.middleware,
            ValidationMiddleware,
            async (req:Request, resp:Response, next:NextFunction) => {
              try {
                const controller = resp.locals.container.get(constructor);
                await controller[routeHandlerEntry.methodKey](req, resp, next);
              } catch(err) {
                logger.internalError(resp, err);
              }
            }
          );
        });
      });
    });
  }
}

export default new DecoratorManifest();