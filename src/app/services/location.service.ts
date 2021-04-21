import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class LocationService {
	public getLocation() {
		return new Promise<GeolocationPosition>((resolve, reject) => {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(
					(position) => {
						resolve(position);
					},
					(error) => {
						reject(error);
					}
				);
			}
		});
	}
}
