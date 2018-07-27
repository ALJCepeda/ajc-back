import _ from 'lodash'
import Handlebars from 'handlebars';

import logger from './../libs/logger';
import blogsDB from './../services/blogs';


const defaults = {
  entries: {
    limit:20,
    offset:0
  }
};

const BlogsController = {
  addRoutes(app) {
    app.get('/blogs/manifest', BlogsController.manifest);
    app.post('/blogs/entries', BlogsController.entries);
    app.get('/blogs/entriesByPage', BlogsController.entriesByPage);
    app.get('/blogs/entry/:id', BlogsController.entry);
    app.get('/blogs/:uri', BlogsController.uri);
  },
  manifest(req, res) {
    logger.access('blogs.manifest', req);
    res.send({ defaults, ...blogsDB.manifest });
  },
  entry(req, res) {
    logger.access('blogs.entry', req);

    let id = parseInt(req.params.id);

    if(_.isNaN(id) || id === 0) {
      return res.status(422).send('id must be an int');
    }

    blogsDB.entry(id).then(entry => {
      res.send(entry);
    }, logger.internalError('blogs.entry', res));
  },
  entries(req, res) {
    logger.access('blogs.entries', req);

    let ids = req.body;

    if(!_.isArray(ids)) {
      return res.status(422).send('body must be an array');
    }

    blogsDB.entries(ids).then(entries => {
      res.send(entries);
    }, logger.internalError('blogs.entries', res));
  },
  entriesByPage(req, res) {
    logger.access('blogs.entriesByPage', req);

    let limit = parseInt(req.query.limit),
        page = parseInt(req.query.page);

    if(_.isNaN(limit) || limit === 0) {
      limit = defaults.entries.limit;
    }

    if(_.isNaN(page) || page < 1) {
      page = 1;
    }

    blogsDB.entriesByPage(page, limit).then(ids => {
      res.send(ids.map(entry => entry.id));
    }, logger.internalError('blogs.entriesByPage', res));
  },
  uri(req, res) {
    logger.access('blogs.uri', req);

    let uri = req.params.uri;

    if((!_.isString(uri) || uri.length === 0)) {
      return res.status(422).send('uri must be a string');
    }

    uri = uri.replace(/[\W\_]/g, '').toLowerCase();

    blogsDB.uri(uri).then(blog => {
      res.send(blog);
    }, err => {
      if(err.status === 'noblog') {
        return res.status(404).send({ status:err.status, message:err.message });
      }

      logger.internalError('blogs.uri', res, err);
    });
  }
};

export default BlogsController;
