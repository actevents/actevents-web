import { Component, OnInit } from '@angular/core';
import { Event } from '../models/event.type';
import { EventsService } from '../services/events.service';
import { LocationService } from '../services/location.service';

@Component({
	selector: 'av-discover',
	templateUrl: './discover.component.html',
	styleUrls: ['./discover.component.scss'],
})
export class DiscoverComponent implements OnInit {
	constructor(private locationService: LocationService, private eventsService: EventsService) {}

	events?: Event[];
	isLoading = false;

	async ngOnInit() {
		await this.fetchEvents();
	}

	async fetchEvents() {
		this.isLoading = true;
		try {
			const location = await this.getLocation();
			const { latitude, longitude } = location.coords;
			this.events = await this.eventsService.getAllEvents(latitude, longitude);
		} catch (error) {
			console.error('Error fetching events', error);
		} finally {
			this.isLoading = false;
		}
	}

	async getLocation() {
		try {
			const location = await this.locationService.getLocation();
			return location;
		} catch (error) {
			switch (error.code) {
				case 1:
					console.log('User denied geolocation access');
					break;
				default:
					console.error('Uncaught error while fetching user location', error);
					break;
			}
			throw error;
		}
	}
}
