import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { Event } from '../models/event.type';

@Injectable({
	providedIn: 'root',
})
export class EventsService {
	constructor(private http: HttpClient, private auth: AuthService) {}

	async getAllEvents(latitude: number, longitude: number) {
		return this.http
			.get<Event[]>(`${env.api.base}/events`, {
				params: {
					latitude: String(latitude),
					longitude: String(longitude),
				},
			})
			.toPromise();
	}

	async getMyEvents() {
		return this.http.get<Event[]>(`${env.api.base}/events/me`).toPromise();
	}

	async getEventById(id: string) {
		return this.http.get<Event>(`${env.api.base}/events/${id}`).toPromise();
	}

	async deleteEvent(id: string) {
		return this.http.delete(`${env.api.base}/events/${id}`).toPromise();
	}

	async createEvent(event: {
		name: string;
		price: string;
		description: string;
		location: { latitude: string; longitude: string };
		dates: { begin: Date; end: Date };
		tags: string[];
	}) {
		return this.http.post(`${env.api.base}/events`, event).toPromise();
	}
}
