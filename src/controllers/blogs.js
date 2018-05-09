import fs from 'fs';
import _ from 'lodash';
import Promise from 'bluebird';
import Handlebars from 'handlebars';

import config from './../config';
import pool from './../services/pg';
import logger from './../services/logger';

const readFile = Promise.promisify(fs.readFile);

const defaults = {
  entries: {
    limit:10,
    offset:0
  }
};

let manifest = null;
pool.query('SELECT count(*), MAX(created_at) as "created_at" FROM Blogs').then(result => manifest = {
  count:parseInt(result.rows[0].count),
  last_created:result.rows[0].created_at
});

const BlogsController = {
  addRoutes: (app) => {
    app.get('/blogs/manifest', BlogsController.manifest);
    app.get('/blogs/entries', BlogsController.entries);
    app.get('/blogs/:id', BlogsController.get);
  },
  manifest: (req, res) => {
    logger.access('blogs.manifest', req);
    res.send({ defaults, ...manifest });
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

    pool.query('SELECT id, file, image, title, category, tags, created_at FROM Blogs OFFSET $1::integer LIMIT $2::integer', [ offset, limit ]).then(
      result => {
        const entries = result.rows.reduce((obj, row) => {
          row.image = `${process.env.STATIC_URL}/images/${row.image}`;
          obj[row.id-1] = row;
          return obj;
        }, {});
        console.log(entries);

        res.send(entries);
      },
      result => res.status(500).send('This will be fixed soon!')
    );
  },
  get: (req, res) => {
    logger.access('blogs.get', req);

    const id = parseInt(req.params.id);

    if(_.isNaN(id)) {
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
      const template = Handlebars.compile(data.toString());
      const blog = template(config.assets);

      return res.send(blog);
    }).catch(logger.internalError('blog.get', res));
  }
};

export default BlogsController;
