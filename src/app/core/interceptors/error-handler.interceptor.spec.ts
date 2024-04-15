import { HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ErrorHandlerInterceptor } from './error-handler.interceptor';

describe('ErrorHandlerInterceptor', () => {
  let interceptor: ErrorHandlerInterceptor;
  let mockSnackBar: jasmine.SpyObj<MatSnackBar>;
  let mockRouter: jasmine.SpyObj<Router>;

  beforeEach(() => {
    mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        ErrorHandlerInterceptor,
        { provide: MatSnackBar, useValue: mockSnackBar },
        { provide: Router, useValue: mockRouter }
      ]
    });

    interceptor = TestBed.inject(ErrorHandlerInterceptor);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });

  it('should handle 400 error', () => {
    const errorResponse = new HttpErrorResponse({ status: 400 });
    const handler = { handle: jasmine.createSpy('handle').and.returnValue(throwError(errorResponse)) };

    interceptor.intercept(new HttpRequest<any>('GET', '/api'), handler as HttpHandler).subscribe(
      () => {},
      () => {}
    );

    expect(mockSnackBar.open).toHaveBeenCalledWith('Bad request', 'Error');
  });

  // Add more test cases to cover other error scenarios

});
