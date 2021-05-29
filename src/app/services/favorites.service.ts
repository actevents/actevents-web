import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment as env } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';
import { Event } from '../models/event.type';

@Injectable({
	providedIn: 'root',
})
export class FavoritesService {
	constructor(private http: HttpClient, private auth: AuthService) {}

	async getAll() {
		return this.http.get<Event[]>(`${env.api.base}/favorites`).toPromise();
	}

	async addToFavorites(eventId: string) {
		return this.http.post(`${env.api.base}/favorites`, {
			favorite: eventId
		}).toPromise();
	}

	async removeFromFavorites(eventId: string) {
		return this.http.delete(`${env.api.base}/favorites`, {
			params: {
				favorite: eventId
			}
		}).toPromise();
	}
}
