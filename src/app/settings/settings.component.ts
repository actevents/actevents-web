import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { environment as env } from 'src/environments/environment';

@Component({
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
	constructor(private authService: AuthService, private router: Router) {}

	get isProduction() {
		return env.production;
	}

	ngOnInit(): void {}

	async onLogout() {
		await this.authService.logoutAsync();
		this.router.navigate(['/login']);
	}

	async printToken() {
		const token = await this.authService.getToken();
		console.log(token.getJwtToken());
	}
}
