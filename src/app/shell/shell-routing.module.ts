import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiscoverModule } from '../discover/discover.module';
import { SavedModule } from '../saved/saved.module';
import { SettingsModule } from '../settings/settings.module';
import { ShellComponent } from './shell.component';

const routes: Routes = [
	{
		path: '',
		loadChildren: () => import('../discover/discover.module').then(m => m.DiscoverModule),
	},
	{
		path: 'saved',
		loadChildren: () => import('../saved/saved.module').then(m => m.SavedModule),
	},

	{
		path: 'settings',
		loadChildren: () => import('../settings/settings.module').then(m => m.SettingsModule),
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ShellRoutingModule {}
