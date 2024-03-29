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
import LayerGroup from 'ol/layer/Group';

import { environment as env } from 'src/environments/environment';
import { FavoritesService } from '../services/favorites.service';

@Component({
	selector: 'av-discover',
	templateUrl: './discover.component.html',
	styleUrls: ['./discover.component.scss'],
})
export class DiscoverComponent implements OnInit {
	constructor(
		private locationService: LocationService,
		private eventsService: EventsService,
		private favoritesService: FavoritesService
	) {}

	events: Event[] = [];
	favorites?: Event[] = [];
	location: GeolocationPosition;
	isLoading = false;
	error;
	map: Map;

	radius = 10;
	maxRadius = env.production ? 50 : 800;

	markerGroup: LayerGroup;

	async ngOnInit() {
		try {
			this.isLoading = true;
			let radius: number;
			if (localStorage.getItem('searchRadius')) {
				radius = Number(localStorage.getItem('searchRadius'));
				this.radius = radius;
			}
			const location = await this.fetchLocation();
			this.location = location;

			this.events = await this.fetchEvents(location, radius);
			this.favorites = await this.favoritesService.getAll();

			this.paintMap(location, this.events);
		} catch (error) {
			this.error = error;
		} finally {
			this.isLoading = false;
		}
	}

	async fetchLocation() {
		return await this.getLocation();
	}

	paintMap(userLocation: GeolocationPosition, events: Event[]) {
		const { coords } = userLocation;

		this.markerGroup = new LayerGroup({
			layers: events.map<VectorLayer>((e) => {
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
		});

		this.map = new Map({
			target: 'map',
			layers: [
				new TileLayer({
					source: new OSM(),
				}),
				new VectorLayer({
					source: new VectorSource({
						features: [new Feature(new Point(olProj.fromLonLat([coords.longitude, coords.latitude])))],
					}),
					style: new Style({
						image: new Circle({
							radius: 8,
							stroke: new Stroke({ width: 4, color: '#0e4da4' }),
						}),
					}),
				}),
				this.markerGroup,
			],
			view: new View({
				center: olProj.fromLonLat([coords.longitude, coords.latitude]),
				zoom: 12,
			}),
		});
	}

	updateMap(userLocation: GeolocationPosition, events: Event[]) {
		this.map.removeLayer(this.markerGroup);
		this.markerGroup = new LayerGroup({
			layers: events.map<VectorLayer>((e) => {
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
		});
		this.map.addLayer(this.markerGroup);
	}

	async fetchEvents(user: GeolocationPosition, radius?: number) {
		this.isLoading = true;
		this.error = undefined;
		const { coords } = user;
		try {
			const events = await this.eventsService.getAllEvents(coords.latitude, coords.longitude, radius);
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
		localStorage.setItem('searchRadius', String(radius));
		this.events = await this.fetchEvents(this.location, radius);
		this.updateMap(this.location, this.events);
	}

	isFavorite(event: Event) {
		return this.favorites.some(e => e.id === event.id);
	}
}
