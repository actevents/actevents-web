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

	form: FormGroup;

	constructor(private fb: FormBuilder, private eventsService: EventsService) {
		this.form = fb.group({
			name: ['', Validators.required],
			start: ['', Validators.required],
			end: [''],
			description: ['', Validators.required],
			price: [undefined],
			latitude: ['', Validators.required],
			longitude: ['', Validators.required],
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
			price,
			location: {
				latitude,
				longitude,
			},
		});

		console.log('event created');
	}
}
