interface IDataQuery<IQuery, IBody> {
  query:IQuery,
  body:IBody
}

interface IEndpoint<IRequest, IResponse> {
  IRequest:IRequest;
  IResponse:IResponse;
}

interface IPaginationContext {
  page:number;
  limit:number;
}

interface IEntity {
  id?:number;
}

interface ICredentials {
  username:string;
  password:string;
}

interface ITimelineEntry {
  id?:number;
  message:string;
  imageURL:string;
  label:string;
  labelURL:string;
  when:Date;
  createdOn?:Date;
  updatedOn?:Date;
}
