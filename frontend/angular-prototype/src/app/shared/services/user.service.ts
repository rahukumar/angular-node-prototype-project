import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
// import {BACK_END_URL} from '../../../environments'
import { catchError } from 'rxjs/internal/operators/catchError';
import { BaseService } from './base.service';
import { map } from 'rxjs/internal/operators/map';
interface User {
  username?: String,
  email?: String,
  password?: String,
  token?: String
}
@Injectable({
  providedIn: 'root'
})


export class UserService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  constructor(private httpClient: HttpClient, private _baseService: BaseService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  createUser(user: User): Observable<User> {
    return this.httpClient.post<User>("signup", user)
      .pipe(
        catchError(this._baseService.handleError('createUser', user))
      );
  }
  login(user) {
    return this.httpClient.post<User>("login", user)
      .pipe(map((user: User) => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }

        return user;
      }
      ),
        catchError(this._baseService.handleError('createUser', user))
      );
  }
  verifyUser(token) {
    return this.httpClient.get<User>(`login/${token}`)
      .pipe(map((user: User) => {
        console.log("success verification of the mail!",user)
        // login successful if there's a jwt token in the response
        // if (user && user.token) {
        //   // store user details and jwt token in local storage to keep user logged in between page refreshes
        //   localStorage.setItem('currentUser', JSON.stringify(user));
        //   this.currentUserSubject.next(user);
        // }


        return user;
      }
      ),
        catchError(this._baseService.handleError('Email verification failed!'))
      );
  }
  



  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
}

}