import fs from 'fs';
import _ from 'lodash';
import Promise from 'bluebird';

import pool from './../services/pg';
import logger from './../services/logger';

const readFile = Promise.promisify(fs.readFile);

const returnRows = function(promise, res) {
  return promise.then(result => res.send(result.rows))
  .catch(result => res.status(500).send('This will be fixed soon!'));
};

const BlogController = {
  addRoutes: (app) => {
    app.get('/blog/manifest', BlogController.manifest);
    app.get('/blog/:id', BlogController.get);
  },
  manifest: (req, res) => {
    req.params = _.pick(req.params, [ ]);
    logger.access('blog.manifest', req);
    const promise = pool.query('SELECT * FROM Blogs');
    return returnRows(promise, res);
  },
  get: (req, res) => {
    req.params = _.pick(req.params, ['id']);
    logger.access('blog.get', req);

    const id = parseInt(req.params.id);

    if(!_.isNumber(id)) {
      logger.error(`blog.get: ID is not numeric`);
      return res.status(422).send('ID must be numeric');
    }

    pool.query('SELECT file FROM Blogs WHERE id=$1::integer', [ id ]).then((blob) => {
      if(blob.rows.length === 0) {
        return res.status(404).send('Unable to find blog');
      }

      const file = blob.rows[0].file;
      return readFile(`${process.env.BLOG_DIR}/${file}`);
    }).then((data) => {
      return res.send(data);
    }).catch(logger.internalError('blog.get', res));
  }
};

export default BlogController;
