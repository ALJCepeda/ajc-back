import {Request} from "express";
import User from "./models/User";

export interface RequestContext extends Request {
  user: User
}

export interface ClientState {
  isAuthenticated: boolean
}

interface IDataQuery<IQuery, IBody> {
  query:IQuery,
  body:IBody
}

interface IEndpoint<IRequest, IResponse> {
  IRequest:IRequest;
  IResponse:IResponse;
}

interface PaginationContext {
  page:number;
  limit:number;
}

interface IEntity {
  id?:number;
}

interface Credentials {
  email:string;
  password:string;
}

export type BannedFields = 'password' | 'id';
export type Public<T> = Omit<T, BannedFields>
