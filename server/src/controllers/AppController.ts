import Controller from "../decorators/Controller";
import {GET, POST} from "../decorators/HTTP";
import {Response} from "express";
import {RequestContext} from "../types";

import passport = require('passport');
import {Resp} from "../models/http/Resp";
import AuthenticatedMiddleware from "../middleware/AuthenticatedMiddleware";

@Controller('')
export class AppController {
  @POST('/login', passport.authenticate('local'))
  login(req: RequestContext, res: Response) {
    if(req.user) {
      req.login(req.user, (err) => {
        if(err) { throw err; }

        res.status(200);
        res.send(req.user);
      });
    }
  }

  @GET('/state', AuthenticatedMiddleware)
  getState(req: RequestContext, res:Response) {
    return {
      isAuthenticated:true
    };
  }
}