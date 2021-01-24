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

interface ITimelineEntry {
	message:string;
	imageURL:string;
	label:string;
	labelURL:string;
}


