import {Request, Response} from 'express';
import { check } from 'express-validator';
import TimelineService from "../services/TimelineService";
import Controller from "../decorators/Controller";
import {REMOVE, GET, POST} from "../decorators/HTTP";
import AuthenticatedMiddleware from "../middleware/AuthenticatedMiddleware";

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

  @GET('', [
    check('limit').isInt({ gt:0 }).withMessage('Limit must be larger than 0'),
    check('page').isInt({ gt:0 }).withMessage('Page must be larger than 0')
  ]) async entries(req: Request, res: Response) {
    const limit = parseInt(req.query.limit);
    const page = parseInt(req.query.page);
    const time = parseInt(req.query.time);
    
    if(time) {
      setTimeout(() => {
        res.send([]);
      }, time);
    } else {
      const entries = await this.timelineService.entriesByPage(page, limit);
      res.send(entries);
    }
  }

  @POST('', AuthenticatedMiddleware)
  async upsert(req:Request, res:Response) {
    const entry = this.timelineService.upsert(req.body);
    res.send(entry);
  }

  @REMOVE('', AuthenticatedMiddleware)
  async remove(req:Request, res:Response) {
    await this.timelineService.remove(req.body.id);
    res.send(true);
  }
}
