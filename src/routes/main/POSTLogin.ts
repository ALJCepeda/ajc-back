import { POST, Before, inject, tokens } from "expressman";
import passport from 'passport';
import {UserDTO} from "../../models/User";

import {RequestContext} from "../../types";

@POST("/login")
@Before(passport.authenticate('local'))
export default class POSTLogin {
	constructor(
		@inject(tokens.Request) public request: RequestContext
	) {}

	handle(): Promise<UserDTO> {
		if (this.request.user) {
			return new Promise((resolve, reject) => {
				this.request.login(this.request.user, (err) => {
					if (err) {
						return reject(err)
					}

					resolve(this.request.user.toDTO());
				});
			});
		}

		throw new Error('Failed to authenticate');
	}
}
