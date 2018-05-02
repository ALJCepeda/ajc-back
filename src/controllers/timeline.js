import fs from 'fs';
import _ from 'lodash';
import Promise from 'bluebird';

import pool from './../services/pg';
import logger from './../services/logger';

const defaults = {
  entries: {
    limit:10,
    offset:0
  }
};

let manifest = null;
pool.query('SELECT count(*), MAX(created_at) as "created_at" from Timeline').then(result => manifest = {
  count:parseInt(result.rows[0].count),
  last_created:result.rows[0].created_at
});

const TimelineController = {
  defaults,
  addRoutes: (app) => {
    app.get('/timeline/manifest', TimelineController.manifest);
    app.get('/timeline/entries', TimelineController.entries);
  },
  manifest: (req, res) => {
    logger.access('timeline.manifest', req);
    res.send({ defaults, ...manifest });
  },
  entries: (req, res) => {
    logger.access('timeline.entries', req);

    let limit = parseInt(req.query.limit),
        offset = parseInt(req.query.offset);

    if(_.isNaN(limit) || limit === 0) {
      limit = defaults.entries.limit;
    }

    if(_.isNaN(offset)) {
      offset = defaults.entries.offset;
    }

    pool.query('SELECT id, message, image, link_id FROM Timeline OFFSET $1::integer LIMIT $2::integer', [ offset, limit ]).then(
      result => {
        const entries = result.rows.reduce((obj, row) => {
          obj[row.id-1] = row
          return obj;
        }, {});

        res.send(entries);
      },
      result => res.status(500).send('This will be fixed soon!')
    );
  }
};

export default TimelineController;
