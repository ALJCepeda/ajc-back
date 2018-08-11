import path from 'path';
import bodyParser from 'body-parser';

import BlogsController from './controllers/blogs';
import ToolsController from './controllers/tools';
import TimelineController from './controllers/timeline';

export default function(app) {
  app.get('/build.js', (req, res) => {
    res.sendFile(process.env.JS_FILE);
  });

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  BlogsController.addRoutes(app);
  ToolsController.addRoutes(app);
  TimelineController.addRoutes(app);

  let clientRoute = '*';
  if(process.env.NODE_ENV === 'development') {
    clientRoute = '/';
  }

  app.get(clientRoute, (req, res) => {
    res.sendFile(process.env.HTML_FILE);
  });
};
