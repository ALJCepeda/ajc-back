import fs from 'fs';
import bluebird from 'bluebird';

import pool from './../services/pg';
import injector from './../services/injector';
import util from './../services/util';

const readFile = bluebird.promisify(fs.readFile);

const TimelineDB = {
  manifest: {
    count:0,
    last_updated: null
  },
  entry(id) {
    return pool.query(`
      SELECT id, message, image, link, link_label, created_at
      FROM all_timelines
      WHERE id=$1::uuid
    `, [ id ]).then(result => result.rows[0]);
  },
  entries(ids) {
    return pool.query(`
      SELECT id, message, image, link, link_label, created_at
      FROM all_timelines
      WHERE id=ANY($1::uuid[])
    `, [ ids ]).then(util.reduceRowsById);
  },
  entriesByPage(page, limit) {
    const offset = (page - 1) * limit;

    return pool.query(`
      SELECT id
      FROM all_timelines
      OFFSET $1::integer LIMIT $2::integer
    `, [ offset, limit ]).then(result => result.rows);
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
