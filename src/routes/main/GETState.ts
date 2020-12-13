import { GET, Before, inject, tokens } from "expressman";

import {ClientState, RequestContext} from "../../types";
import AuthenticatedMiddleware from "../../middleware/AuthenticatedMiddleware";


@GET("/state")
@Before(AuthenticatedMiddleware)
export default class GETEntries {
	constructor(
		@inject(tokens.Request) public request: RequestContext
	) {}

	async handle(): Promise<ClientState> {
		return {
			isAuthenticated: true
		}
	}
}
