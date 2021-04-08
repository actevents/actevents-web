import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShellComponent } from './shell.component';

const routes: Routes = [
	{
		path: '',
		component: ShellComponent,
		children: [
			{ path: '', loadChildren: () => import('../feed/feed.module').then((m) => m.FeedModule) },
			{ path: 'find', loadChildren: () => import('../find/find.module').then((m) => m.FindModule) },
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ShellRoutingModule {}
