import {Application} from "express";
import bcrypt from 'bcrypt';
import passport from 'passport';
import {Strategy as LocalStrategy} from "passport-local";
import User from "../models/User";
import {DependencyContainer} from "expressman";
import UserRepository from "../adapters/UserRepository";

export function setupPassport(app:Application, container:DependencyContainer) {
  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser(function (user:User, done) {
    done(null, user.username);
  });

  passport.deserializeUser(function (username:string, done) {
    const userRepository = container.resolve(UserRepository);
    userRepository.entry(username).then((user) => {
      return done(null, user)
    }).catch((err) => done(err));
  });

  passport.use(new LocalStrategy(function (username, password, done) {
    const userRepository = container.resolve(UserRepository);

    userRepository.entry(username).then((user) => {
      if(!user) {
        return done(null, false);
      }

      bcrypt.compare(password, user.password, function(err, matches) {
        if(!matches || err) {
          return done(err, false);
        }

        return done(err, user);
      });
    }).catch((err) => done(err));
  }));
}
