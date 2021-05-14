import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { from, Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
	constructor(private auth: AuthService) {}

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		return from(this.auth.getToken()).pipe(
			switchMap((token) => {
				const headers = request.headers.set('Authorization', 'Bearer ' + token.getJwtToken());
				const requestClone = request.clone({
					headers,
				});
				return next.handle(requestClone);
			})
		);
	}
}
