import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import {BACK_END_URL} from '../../../environments'
import { catchError } from 'rxjs/internal/operators/catchError';
import { BaseService } from './base.service';
import { environment } from 'src/environments/environment';
interface User{
  username:String,
  email:String,
  password:String
}
@Injectable({
  providedIn: 'root'
})


export class UserService{
  
  constructor(private httpClient:HttpClient,private _baseService:BaseService) {

   }

  createUser(user: User): Observable<User> {
      return this.httpClient.post<User>("user/update-profile", user)
        .pipe(
          catchError(this._baseService.handleError('createUser', user))
        );
    }
  




}