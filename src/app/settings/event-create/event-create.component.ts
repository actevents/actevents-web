import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventsService } from 'src/app/services/events.service';

@Component({
	templateUrl: './event-create.component.html',
	styleUrls: ['./event-create.component.scss'],
})
export class EventCreateComponent implements OnInit {
	isMultiDate = false;
	isLocationPopupOpen = false;

	today = new Date();

	form: FormGroup;

	constructor(private fb: FormBuilder, private eventsService: EventsService) {
		this.form = fb.group({
			name: [null, Validators.required],
			start: [null, Validators.required],
			end: [null, Validators.required],
			description: [null, Validators.required],
			price: [0],
			latitude: [null, Validators.required],
			longitude: [null, Validators.required],
		});
	}

	ngOnInit(): void {}

	onLocationSelected(event) {
		this.form.controls.latitude.setValue(event.latitude);
		this.form.controls.longitude.setValue(event.longitude);
		this.isLocationPopupOpen = false;
	}

	async onSubmit() {
		this.form.markAllAsTouched();
		if (this.form.invalid) {
			return;
		}

		const { name, start, end, description, price, latitude, longitude } = this.form.value;

		await this.eventsService.createEvent({
			name,
			description,
			dates: {
				begin: start,
				end,
			},
			price: String(price),
			location: {
				latitude: String(latitude),
				longitude: String(longitude),
			},
			tags: []
		});

		console.log('event created');
	}
}
