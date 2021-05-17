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
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';

import { MapPickerComponent } from './event-create/map-picker/map-picker.component';

@NgModule({
	declarations: [SettingsComponent, EventsComponent, EventCreateComponent, MapPickerComponent],
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
		NgxMatDatetimePickerModule,
		NgxMatTimepickerModule,
		NgxMatNativeDateModule
	],
})
export class SettingsModule {}
