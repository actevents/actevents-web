import { Component, OnInit } from '@angular/core';
import { Event } from '../models/event.type';
import { EventsService } from '../services/events.service';
import { LocationAccessError, LocationService } from '../services/location.service';

import Map from 'ol/Map';
import View from 'ol/View';
import OSM from 'ol/source/OSM';
import * as olProj from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Feature } from 'ol';
import Point from 'ol/geom/Point';
import { Circle, Fill, Style, Icon, Stroke } from 'ol/style';
import IconAnchorUnits from 'ol/style/IconAnchorUnits';

@Component({
	selector: 'av-discover',
	templateUrl: './discover.component.html',
	styleUrls: ['./discover.component.scss'],
})
export class DiscoverComponent implements OnInit {
	constructor(private locationService: LocationService, private eventsService: EventsService) {}

	events?: Event[];
	location: GeolocationPosition;
	isLoading = false;
	error;
	map: Map;

	radius = 10;

	svg = `<svg width="120" height="120" version="1.1" xmlns="http://www.w3.org/2000/svg"><circle cx="60" cy="60" r="60"/></svg>`;

	async ngOnInit() {
		const location = await this.fetchLocation();
		this.location = location;
		const { latitude: userLat, longitude: userLon } = location.coords;

		this.events = await this.fetchEvents(userLat, userLon);
		this.map = new Map({
			target: 'map',
			layers: [
				new TileLayer({
					source: new OSM(),
				}),
				new VectorLayer({
					source: new VectorSource({
						features: [new Feature(new Point(olProj.fromLonLat([Number(userLon), Number(userLat)])))],
					}),
					style: new Style({
						image: new Circle({
							radius: 8,
							stroke: new Stroke({ width: 4, color: '#0e4da4' }),
						}),
					}),
				}),
				...this.events.map<VectorLayer>((e) => {
					const { longitude, latitude } = e.location;
					const point = new Point(olProj.fromLonLat([Number(longitude), Number(latitude)]));
					return new VectorLayer({
						source: new VectorSource({
							features: [new Feature(point)],
						}),
						style: new Style({
							image: new Icon({
								anchor: [0.5, 0.7],
								anchorXUnits: IconAnchorUnits.FRACTION,
								anchorYUnits: IconAnchorUnits.FRACTION,
								scale: 0.2,
								src: '/assets/marker.svg',
							}),
						}),
					});
				}),
			],
			view: new View({
				center: olProj.fromLonLat([userLon, userLat]),
				zoom: 12,
			}),
		});
	}

	async fetchLocation() {
		return await this.getLocation();
	}

	async fetchEvents(latitude: number, longitude: number, radius?: number) {
		this.isLoading = true;
		this.error = undefined;
		try {
			const events = await this.eventsService.getAllEvents(latitude, longitude, radius);
			return events.sort((a, b) => a.distance - b.distance);
		} catch (error) {
			this.error = error;
			console.error('Error fetching events', error);
			throw error;
		} finally {
			this.isLoading = false;
		}
	}

	async getLocation() {
		try {
			const location = await this.locationService.getLocation();
			return location;
		} catch (error) {
			switch (error as LocationAccessError) {
				case LocationAccessError.PermissionDenied:
					this.error = new Error('Cannot access location, please enable location access');
					break;
				case LocationAccessError.PositionUnavailable:
					this.error = new Error('Cannot get your current location, please try again later');
					break;
				case LocationAccessError.NoLocationAccess:
					this.error = new Error('Your device does not support location access');
					break;
			}
			throw error;
		}
	}

	getVectorLayersFromEvents(events: Event[]) {
		return null;
	}

	async onRadiusChange(radius: number) {
		console.log(radius);
		const { coords } = this.location;
		const { longitude, latitude } = coords;
		await this.fetchEvents(latitude, longitude, radius);
	}
}
