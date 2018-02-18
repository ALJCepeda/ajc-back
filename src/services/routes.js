import BlogController from '../controllers/blog';

export default function(app) {
  app.route('/blog/manifest')
     .get(BlogController.manifest);

  app.route('/blog/:file')
     .get(BlogController.get);
};
