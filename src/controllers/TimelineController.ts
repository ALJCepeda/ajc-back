import {Request, Response} from 'express';
import { check } from 'express-validator';
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
    res.send({defaults});
  }

  @GET('entries', [
    check('limit').isInt({ gt:0 }).withMessage('Limit must be larger than 0'),
    check('page').isInt({ gt:0 }).withMessage('Page must be larger than 0')
  ]) async entries(req: Request, res: Response) {
    const limit = parseInt(req.query.limit);
    const page = parseInt(req.query.page);

    const entries = await this.timelineService.entriesByPage(page, limit);
    res.send(entries);
  }
}
