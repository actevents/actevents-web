import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShellComponent } from './shell.component';

const routes: Routes = [
	{
		path: '',
		component: ShellComponent,
		children: [
			{
				path: '',
				loadChildren: () => import('../discover/discover.module').then((m) => m.DiscoverModule),
			},
			{
				path: 'saved',
				loadChildren: () => import('../saved/saved.module').then((m) => m.SavedModule),
			},

			{
				path: 'settings',
				loadChildren: () => import('../settings/settings.module').then((m) => m.SettingsModule),
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ShellRoutingModule {}
