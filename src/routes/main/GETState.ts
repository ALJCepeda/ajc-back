import { API, GET, Before, inject, tokens } from "expressman";
import {ClientState, RequestContext} from "../../types";
import AuthenticatedMiddleware from "../../middleware/AuthenticatedMiddleware";

@API('/')
export default class GETState {
	constructor(
		@inject(tokens.Request) public request: RequestContext
	) {}
	
	@GET("/state")
	@Before(AuthenticatedMiddleware)
	async GETState(): Promise<ClientState> {
		return {
			isAuthenticated: true
		}
	}
}
