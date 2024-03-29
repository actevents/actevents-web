import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { EventsComponent } from './events/events.component';
import { EventCreateComponent } from './event-create/event-create.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
	NgxMatDateAdapter,
	NgxMatDateFormats,
	NgxMatDatetimePickerModule,
	NgxMatNativeDateModule,
	NgxMatTimepickerModule,
	NGX_MAT_DATE_FORMATS,
} from '@angular-material-components/datetime-picker';

import { MapPickerComponent } from './event-create/map-picker/map-picker.component';
import { EventComponent } from '../discover/event/event.component';
import { DiscoverModule } from '../discover/discover.module';
import { EventDetailsComponent } from './event-details/event-details.component';
import { NgxMatMomentModule } from '@angular-material-components/moment-adapter';

import { QRCodeModule } from 'angularx-qrcode';

// If using Moment
const CUSTOM_DATE_FORMATS: NgxMatDateFormats = {
	parse: {
		dateInput: 'DD.MM.YYYY HH:mm',
	},
	display: {
		dateInput: 'DD.MM.YYYY HH:mm',
		monthYearLabel: 'MMM YYYY',
		dateA11yLabel: 'LL',
		monthYearA11yLabel: 'MMMM YYYY',
	},
};

@NgModule({
	declarations: [SettingsComponent, EventsComponent, EventCreateComponent, MapPickerComponent, EventDetailsComponent],
	imports: [
		CommonModule,
		SettingsRoutingModule,
		MatCardModule,
		MatIconModule,
		MatRippleModule,
		MatFormFieldModule,
		MatInputModule,
		MatDatepickerModule,
		MatCheckboxModule,
		MatButtonModule,
		MatChipsModule,
		MatAutocompleteModule,
		MatSelectModule,
		FormsModule,
		ReactiveFormsModule,
		MatProgressSpinnerModule,
		NgxMatDatetimePickerModule,
		NgxMatTimepickerModule,
		NgxMatMomentModule,
		QRCodeModule,
	],
	providers: [{ provide: NGX_MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS }],
})
export class SettingsModule {}
