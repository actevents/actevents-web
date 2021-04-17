import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';

const routes: Routes = [
	{
		path: 'login',
		component: LoginPageComponent,
	},
	{
		path: 'register',
		component: RegisterPageComponent,
	},
	{
		path: '',
		loadChildren: () => import('./shell/shell.module').then((m) => m.ShellModule),
		canActivate: [AuthGuard],
		data: {
			test: true
		}
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
