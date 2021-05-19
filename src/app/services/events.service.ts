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

	async getAllEvents(latitude: number, longitude: number, radius?: number) {
		const params: { longitude: string; latitude: string; radius?: string } = {
			latitude: String(latitude),
			longitude: String(longitude),
		};
		if (radius) {
			params.radius = String(radius);
		}
		return this.http.get<Event[]>(`${env.api.base}/events`, { params }).toPromise();
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
		fileName?: string;
	}) {
		return this.http.post<{ message: string }>(`${env.api.base}/events`, event).toPromise();
	}

	async getUploadUrl() {
		return this.http.get<{ uploadUrl: string; fileName: string }>(`${env.api.base}/events`).toPromise();
	}

	async uploadImage(uploadUrl: string, file: File) {
		const content = await file.text();
		console.log(content);
		// return this.http.put(uploadUrl, content).toPromise();
	}
}
