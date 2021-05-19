import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Event } from 'src/app/models/event.type';
import { EventsService } from 'src/app/services/events.service';
import { environment as env } from 'src/environments/environment';

@Component({
	templateUrl: './event-details.component.html',
	styleUrls: ['./event-details.component.scss'],
})
export class EventDetailsComponent implements OnInit {
	constructor(private eventsService: EventsService, private route: ActivatedRoute, private router: Router) {}

	isLoading = false;
	event: Event;
	error;

	get eventUrl(): string {
		return env.baseUrl + '/events/' + this.event?.id;
	}

	async ngOnInit() {
		this.isLoading = true;
		try {
			const { eventId } = this.route.snapshot.params;
			this.event = await this.eventsService.getEventById(eventId);
		} catch (error) {
			this.error = error;
		} finally {
			this.isLoading = false;
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
