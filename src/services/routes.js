import path from 'path';
import BlogController from '../controllers/blog';
import ToolController from '../controllers/tools';
import TimelineController from '../controllers/timeline';

export default function(app) {
  app.get('/dist/build.js', (req, res) => {
    res.sendFile(process.env.JS_FILE);
  });

  BlogController.addRoutes(app);
  ToolController.addRoutes(app);
  TimelineController.addRoutes(app);

  app.get('*', (req, res) => {
    res.sendFile(process.env.HTML_FILE);
  });
};
