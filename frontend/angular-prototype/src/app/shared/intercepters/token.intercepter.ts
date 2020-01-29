import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable()

export class TokenInterceptor implements HttpInterceptor {
  constructor() { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


    let apiReq = request.clone({ url: `${request.url}` });
   
      if (localStorage.getItem('isLoggedIn')) {
        request = request.clone({
          setHeaders: {
            'Authorization': localStorage.getItem('token')
          }
        });
      
    }
    
    //console.log(request)
    return next.handle(request);

  }
}