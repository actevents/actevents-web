import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SavedRoutingModule } from './saved-routing.module';
import { SavedComponent } from './saved.component';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DiscoverModule } from 'src/app/discover/discover.module';

@NgModule({
	declarations: [SavedComponent],
	imports: [CommonModule, SavedRoutingModule, MatFormFieldModule, MatProgressSpinnerModule, DiscoverModule],
})
export class SavedModule {}
