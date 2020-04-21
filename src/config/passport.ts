import {Application} from "express";
import bcrypt from 'bcrypt';
import passport = require('passport');
import {Strategy as LocalStrategy} from "passport-local";
import User from "../models/User";
import {Container} from "inversify";
import UserService from "../services/UserService";

export function setupPassport(app:Application, container:Container) {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(function (user:User, done) {
    done(null, user.username);
  });

  passport.deserializeUser(function (username:string, done) {
    const userService = container.resolve(UserService);
    userService.entry(username).then((user) => done(null, user)).catch((err) => done(err));
  });

  passport.use(new LocalStrategy(function (username, password, done) {
    const userService = container.resolve(UserService);
    console.log('Attempting to authenticate:', username);

    userService.entry(username).then((user) => {
      if(!user) {
        done(null, false);
      } else {
        bcrypt.compare(password, user.password, function(err, matches) {
          if(!matches) {
            done(err, false);
          }

          console.log(`Authenticated ${username}:`, user);
          done(err, user);
        });
      }
    }).catch((err) => done(err));
  }));
}