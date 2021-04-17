import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
	templateUrl: './login-page.component.html',
	styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
	constructor(private authService: AuthService, private router: Router) {}

	ngOnInit(): void {}

	async onLogin(): Promise<void> {
		try {
			await this.authService.loginAsync('', '');
			await this.router.navigate(['/']);
		} catch (error) {}
	}
}
