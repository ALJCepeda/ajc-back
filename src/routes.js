import { json, urlencoded } from 'body-parser';

import BlogsController from './controllers/blogs';
import ToolsController from './controllers/tools';
import TimelineController from './controllers/timeline';

export default function(app) {
  app.get('/build.js', (req, res) => {
    res.sendFile(__dirname + '/' + process.env.JS_FILE);
  });

  app.get('/build.js.map', (req, res) => {
    res.sendFile(__dirname + '/' + process.env.JS_FILE + '.map');
  });

  app.use(json());
  app.use(urlencoded({ extended: true }));

  BlogsController.addRoutes(app);
  ToolsController.addRoutes(app);
  TimelineController.addRoutes(app);

  let clientRoute = '*';
  if(process.env.NODE_ENV === 'development') {
    clientRoute = '/';
  }

  app.get(clientRoute, (req, res) => {
    res.sendFile(__dirname + '/' + process.env.HTML_FILE);
  });
};
