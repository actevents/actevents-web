import { Component, OnInit, ViewChild } from '@angular/core';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';

@Component({
	selector: 'av-saved',
	templateUrl: './saved.component.html',
	styleUrls: ['./saved.component.scss'],
})
export class SavedComponent implements OnInit {
	isScannerOpened = true;

	@ViewChild('scanner', { static: false })
	scanner: ZXingScannerComponent;

	constructor() {}

	ngOnInit(): void {
	}

	onScanComplete(event): void {
		console.log(event);
	}
}
