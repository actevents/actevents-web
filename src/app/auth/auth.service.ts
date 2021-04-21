import { Injectable } from '@angular/core';
import { Auth } from 'aws-amplify';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	constructor() {}

	private loggedIn = true;

	public isLoggedIn(): boolean {
		return this.loggedIn;
	}

	public async loginAsync(username: string, password: string): Promise<void> {
		// Call api with credentials
		return new Promise<void>((resolve) => {
			setTimeout(() => {
				this.loggedIn = true;
				resolve();
			}, 500);
		});

		// await Auth.signIn(username, password);
	}

	public async logoutAsync() {
		this.loggedIn = false;
		// await Auth.signOut();
	}
}
