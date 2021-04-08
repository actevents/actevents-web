import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'av-event',
	templateUrl: './event.component.html',
	styleUrls: ['./event.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}
}
