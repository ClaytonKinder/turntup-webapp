import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Injectable()
export class LoggedInGuard implements CanActivate {

    constructor(
      private router: Router,
      private auth: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      if(this.auth.loggedIn()) {
        return true;
      } else {
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
      }
    }
}
