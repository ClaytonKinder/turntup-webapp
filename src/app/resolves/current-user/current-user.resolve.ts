import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../../services/user/user.service';

@Injectable()
export class CurrentUserResolve implements Resolve<any> {

  constructor(
    private userService: UserService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot) {
    if (localStorage.getItem('currentUserId')) {
      return this.userService.getCurrentUser(localStorage.getItem('currentUserId'));
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
