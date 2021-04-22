import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
	templateUrl: './register-page.component.html',
	styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit {
	form: FormGroup;
	isLoading = false;
	isSubmitted = false;
	registrationSuccessful = false;

	constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {
		this.form = fb.group({
			email: ['', Validators.email],
			password: ['', Validators.required],
			passwordConfirm: ['', Validators.required]
		});
	}

	async ngOnInit() {
		if (await this.authService.isLoggedIn()) {
			await this.router.navigate(['/']);
			return;
		}
	}

	async onSubmit() {
		if (this.form.invalid) {
			return;
		}

		const email = this.form.get('email')?.value;
		const password = this.form.get('password')?.value;
		const passwordConfirm = this.form.get('passwordConfirm')?.value;
		if (password !== passwordConfirm) {
			this.form.get('passwordConfirm')?.setErrors({ notMatch: true });
			return;
		}

		try {
			this.isLoading = true;

			const success = await this.authService.signUpAsync(email, password);
			this.registrationSuccessful = true;
			this.isSubmitted = true;
		} catch (error) {
			switch (error.code) {
				case 'UsernameExistsException':
					this.form.get('email')?.setErrors({ alreadyExists: true });
					break;

				default:
					console.error('uncatched register error', error);
					alert('Unhandled register error:\n' + error.message);
					break;
			}
		}
	}
}

