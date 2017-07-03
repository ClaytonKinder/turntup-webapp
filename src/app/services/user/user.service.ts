import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { GlobalVariable } from '../global-variables/global-variables.service';
import 'rxjs/add/operator/map';

@Injectable()
export class UserService {
  headers;
  url = GlobalVariable.BASE_API_URL + 'users/';

  constructor(public http: Http) {
    console.log('Hello UserService Provider');
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

  private handleDuplicateError(error:any) {
    error._body.duplicates = error._body.error.match(/index\:\ [a-z_]+\.[a-z_]+\.\$([a-z_]+)\_[0-9a-z]{1,}\s+dup key[: {]+"(.+)"/).splice(1,3);
    var dupes = error._body.duplicates;
    if (dupes[0] == 'email') {
      error._body.message = 'Your email address must be unique.';
    }

    return error;
  }

  createUser(data) {
    return this.http.post(this.url + 'createuser', data, {headers: this.headers})
    .map(res => res.json())
    .catch((error:any) => this.handleUserError(error, 'Could not create user at this time.'));
  }

  getUsers() {
    return this.http.get(this.url + 'getusers')
      .map(res => res.json())
      .catch((error:any) => this.handleUserError(error, 'Could not get users at this time.'));
  }

  getUser(data) {
    return this.http.post(this.url + 'getuser', data, {headers: this.headers})
    .map(res => res.json())
    .catch((error:any) => this.handleUserError(error, 'Could not get user at this time.'));
  }

  updateUser(data) {
    return this.http.post(this.url + 'updateuser', data, {headers: this.headers})
    .map(res => res.json())
    .catch((error:any) => this.handleUserError(error, 'Could not update user at this time.'));
  }

  updateUserTurntStatus(data) {
    console.log(data);
    return this.http.post(this.url + 'updateuserturntstatus', data, {headers: this.headers})
    .map(res => res.json())
    .catch((error:any) => this.handleUserError(error, 'Could not update user at this time.'));
  }

  deleteUser(user) {
    return this.http.delete(this.url + 'deleteuser', new RequestOptions({
      body: user
    })).map(
      res => res.json()
    ).catch((error:any) => this.handleUserError(error, 'Could not delete user at this time.'));
  }

  private jwt() {
      // create authorization header with jwt token
      let currentUser = JSON.parse(localStorage.getItem('currentUser'));
      if (currentUser && currentUser.token) {
          let headers = new Headers({ 'Authorization': 'Bearer ' + currentUser.token });
          return new RequestOptions({ headers: headers });
      }
  }

}
