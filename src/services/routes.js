import path from 'path';
import BlogController from '../controllers/blog';

export default function(app) {
  app.route('/')
     .get((req, res) => {
       res.sendFile(process.env.HTML_FILE);
     });

  app.route('/dist/build.js')
     .get((req, res) => {
       res.sendFile(process.env.JS_FILE);
     });

  app.route('/blog/manifest')
     .get(BlogController.manifest);

  app.route('/blog/:id')
     .get(BlogController.get);
};
