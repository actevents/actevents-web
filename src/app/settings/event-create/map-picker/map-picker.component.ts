import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import Map from 'ol/Map';
import View from 'ol/View';
import OSM from 'ol/source/OSM';
import * as olProj from 'ol/proj';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { Feature } from 'ol';
import Point from 'ol/geom/Point';
import { LocationService } from 'src/app/services/location.service';

@Component({
	selector: 'av-map-picker',
	templateUrl: './map-picker.component.html',
	styleUrls: ['./map-picker.component.scss'],
})
export class MapPickerComponent implements OnInit {

	constructor(private location: LocationService) { }

	map: Map;
	@Output() locationSelected = new EventEmitter<{ latitude: number; longitude: number }>();

	async ngOnInit() {
		const { coords } = await this.location.getLocation();

		this.map = new Map({
			target: 'map',
			layers: [
				new TileLayer({
					source: new OSM(),
				}),
			],
			view: new View({
				center: olProj.fromLonLat([coords.longitude, coords.latitude]),
				zoom: 12,
			}),
		});
	}

	getCenterLocation() {
		const [ longitude, latitude ] = olProj.toLonLat(this.map.getView().getCenter());
		this.locationSelected.emit({ latitude, longitude });
	}
}
