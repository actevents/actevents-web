import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventsComponent } from './events/events.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings.component';

const routes: Routes = [
	{
		path: '',
		component: SettingsComponent,
	},
	{
		path: 'profile',
		component: ProfileComponent,
		data: {
			canGoBack: true
		}
	},
	{
		path: 'events',
		component: EventsComponent,
		data: {
			canGoBack: true
		}
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class SettingsRoutingModule {}
