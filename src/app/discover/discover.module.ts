import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiscoverRoutingModule } from './discover-routing.module';
import { DiscoverComponent } from './discover.component';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { EventComponent } from './event/event.component';

@NgModule({
	declarations: [DiscoverComponent, EventComponent],
	imports: [CommonModule, DiscoverRoutingModule, MatIconModule, MatButtonModule, MatMenuModule, MatProgressSpinnerModule, MatTableModule, MatDividerModule],
})
export class DiscoverModule {}
