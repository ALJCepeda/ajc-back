import {Application} from "express";
import bcrypt from 'bcrypt';
import passport = require('passport');
import {Strategy as LocalStrategy} from "passport-local";
import User from "../models/User";
import {Container} from "inversify";
import UserService from "../services/UserService";

class AuthenticationFailed extends Error {
  constructor(username:string) {
    super(`Failed to authenticate ${username}`);
  }
}
export function setupPassport(app:Application, container:Container) {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user:User) => {
    return user.username;
  });

  passport.deserializeUser((username:string, done) => {
    const userService = container.resolve(UserService);
    userService.entry(username).then((user) => done(null, user), (err) => done(err));
  });

  passport.use(new LocalStrategy((username, password, done) => {
    const userService = container.resolve(UserService);
    console.log('Attempting to authenticate:', username);

    return userService.entry(username).then((user) => {
      if(!user) {
        throw new AuthenticationFailed(username);
      } else {
        bcrypt.compare(password, user.password, function(err, matches) {
          if(!matches) {
            throw new AuthenticationFailed(username);
          }

          console.log(`Authenticated ${username}:`, user);
          return done(null, user);
        });
      }
    }).catch((err) => {
      console.log('Failed to authenticate', err);
      done(new AuthenticationFailed(username));
    });
  }));
}