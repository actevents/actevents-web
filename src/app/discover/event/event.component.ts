import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { Event } from 'src/app/models/event.type';

@Component({
	selector: 'av-event',
	templateUrl: './event.component.html',
	styleUrls: ['./event.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventComponent implements OnInit {
	constructor() {}

	@Input()
	event: Event;

	ngOnInit(): void {}
}
