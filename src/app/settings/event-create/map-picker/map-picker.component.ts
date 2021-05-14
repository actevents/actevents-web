import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import Map from 'ol/Map';
import View from 'ol/View';
import OSM from 'ol/source/OSM';
import * as olProj from 'ol/proj';
import TileLayer from 'ol/layer/Tile';

@Component({
	selector: 'av-map-picker',
	templateUrl: './map-picker.component.html',
	styleUrls: ['./map-picker.component.scss'],
})
export class MapPickerComponent implements OnInit {
	map: Map;
	@Output() locationSelected = new EventEmitter<{ latitude: number; longitude: number }>();

	constructor() {}

	ngOnInit(): void {
		this.map = new Map({
			target: 'map',
			layers: [
				new TileLayer({
					source: new OSM(),
				}),
			],
			view: new View({
				center: olProj.fromLonLat([9.194192862699525, 48.89756749780673]),
				zoom: 12,
			}),
		});
	}

	getCenterLocation() {
		const [ longitude, latitude ] = olProj.toLonLat(this.map.getView().getCenter());
		this.locationSelected.emit({ latitude, longitude });
	}
}
