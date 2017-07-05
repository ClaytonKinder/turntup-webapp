import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Injectable()
export class LoggedOutGuard implements CanActivate {

    constructor(
      private router: Router,
      private auth: AuthenticationService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      if(this.auth.loggedIn()) {
        this.router.navigate(['/app/switch']);
        return false;
      } else {
        return true;
      }
    }
}
