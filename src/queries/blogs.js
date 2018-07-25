import fs from 'fs';
import bluebird from 'bluebird';

import pool from './../services/pg';
import injector from './../services/injector';
import util from './../services/util';

const readFile = bluebird.promisify(fs.readFile);

const BlogsDB = {
  manifest: {
    count:0,
    last_updated: null
  },
  entry(id) {
    return pool.query(`
      SELECT blogs.id, image, title, category, tags, created_at, array_agg(uri) as uris
      FROM blogs
      INNER JOIN blog_uris ON blogs.id = blog_uris.blog_id
      WHERE blogs.id=$1::integer
      GROUP BY blogs.id
    `, [ id ]).then(results => results.rows);
  },
  entries(ids) {
    return pool.query(`
      SELECT blogs.id, image, title, category, tags, created_at, array_agg(uri) as uris
      FROM blogs
      INNER JOIN blog_uris ON blogs.id = blog_uris.blog_id
      WHERE blogs.id=ANY($1::int[])
      GROUP BY blogs.id
    `, [ ids ]).then(util.reduceRowsById);
  },
  entriesByPage(page, limit) {
    const offset = (page - 1) * limit;

    return pool.query(`
      SELECT id
      FROM blogs
      OFFSET $1::integer LIMIT $2::integer
    `, [ offset, limit ]).then(results => results.rows);
  },
  blog(id) {
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
  uri(uri) {
    return pool.query(`
      SELECT blogs.template
      FROM blog_uris
      INNER JOIN blogs ON (blog_uris.blog_id = blogs.id)
      WHERE uri=$1::text
      LIMIT 1
    `, [ uri ]).then(blob => {
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
