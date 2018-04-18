import fs from 'fs';
import _ from 'lodash';
import Promise from 'bluebird';

import pool from './../services/pg';
import logger from './../services/logger';

const TimelineController = {
  addRoutes: (app) => {
    app.get('/manifest', TimelineController.manifest);
    app.get('/timeline', TimelineController.get);
  },
  manifest: (req, res) => {
    logger.access('timeline.manifest', req);

    pool.query('SELECT count(*) from Timeline').then(
      result => res.send({ count: result.rows[0].count }),
      result => res.status(500).send('This will be fixed soon!')
    );
  },
  get: (req, res) => {
    logger.access('timeline.get', req);

    let size = parseInt(req.query.size),
        offset = parseInt(req.query.offset);

    if(_.isNaN(size)) {
      size = 10;
    }

    if(_.isNaN(offset)) {
      offset = 0;
    }

    pool.query('SELECT * FROM Timeline LIMIT $1::integer OFFSET $2::integer', [ size, offset ]).then(
      result => res.send(result.rows),
      result => res.status(500).send('This will be fixed soon!')
    );
  }
};

export default TimelineController;
