import { Request, Response } from "express";
import Controller from "../decorators/Controller";
import { REMOVE, GET, POST } from "../decorators/HTTP";
import AuthenticatedMiddleware from "../middleware/AuthenticatedMiddleware";

const defaults = {
  entries: {
    limit: 10,
    offset: 0,
  },
};
/*
@Controller('timeline')
export class TimelineController {
  constructor(
    private timelineService:TimelineService
  ) { }

  @GET('manifest')
  manifest(req: Request, res: Response) {
    res.send({defaults});
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
*/
