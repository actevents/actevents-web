import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventCreateComponent } from './event-create/event-create.component';
import { EventDetailsComponent } from './event-details/event-details.component';
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
	},
	{
		path: 'events',
		component: EventsComponent,
	},
	{
		path: 'events/create',
		component: EventCreateComponent,
	},
	{
		path: 'events/:eventId',
		component: EventDetailsComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class SettingsRoutingModule {}
