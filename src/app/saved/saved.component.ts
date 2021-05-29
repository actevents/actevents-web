import { Component, OnInit, ViewChild } from '@angular/core';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';
import { Event } from '../models/event.type';
import { FavoritesService } from '../services/favorites.service';

@Component({
	selector: 'av-saved',
	templateUrl: './saved.component.html',
	styleUrls: ['./saved.component.scss'],
})
export class SavedComponent implements OnInit {

	isLoading = false;
	error;
	favorites: Event[] = [];

	constructor(private favoritesService: FavoritesService) {}

	async ngOnInit() {
		try {
			this.isLoading = true;

			const events = await this.favoritesService.getAll();
			this.favorites = events;
		} catch (error) {
			console.error(error);
			this.error = error;
		} finally {
			this.isLoading = false;
		}
	}
}
