import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DiscoverComponent } from './discover.component';
import { EventDetailsComponent } from './event-details/event-details.component';

const routes: Routes = [
	{ path: '', component: DiscoverComponent },
	{
		path: 'events/:id',
		component: EventDetailsComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class DiscoverRoutingModule {}
