import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiscoverRoutingModule } from './discover-routing.module';
import { DiscoverComponent } from './discover.component';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { MatRippleModule } from '@angular/material/core';
import { EventComponent } from './event/event.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';

@NgModule({
	declarations: [DiscoverComponent, EventComponent, EventDetailsComponent],
	imports: [
		CommonModule,
		DiscoverRoutingModule,
		FormsModule,
		MatIconModule,
		MatButtonModule,
		MatMenuModule,
		MatProgressSpinnerModule,
		MatTableModule,
		MatDividerModule,
		MatCardModule,
		MatRippleModule,
		MatFormFieldModule,
		MatSliderModule,
	],
})
export class DiscoverModule {}
