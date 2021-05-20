import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Event } from 'src/app/models/event.type';
import { EventsService } from 'src/app/services/events.service';

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
import { LocationService } from 'src/app/services/location.service';

@Component({
	templateUrl: './event-details.component.html',
	styleUrls: ['./event-details.component.scss'],
})
export class EventDetailsComponent implements OnInit {
	constructor(private eventsService: EventsService, private locationService: LocationService, private route: ActivatedRoute) {}

	event: Event;
	isLoading = false;
	error;
	map: Map;

	async ngOnInit() {
		this.isLoading = true;
		const { id } = this.route.snapshot.params;
		try {
			const location = await this.locationService.getLocation();
			const event = await this.eventsService.getEventById(id, location.coords);
			this.event = event;

			const { longitude, latitude } = event.location;

			this.map = new Map({
				target: 'map',
				layers: [
					new TileLayer({
						source: new OSM(),
					}),
					new VectorLayer({
						source: new VectorSource({
							features: [new Feature(new Point(olProj.fromLonLat([Number(longitude), Number(latitude)])))],
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
					}),
				],
				view: new View({
					center: olProj.fromLonLat([Number(longitude), Number(latitude)]),
					zoom: 15,
				}),
			});

		} catch (error) {
			this.error = error;
		} finally {
			this.isLoading = false;
		}
	}
}
