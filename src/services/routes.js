import blogController from '../controllers/blog';

export default function(app) {
  app.route('/blog/manifest')
     .get(blogController.manifest.get);

  app.route('/blog/:file')
     .get(blogController.blog.get);
};
