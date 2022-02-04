import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

  constructor(private router: Router) { }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(req).pipe(catchError(error => {

        if (error instanceof HttpErrorResponse) {

            if (error.status === 401) {
                this.router.navigate(['/conta/login'], { queryParams: { returnUrl: this.router.url }});
            }
            if (error.status === 403) {
                this.router.navigate(['/acesso-negado']);
            }
        }

        return throwError(error);
    }));
}
}
