import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpSentEvent,
  HttpHeaderResponse,
  HttpProgressEvent,
  HttpResponse,
  HttpUserEvent,
} from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { AuthService } from '@core/services';


@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

  constructor(private _authService: AuthService) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<
    HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>
  > {

    const headersToAppend: any = {};

    const token = this._authService.getToken();
    // headersToAppend['Access-Control-Allow-Origin'] = "*"
    // headersToAppend['Access-Control-Allow-Headers'] = "*"

    if (token) {
      if (!req.headers.get('Authorization')) {
        headersToAppend['Authorization'] = `Bearer ${token}`
      }
    }
    if (!Object.prototype.toString.call(req.body).indexOf('FormData')) {
      headersToAppend['Content-Type'] = 'application/json'
    }

    const newRequest = req.clone({ setHeaders: headersToAppend });
    // eslint-disable-next-line consistent-return
    return next.handle(newRequest).pipe(tap(() => { }));
  }
}
