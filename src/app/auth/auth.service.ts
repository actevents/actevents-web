import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	constructor() {}

	private loggedIn = false;

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
	}

	public logout(): void {
		this.loggedIn = false;
	}
}
