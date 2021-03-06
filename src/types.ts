import {Request} from "express";
import User from "./models/User";

export interface RequestContext extends Request {
  user: User
}

export interface ClientState {
  isAuthenticated: boolean
}