import { Component, OnInit } from '@angular/core';
import { Event } from '../models/event.type';
import { EventsService } from '../services/events.service';
import { LocationService } from '../services/location.service';

import Map from 'ol/Map';
import View from 'ol/View';
import OSM from 'ol/source/OSM';
import * as olProj from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Feature } from 'ol';
import Point from 'ol/geom/Point';
import { Circle, Fill, Style, Icon } from 'ol/style';
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
	map: Map;

	svg = `<svg width="120" height="120" version="1.1" xmlns="http://www.w3.org/2000/svg"><circle cx="60" cy="60" r="60"/></svg>`;

	async ngOnInit() {
		const location = await this.fetchLocation();
		this.location = location;
		const { latitude, longitude } = location.coords;

		await this.fetchEvents(latitude, longitude);
		this.map = new Map({
			target: 'map',
			layers: [
				new TileLayer({
					source: new OSM(),
				}),
				...this.getVectorLayersFromEvents(this.events)
			],
			view: new View({
				center: olProj.fromLonLat([longitude, latitude]),
				zoom: 12,
			}),
		});
	}

	async fetchLocation() {
		return await this.getLocation();
	}

	async fetchEvents(latitude: number, longitude: number) {
		this.isLoading = true;
		try {
			const events = await this.eventsService.getAllEvents(latitude, longitude);
			this.events = events.sort((a, b) => a.distance - b.distance);
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

	getVectorLayersFromEvents(events: Event[]) {
		return events.map<VectorLayer>((e) => {
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
					})
				}),
			});
		});
	}
}
