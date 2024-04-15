import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Messages } from '../models/messages';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {
  constructor(private snackBar: MatSnackBar) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((res) => {
        if (res.status === 400) {
          this.snackBar.open(Messages.BAD_REQUEST, 'Error');
        }

        if (res.status === 401) {
          //Unauthorized
        }

        if (res.status === 403) {
          this.snackBar.open(Messages.THIS_OPERATION_IS_FORBIDDEN, 'Error');
        }

        if (res.status === 500) {
          this.snackBar.open(Messages.SERVER_ERROR, 'Server error');
        }

        if (res.status === 503) {
          this.snackBar.open(Messages.SERVICE_UNAVAILABLE, 'Server error');
        }

        return throwError(() => res);
      })
    );
  }
}
