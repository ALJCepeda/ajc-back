import Controller from "../decorators/Controller";
import {POST} from "../decorators/HTTP";
import {Response} from "express";
import {RequestContext} from "../types";

import passport = require('passport');

@Controller('')
export class AppController {
  @POST('/login', passport.authenticate('local'))
  login(req: RequestContext, res: Response) {
    console.log('User:', req.user);
    res.redirect('/admin');
  }
}