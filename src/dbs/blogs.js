import fs from 'fs';
import bluebird from 'bluebird';

import pool from './../services/pg';
import injector from './../services/injector';

const readFile = bluebird.promisify(fs.readFile);

const BlogsDB = {
  manifest: {
    count:0,
    last_updated: null
  },
  entries(offset, limit) {
    return pool.query(`
      SELECT id, image, title, category, tags, created_at
      FROM blogs
      OFFSET $1::integer LIMIT $2::integer'
    `, [ offset, limit ]).then(results => results.rows);
  },
  get(id) {
    return pool.query(`
      SELECT template
      FROM Blogs
      WHERE id=$1::integer
    `, [ id ]).then((blob) => {
      if(blob.rows.length === 0) {
        throw 'noblog';
      }

      const template = blob.rows[0].template;
      return readFile(`${process.env.BLOG_DIR}/${template}`);
    }).then((blog) => {
      return injector.render(blog.toString());
    });
  },
  url(url) {
    return pool.query(`
      SELECT b.template
      FROM blog_urls AS bu
      JOIN blogs as b ON (bu.blog_id = b.id)
      WHERE url=$1::text
    `, [ url ]).then(blob => {
      if(blob.rows.length === 0) {
        const error = new Error('Unable to find blog');
        error.status = 'noblog';
        throw error;
      }

      const template = blob.rows[0].template;
      return readFile(`${process.env.BLOG_DIR}/${template}`);
    }).then((blog) => {
      return injector.render(blog.toString());
    });
  }
};

pool.query('SELECT count(*), MAX(created_at) as "created_at" FROM Blogs').then(result => BlogsDB.manifest = {
  count:parseInt(result.rows[0].count),
  last_created:result.rows[0].created_at
});

export default BlogsDB;
