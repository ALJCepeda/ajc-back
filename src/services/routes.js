import path from 'path';
import BlogController from '../controllers/blog';

export default function(app) {
  app.get('/dist/build.js', (req, res) => {
    res.sendFile(process.env.JS_FILE);
  });

  app.get('/blog/manifest', BlogController.manifest);

  app.get('/blog/:id', BlogController.get);

  app.get('*', (req, res) => {
    res.sendFile(process.env.HTML_FILE);
  });
};
