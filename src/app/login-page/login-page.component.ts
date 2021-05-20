import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
	templateUrl: './login-page.component.html',
	styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
	isLoading: boolean;
	isSubmitted = false;
	form: FormGroup;

	constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder) {
		this.form = fb.group({
			email: ['', Validators.email],
			password: ['', Validators.required],
		});
	}

	async ngOnInit() {
		if (await this.authService.isLoggedIn()) {
			await this.router.navigate(['/']);
			return;
		}
	}

	async onSubmit() {
		this.isSubmitted = true;
		if (this.form.invalid) {
			return;
		}

		try {
			this.isLoading = true;
			const email = this.form.get('email')?.value;
			const password = this.form.get('password')?.value;
			await this.authService.loginAsync(email, password);

			const { returnUrl } = this.route.snapshot.queryParams;
			if (returnUrl) {
				await this.router.navigate([returnUrl]);
			} else {
				await this.router.navigate(['/']);
			}
		} catch (error) {
			console.log(error);
			switch (error.code) {
				case 'UserNotConfirmedException':
					this.form.get('email')?.setErrors({ notConfirmed: true });
					break;
				case 'NotAuthorizedException':
					this.form.get('email')?.setErrors({ invalid: true });
					this.form.get('password')?.setErrors({ invalid: true });
					break;
				default:
					console.log('unhandled login error', error);
					alert('Unhandled login error:\n' + error.message);
					break;
			}
		} finally {
			this.isLoading = false;
		}
	}
}
