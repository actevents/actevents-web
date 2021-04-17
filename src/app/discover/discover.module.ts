import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiscoverRoutingModule } from './discover-routing.module';
import { DiscoverComponent } from './discover.component';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
	declarations: [DiscoverComponent],
	imports: [CommonModule, DiscoverRoutingModule, MatIconModule, MatButtonModule, MatMenuModule],
})
export class DiscoverModule {}
