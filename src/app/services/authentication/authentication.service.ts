import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalVariable } from '../global-variables/global-variables.service';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {
  headers;
  url = GlobalVariable.BASE_API_URL + 'authentication/';
  public token: string;

  constructor(
    public http: Http,
    private router: Router,
  ) {
    console.log('Hello UserService Provider');
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.token = currentUser && currentUser.token;
  }

  ngOnInit() {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
  }

  private handleUserError(error:any, msg) {
    var err = {
      message: msg
    };
    return Observable.throw(err);
  }

  getCurrentUser() {
    return new Promise((resolve, reject) => {
      if (localStorage.getItem('currentUser')) {
        console.log(localStorage.getItem('currentUser'));
        resolve(JSON.parse(localStorage.getItem('currentUser')))
      } else {
        reject(false);
      }
    });
  }

  login(user): Observable<boolean> {
    return this.http.post(this.url + 'login', user)
        .map((response: Response) => {
            // login successful if there's a jwt token in the response
            var res = response.json();
            let token = response.json() && response.json().token;
            if (token) {
                // set token property
                this.token = token;
                // store username and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('currentUser', JSON.stringify({ details: res.user, token: token }));

                // return true to indicate successful login
                return true;
            } else {
                // return false to indicate failed login
                return false;
            }
        });
  }

  logout(): void {
      // clear token remove user from local storage to log user out
      this.token = null;
      localStorage.removeItem('currentUser');
      this.router.navigate(['/login']);
  }

}
