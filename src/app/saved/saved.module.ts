import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SavedRoutingModule } from './saved-routing.module';
import { SavedComponent } from './saved.component';


@NgModule({
  declarations: [
    SavedComponent
  ],
  imports: [
    CommonModule,
    SavedRoutingModule
  ]
})
export class SavedModule { }
