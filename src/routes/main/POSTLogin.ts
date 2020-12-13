import { POST, Before, inject, tokens } from "expressman";
import passport from 'passport';
import User from "../../models/User";

import {RequestContext} from "../../types";


@POST("/login")
@Before(passport.authenticate('local'))
export default class GETEntries {
	constructor(
		@inject(tokens.Request) public request: RequestContext
	) {}

	handle(): Promise<User> {
		if (this.request.user) {
			return new Promise((resolve, reject) => {
				this.request.login(this.request.user, (err) => {
					if (err) {
						return reject(err)
					}

					resolve(this.request.user)
				});
			});
		}

		throw new Error('Failed to authenticate');
	}
}
