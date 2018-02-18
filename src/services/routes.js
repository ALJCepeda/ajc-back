import BlogController from '../controllers/blog';

export default function(app) {
  app.route('/blog/manifest')
     .get(BlogController.manifest);

  app.route('/blog/:id')
     .get(BlogController.get);
};
