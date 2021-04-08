import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShellRoutingModule } from './shell-routing.module';
import { ShellComponent } from './shell.component';
import { RouterModule } from '@angular/router';

@NgModule({
	declarations: [ShellComponent],
	imports: [CommonModule, ShellRoutingModule, RouterModule],
})
export class ShellModule {}
