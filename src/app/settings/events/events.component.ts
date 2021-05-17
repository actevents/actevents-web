import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/models/event.type';
import { EventsService } from 'src/app/services/events.service';

@Component({
	templateUrl: './events.component.html',
	styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit {
	constructor(private eventsService: EventsService) {}

	myEvents: Event[] = [];

	async ngOnInit() {
		const events = await this.eventsService.getMyEvents();
		this.myEvents = events;
	}
}
