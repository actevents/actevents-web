import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
	constructor(private auth: AuthService) {}

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		if (request.url.startsWith('https://acteventsimages.s3.amazonaws.com/')) {
			console.log('Removing token header for next request');
			return next.handle(request);
		} else {
			return from(this.auth.getToken()).pipe(
				switchMap((token) => {
					const requestClone = request.clone({
						setHeaders: {
							Authorization: 'Bearer ' + token.getJwtToken()
						}
					});
					return next.handle(requestClone);
				})
			);
		}
	}
}
