import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";

@Injectable()
export class ErrorInterceptorService implements HttpInterceptor{
  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(req).pipe(catchError((err:  HttpErrorResponse) => {
      console.error(`Error during operation:`, err);
      return throwError( err );
    }))
  }

  constructor() { }
}
