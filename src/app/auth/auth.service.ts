import { Injectable } from '@angular/core';
import Amplify, { Auth } from 'aws-amplify';

import { environment as env } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	constructor() {
		Amplify.configure({
			Auth: {
				region: env.cognito.region,
				userPoolId: env.cognito.userPoolId,
				userPoolWebClientId: env.cognito.userPoolWebClientId,
			},
		});
	}

	public async isLoggedIn(): Promise<boolean> {
		try {
			const user = await Auth.currentAuthenticatedUser();
			return !!user;
		} catch (error) {
			return false;
		}
	}

	public async getToken() {
		return (await Auth.currentSession()).getIdToken();
	}

	public async loginAsync(email: string, password: string): Promise<void> {
		await Auth.signIn(email, password);
	}

	public async signUpAsync(email: string, password: string) {
		const { user } = await Auth.signUp({
			username: email,
			password,
		});

		return user;
	}

	public async logoutAsync() {
		await Auth.signOut();
	}
}
