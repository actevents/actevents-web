import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeedRoutingModule } from './feed-routing.module';
import { FeedComponent } from './feed.component';
import { EventComponent } from './event/event.component';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
	declarations: [FeedComponent, EventComponent],
	imports: [CommonModule, FeedRoutingModule, MatCardModule, MatButtonModule],
})
export class FeedModule {}
