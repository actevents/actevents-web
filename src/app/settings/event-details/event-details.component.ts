import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Event } from 'src/app/models/event.type';
import { EventsService } from 'src/app/services/events.service';

@Component({
	templateUrl: './event-details.component.html',
	styleUrls: ['./event-details.component.scss'],
})
export class EventDetailsComponent implements OnInit {
	constructor(private eventsService: EventsService, private route: ActivatedRoute, private router: Router) {}

	event: Event;
	error;

	async ngOnInit() {
		try {
			const { eventId } = this.route.snapshot.params;
			this.event = await this.eventsService.getEventById(eventId);
		} catch (error) {
			this.error = error;
		}
	}

	async deleteEvent() {
		this.error = null;
		try {
			await this.eventsService.deleteEvent(this.event.id);
			await this.router.navigate(['/settings/events']);
		} catch (error) {
			this.error = error;
		}
	}
}
