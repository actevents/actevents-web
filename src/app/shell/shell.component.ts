import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

import { filter, map, mergeMap } from 'rxjs/operators';

@Component({
	templateUrl: './shell.component.html',
	styleUrls: ['./shell.component.scss'],
})
export class ShellComponent implements OnInit {
	constructor(private location: Location, private router: Router, private route: ActivatedRoute) {}

	canGoBack = false;

	ngOnInit(): void {
		// BEGIN WTF?!
		this.router.events
			.pipe(
				filter((e) => e instanceof NavigationEnd),
				map(() => {
					let route = this.route.firstChild;
					let child = route;

					while (child) {
						if (child.firstChild) {
							child = child.firstChild;
							route = child;
						} else {
							child = null;
						}
					}

					return route;
				}),
				mergeMap((route) => route!.data)
			)
			.subscribe((data) => {
				this.canGoBack = !!data.canGoBack;
			});
		// END WTF?!
	}

	onGoBack(): void {
		this.location.back();
	}
}
