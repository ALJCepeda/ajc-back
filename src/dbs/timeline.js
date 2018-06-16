import fs from 'fs';
import bluebird from 'bluebird';

import pool from './../services/pg';
import injector from './../services/injector';

const readFile = bluebird.promisify(fs.readFile);

const TimelineDB = {
  manifest: {
    count:0,
    last_updated: null
  },
  entries(offset, limit) {
    return pool.query(`
      SELECT tb.id, message, image
      FROM timeline_blogs AS tb
      JOIN blogs AS b
        ON ( b.id = tb.blog_id)
      OFFSET $1::integer LIMIT $2::integer
    `, [ offset, limit ]).then(results => results.rows);
  }
};

pool.query(`
  SELECT count(*), MAX(created_at) as "created_at"
  FROM timeline_blogs
`).then(result => TimelineDB.manifest = {
  count:parseInt(result.rows[0].count),
  last_created:result.rows[0].created_at
});

export default TimelineDB;
