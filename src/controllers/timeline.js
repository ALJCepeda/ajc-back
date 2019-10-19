import { isNaN, isArray } from 'lodash';
import * as isUUID from 'is-uuid';

import logger from './../libs/logger';
import timelineDB from './../services/timeline';

const defaults = {
  entries: {
    limit:10,
    offset:0
  }
};

const TimelineController = {
  defaults,
  addRoutes(app) {
    app.get('/timeline/manifest', TimelineController.manifest);
    app.post('/timeline/entries', TimelineController.entries);
    app.get('/timeline/entriesByPage', TimelineController.entriesByPage);
    app.get('/timeline/entry/:id', TimelineController.entry);
  },
  manifest(req, res) {
    logger.access('timeline.manifest', req);
    res.send({ defaults, ...timelineDB.manifest });
  },
  entry(req, res) {
    logger.access('timeline.entry', req);

    const id = req.params.id;
    if(!isUUID.v4(id)) {
      return res.status(422).send('id must be a uuidv4');
    }

    timelineDB.entry(id).then(entry => {
      res.send(entry);
    }, logger.internalError('timeline.entry', res));
  },
  entries(req, res) {
    logger.access('timeline.entries', req);

    let ids = req.body;

    if(!isArray(ids)) return res.status(422).send('body must be an array');
    if(!ids.every(isUUID.v4)) return res.status(422).send('all ids must be a uuidv4');

    timelineDB.entries(ids).then(entries => {
      res.send(entries);
    }, logger.internalError('timeline.entries', res));
  },
  entriesByPage(req, res) {
    logger.access('timeline.entriesByPage', req);

    let limit = parseInt(req.query.limit),
        page = parseInt(req.query.page);

    if(isNaN(limit) || limit === 0) limit = defaults.entries.limit;
    if(isNaN(page) || page < 1) page = 1;

    timelineDB.entriesByPage(page, limit).then(ids => {
      res.send(ids.map(entry => entry.id));
    }, logger.internalError('timeline.entriesByPage', res));
  }
};

export default TimelineController;
