import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
	templateUrl: './shell.component.html',
	styleUrls: ['./shell.component.scss'],
})
export class ShellComponent implements OnInit {
	constructor(private location: Location, private router: Router, private route: ActivatedRoute) {}

	canGoBack = false;

	ngOnInit(): void {
		this.route.data.subscribe(console.log);
	}

	onGoBack(): void {
		this.location.back();
	}
}
