import _ from 'lodash'
import Handlebars from 'handlebars';

import logger from './../services/logger';
import blogsDB from './../dbs/blogs';

const defaults = {
  entries: {
    limit:10,
    offset:0
  }
};

const BlogsController = {
  addRoutes: (app) => {
    app.get('/blogs/manifest', BlogsController.manifest);
    app.get('/blogs/entries', BlogsController.entries);
    app.get('/blogs/:url', BlogsController.url);
  },
  manifest: (req, res) => {
    logger.access('blogs.manifest', req);
    res.send({ defaults, ...blogsDB.manifest });
  },
  entries: (req, res) => {
    logger.access('blogs.entries', req);

    let limit = parseInt(req.query.limit),
        offset = parseInt(req.query.offset);

    if(_.isNaN(limit) || limit === 0) {
      limit = defaults.entries.limit;
    }

    if(_.isNaN(offset)) {
      offset = defaults.entries.offset;
    }

    blogsDB.entries(offset, limit).then(entries => {
      entries.forEach(entry => {
        entry.image = `${process.env.STATIC_URL}/images/${entry.image}`
      });
      res.send(entries);
    }, logger.internalError('blog.entries', res));
  },
  url: (req, res) => {
    logger.access('blogs.url', req);

    const url = req.params.url;

    if(!_.isString(url) || url.length === 0) {
      return res.status(422).send('url must be a string');
    }

    blogsDB.url(url).then(blog => {
      res.send(blog);
    }, err => {
      if(err.status === 'noblog') {
        return res.status(404).send({ status:err.status, message:err.message });
      }

      logger.internalError('blogs.url', res, err);
    });
  }
};

export default BlogsController;
