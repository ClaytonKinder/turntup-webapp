import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-postlogin',
  templateUrl: './postlogin.component.html',
  styleUrls: ['./postlogin.component.scss']
})
export class PostloginComponent implements OnInit {
  routeLinks:any[];
  activeLinkIndex = 0;
  constructor(
    private authenticationService: AuthenticationService
  ) {
    this.routeLinks = [
      {label: 'Switch', link: '/app/switch'},
      {label: 'Map', link: '/app/map'}
    ];
  }

  ngOnInit() {
  }

  logout() {
    console.log('Logging out');
    this.authenticationService.logout();
  }

}
