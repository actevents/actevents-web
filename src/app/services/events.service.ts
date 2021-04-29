import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from 'src/environments/environment';
import { Event } from '../models/event.type';

@Injectable({
	providedIn: 'root',
})
export class EventsService {
	constructor(private http: HttpClient) {}

	getAllEvents(latitude: number, longitude: number) {
		return this.http.get<Event[]>(`${env.api.base}/events`, {
			params: {
				latitude: String(latitude),
				longitude: String(longitude)
			}
		});
	}
}
