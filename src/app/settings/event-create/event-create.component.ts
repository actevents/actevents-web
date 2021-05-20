import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { EventsService } from 'src/app/services/events.service';

@Component({
	templateUrl: './event-create.component.html',
	styleUrls: ['./event-create.component.scss'],
})
export class EventCreateComponent implements OnInit {
	isLocationPopupOpen = false;
	isLoading = false;
	today = new Date();

	error;

	form: FormGroup;
	file: File;

	constructor(private fb: FormBuilder, private eventsService: EventsService, private router: Router) {
		this.form = fb.group({
			name: [null, Validators.required],
			start: [null, Validators.required],
			end: [null, Validators.required],
			description: [null, Validators.required],
			price: [undefined],
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

		this.isLoading = true;
		try {
			let fileName;
			if (this.file) {
				const extension = this.file.name.slice(this.file.name.lastIndexOf('.') + 1);
				const uploadResponse = await this.eventsService.getUploadUrl(extension);
				console.log(uploadResponse);
				fileName = uploadResponse.fileName;
				await this.eventsService.uploadImage(uploadResponse.uploadUrl, this.file);
			}

			const response = await this.eventsService.createEvent({
				name,
				description,
				dates: {
					begin: moment(start).seconds(0).toDate(),
					end: moment(end).seconds(0).toDate(),
				},
				price: price ? String(price) : '0',
				location: {
					latitude: String(latitude),
					longitude: String(longitude),
				},
				tags: [],
				fileName
			});

			this.router.navigate(['/settings/events']);
		} catch (error) {
			console.log('Error event create', error);
			this.error = error;
		} finally {
			this.isLoading = false;
		}
	}

	onFileSelected(event) {
		const file: File = event.target.files[0];
		this.file = file;
	}
}
