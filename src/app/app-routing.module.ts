import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { ShellRoutingModule } from './shell/shell-routing.module';
import { ShellComponent } from './shell/shell.component';
import { ShellModule } from './shell/shell.module';

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
		component: ShellComponent,
		loadChildren: () => import('./shell/shell.module').then(m => m.ShellModule),
		canActivate: [AuthGuard],
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
