import { EMPTY } from 'rxjs';

import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,

} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';

import { catchError, tap } from 'rxjs/operators';
import { HandleErrorService } from '../services/handle-error-service';


export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private HandleErrorService:HandleErrorService) { }
 
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   
    return next.handle(request)
    .pipe(
        tap(res => {
            if (res instanceof HttpResponse) {
              this.HandleErrorService.handleError(res)
            }
        }),
        catchError((error: HttpErrorResponse) => {

          
          // if(error.url && error.url.includes('.png' || '.jpg')){
          //   return EMPTY
          // }else{
          //   this.HandleErrorService.handleError(error)
          // }
          this.HandleErrorService.handleError(error)
          
            return throwError(error);
        })
    )
}
}