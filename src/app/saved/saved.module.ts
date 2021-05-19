import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SavedRoutingModule } from './saved-routing.module';
import { SavedComponent } from './saved.component';

import { ZXingScannerModule } from '@zxing/ngx-scanner';

@NgModule({
	declarations: [SavedComponent],
	imports: [CommonModule, SavedRoutingModule, ZXingScannerModule],
})
export class SavedModule {}
