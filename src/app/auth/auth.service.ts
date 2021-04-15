import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
    constructor() {}

    _loggedIn = false;

    get isLoggedIn() {
        return this._loggedIn;
    }

    async tryLogin(username: string, password: string) {
        return new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                this._loggedIn = true;
                resolve();
            }, 2000);
        });
    }
}
