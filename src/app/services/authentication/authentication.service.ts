import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalVariable } from '../global-variables/global-variables.service';
import { tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {
  headers;
  url = GlobalVariable.BASE_API_URL + 'authentication/';
  public token: string;
  public currentUser: object;

  constructor(
    public http: Http,
    private router: Router,
  ) {
    console.log('Hello AuthenticationService Provider');
    this.token = localStorage.getItem('token');
    let head = new Headers({ 'Authorization': 'Bearer ' + this.token });
    this.headers = new RequestOptions({ headers: head });
  }

  ngOnInit() {
    this.headers = new Headers();
    this.headers.append('Content-Type', 'application/json');
  }

  private handleAuthenticationError(error:any, msg) {
    var err = {
      message: msg,
      success: error.ok
    };
    return Observable.throw(err);
  }

  loggedIn() {
    return tokenNotExpired();
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
                localStorage.setItem('currentUserId', res.user._id);
                localStorage.setItem('token', token);
                return true;
            } else {
                // return false to indicate failed login
                return false;
            }
        })
        .catch((error:any) => this.handleAuthenticationError(error, 'The username or password that you provided is incorrect.'));;
  }

  logout(): void {
      // clear token remove user from local storage to log user out
      this.token = null;
      localStorage.removeItem('currentUserId');
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
  }

}
