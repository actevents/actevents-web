import { Component, OnInit } from '@angular/core';

@Component({
	templateUrl: './feed.component.html',
	styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit {
	constructor() {}

	events = ['Test Event', 'Test Event', 'Test Event', 'Test Event', 'Test Event', 'Test Event', 'Test Event', 'Test Event']

	ngOnInit(): void {}
}
