import { Component, OnInit } from '@angular/core';
import { LocationService } from '../services/location.service';

@Component({
	selector: 'av-discover',
	templateUrl: './discover.component.html',
	styleUrls: ['./discover.component.scss'],
})
export class DiscoverComponent implements OnInit {
	constructor(private locationService: LocationService) {}

	isLoading = false;
	location?: GeolocationPosition;

	ngOnInit(): void {}



	async getLocation() {
		this.isLoading = true;
		try {
			const location = await this.locationService.getLocation();
			this.location = location;
		} catch (error) {
			console.error('Error while fetching the geolocation', error);
			if (error.code === 1) {
				console.log('User denied geolocation access');
				alert('Access blocked by user');
			}
		} finally {
			this.isLoading = false;
		}
	}
}
