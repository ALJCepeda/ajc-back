import {Container} from "inversify";
import {json, urlencoded} from "body-parser";
import {readdirSync} from "fs";
import {join} from 'path';
import express = require('express');

import DecoratorManifest from "../decorators/DecoratorManifest";
import HeaderMiddleware from "../middleware/HeaderMiddleware";
import ContainerMiddleware from "../middleware/ContainerMiddleware";
import {Application} from "express";
import {setupPassport} from "../config/passport";
import {EntityManager, getConnection} from "typeorm";

export class ServerService {
  readControllers() {
    const controllerDirectory = join(__dirname, '../controllers');
    readdirSync(controllerDirectory).forEach(function(file) {
      if(file.indexOf('Controller') !== -1) {
        require(`${controllerDirectory}/${file}`);
      }
    });
  }

  setupApp():Application {
    this.readControllers();

    const clientRoute = process.env.NODE_ENV === 'development' ? '/' : '*';
    let container = new Container({
      autoBindInjectable: true
    });
    const entityManager = getConnection().createEntityManager();
    container.bind(EntityManager).toConstantValue(entityManager);

    const app = express();

    app.use(json());
    app.use(urlencoded({ extended: true }));
    app.use(HeaderMiddleware);
    app.use(ContainerMiddleware(container));

    setupPassport(app, container);

    app.get(clientRoute, (req, res) => {
      res.sendFile(__dirname + '/' + process.env.HTML_FILE);
    });

    app.get('/build.js', (req, res) => {
      res.sendFile(__dirname + '/' + process.env.JS_FILE);
    });

    app.get('/build.js.map', (req, res) => {
      res.sendFile(__dirname + '/' + process.env.JS_FILE + '.map');
    });

    DecoratorManifest.generateRoutes(app, container);

    return app;
  }
}

export default new ServerService();
