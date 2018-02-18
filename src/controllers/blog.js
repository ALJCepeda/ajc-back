import fs from 'fs';

import pool from './../services/pg';
import winston from './../services/winston';

const returnRows = function(promise, res) {
  return promise.then(result => res.send(result.rows))
  .catch(result => res.status(500).send('This will be fixed soon!'));
};

export default {
  manifest: (req, res) => {
    const promise = pool.query('SELECT * FROM Blogs');
    return returnRows(promise, res);
  },
  get: (req, res) => {
    pool.query('SELECT file FROM Blogs WHERE id=$1::integer', [ req.params.id ]).then((blob) => {
      const file = blob.rows[0].file;

      fs.readFile(`${process.env.BLOG_DIR}/${file}`, (err, data) => {
        if(err) {
          winston.log.error(`blog.get: ${err}`);
          return res.status(500).send('This will be fixed soon!');
        }

        return res.send(data);
      });
    });
  }
};
