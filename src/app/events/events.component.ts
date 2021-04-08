import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'av-events',
	templateUrl: './events.component.html',
	styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}

	events = [
		{
			name: 'Test Event 1',
			date: new Date(),
			location: {
				lon: '48.499978',
				lat: '8.414807',
			},
		},
		{
			name: 'Test Event 2',
			date: new Date(),
			location: {
				lon: '48.499978',
				lat: '8.414807',
			},
		},
		{
			name: 'Test Event 3',
			date: new Date(),
			location: {
				lon: '48.499978',
				lat: '8.414807',
			},
		},
		{
			name: 'Test Event 4',
			date: new Date(),
			location: {
				lon: '48.499978',
				lat: '8.414807',
			},
		},
		{
			name: 'Test Event 5',
			date: new Date(),
			location: {
				lon: '48.499978',
				lat: '8.414807',
			},
		},
	];
}
