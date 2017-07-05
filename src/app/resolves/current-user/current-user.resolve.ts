import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../../services/user/user.service';

@Injectable()
export class CurrentUserResolve implements Resolve<any> {

  constructor(private userService: UserService) {}

  resolve(route: ActivatedRouteSnapshot) {
    console.log('Resolving current user!');
    if (localStorage.getItem('currentUserId')) {
      return this.userService.getCurrentUser(localStorage.getItem('currentUserId'));
    } else {
      return false;
    }
  }
}
