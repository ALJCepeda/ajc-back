import Controller from "../decorators/Controller";
import {POST} from "../decorators/HTTP";
import {Response} from "express";
import {RequestContext} from "../types";

import passport = require('passport');

@Controller('')
export class AppController {
  @POST('/login', passport.authenticate('local'))
  login(req: RequestContext, res: Response) {
    req.login(req.user, (err) => {
      if(err) { throw err; }
      res.status(200);
      res.send(req.user);
    });
  }
}