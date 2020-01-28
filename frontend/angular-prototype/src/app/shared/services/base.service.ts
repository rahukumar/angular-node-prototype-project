// import { CookieService } from 'app/site/shared/services/cookie.service';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { CookieService } from './cookie.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(private _cookieService:CookieService) { }

  setHeaders(){
    let headers:any;
    let access_token = JSON.parse(this._cookieService.readCookie("access_token"));
    let client = JSON.parse(this._cookieService.readCookie("client"));
    let uid = JSON.parse(this._cookieService.readCookie("uid"));
    if(access_token && client && uid){
     headers = new HttpHeaders({
        'Content-Type':'application/json',
        'accept'      :'application/json',
        "access_token":access_token,
        "client":client,
        "uid":uid
      });
    } 
    else{
     headers = new HttpHeaders({
        'Content-Type':'application/json',
        'accept'      :'application/json'
      });
    }
    console.log('headers in base service on patch:',headers)
    return headers;
  }

  patchHeaders(){
    return this.setHeaders();
  }
  getHeaders(){
    return new HttpHeaders({
      'Content-Type':'application/json',
      'accept'      :'application/json'
    })
  }
  httpOptions(){
  let httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Accept':'application/json'
    })
}
  return httpOptions
  }

   handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
  
      return of({...result,error:true} as T);
    };
  }
 
}
