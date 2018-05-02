import path from 'path';
import BlogsController from '../controllers/blogs';
import ToolsController from '../controllers/tools';
import TimelineController from '../controllers/timeline';

export default function(app) {
  app.get('/build.js', (req, res) => {
    res.sendFile(process.env.JS_FILE);
  });

  BlogsController.addRoutes(app);
  ToolsController.addRoutes(app);
  TimelineController.addRoutes(app);

  app.get('*', (req, res) => {
    res.sendFile(process.env.HTML_FILE);
  });
};
