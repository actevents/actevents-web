import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './settings.component';

import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';
import { ProfileComponent } from './profile/profile.component';
import { EventsComponent } from './events/events.component';

@NgModule({
	declarations: [SettingsComponent, EventsComponent],
	imports: [CommonModule, SettingsRoutingModule, MatCardModule, MatIconModule, MatRippleModule],
})
export class SettingsModule {}
