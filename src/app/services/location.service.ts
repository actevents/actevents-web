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
						switch (error.code) {
							case error.PERMISSION_DENIED:
								reject(LocationAccessError.PermissionDenied);
								break;
							case error.POSITION_UNAVAILABLE:
								reject(LocationAccessError.PositionUnavailable);
								break;
							case error.TIMEOUT:
								reject(LocationAccessError.Timeout);
								break;
							default:
								reject(error);
						}
					}
				);
			} else {
				reject(LocationAccessError.NoLocationAccess);
			}
		});
	}
}

export enum LocationAccessError {
	PermissionDenied,
	PositionUnavailable,
	Timeout,
	NoLocationAccess
}
