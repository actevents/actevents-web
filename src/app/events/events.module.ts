import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { EventsComponent } from './events.component';

import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';


@NgModule({
	declarations: [EventsComponent],
	imports: [CommonModule, EventsRoutingModule, CardModule, ButtonModule],
})
export class EventsModule {}
