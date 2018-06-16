import fs from 'fs';
import _ from 'lodash';
import Promise from 'bluebird';

import logger from './../services/logger';
import timelineDB from './../dbs/timeline';

const defaults = {
  entries: {
    limit:10,
    offset:0
  }
};

const TimelineController = {
  defaults,
  addRoutes: (app) => {
    app.get('/timeline/manifest', TimelineController.manifest);
    app.get('/timeline/entries', TimelineController.entries);
  },
  manifest: (req, res) => {
    logger.access('timeline.manifest', req);
    res.send({ defaults, ...timelineDB.manifest });
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

    timelineDB.entries(offset, limit).then(entries => {
      entries.forEach(entry => {
        entry.image = `${process.env.STATIC_URL}/images/${entry.image}`
      });

      res.send(entries);
    }, logger.internalError('timeline.entries', res));
  }
};

export default TimelineController;
