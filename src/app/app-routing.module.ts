import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'discover',
	},
	{
		path: 'discover',
		loadChildren: () => import('./events/events.module').then((m) => m.EventsModule),
	},
	{ path: 'map', loadChildren: () => import('./map/map.module').then(m => m.MapModule) },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
