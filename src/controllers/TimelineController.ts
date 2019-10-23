import { isNaN } from 'lodash';
import {Request, Response} from 'express';

import logger from './../services/logger';
import TimelineService from "../services/TimelineService";
import Controller from "../decorators/Controller";
import {GET} from "../decorators/HTTP";

const defaults = {
  entries: {
    limit:10,
    offset:0
  }
};

@Controller('timeline')
export class TimelineController {
  constructor(
    private timelineService:TimelineService
  ) { }

  @GET('manifest')
  manifest(req: Request, res: Response) {
    logger.access('timeline.manifest', req);
    res.send({defaults});
  }

  @GET('entriesByPage')
  async entriesByPage(req: Request, res: Response) {
    logger.access('timeline.entriesByPage', req);

    let limit = parseInt(req.query.limit),
      page = parseInt(req.query.page);

    if (isNaN(limit) || limit === 0) limit = defaults.entries.limit;
    if (isNaN(page) || page < 1) page = 1;

    try {
      const entries = await this.timelineService.entriesByPage(page, limit);
      res.send(entries);
    } catch (err) {
      logger.internalError('timeline.entriesByPage', res, err);
    }
  }
}
