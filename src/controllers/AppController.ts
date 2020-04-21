import Controller from "../decorators/Controller";
import {POST} from "../decorators/HTTP";
import {Response} from "express";
import {RequestContext} from "../types";

import passport = require('passport');

@Controller('')
export class AppController {
  @POST('/login', passport.authenticate('local', { session:true }))
  login(req: RequestContext, res: Response) {
    res.end();
  }
}