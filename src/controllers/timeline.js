import fs from 'fs';
import _ from 'lodash';
import Promise from 'bluebird';

import pool from './../services/pg';
import logger from './../services/logger';

const TimelineController = {
  addRoutes: (app) => {
    app.get('/timeline/manifest', TimelineController.manifest);
    app.get('/timeline/indexes', TimelineController.indexes);
  },
  manifest: (req, res) => {
    logger.access('timeline.manifest', req);

    pool.query('SELECT count(*) from Timeline').then(
      result => res.send({ count: result.rows[0].count }),
      result => res.status(500).send('This will be fixed soon!')
    );
  },
  indexes: (req, res) => {
    logger.access('timeline.indexes', req);

    let limit = parseInt(req.query.limit),
        offset = parseInt(req.query.offset);

    if(_.isNaN(limit)) {
      limit = 10;
    }

    if(_.isNaN(offset)) {
      offset = 0;
    }

    pool.query('SELECT id, message, image, link_id FROM Timeline LIMIT $1::integer OFFSET $2::integer', [ limit, offset ]).then(
      result => {
        const indexes = result.rows.reduce((obj, row) => {
          obj[row.id-1] = row
          return obj;
        }, {});

        res.send(indexes);
      },
      result => res.status(500).send('This will be fixed soon!')
    );
  }
};

export default TimelineController;
