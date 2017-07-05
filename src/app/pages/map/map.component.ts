import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  constructor(
    private auth: AuthenticationService,
    private userService: UserService,
    private toast: ToastsManager,
    private vcr: ViewContainerRef,
  ) { }

  ngOnInit() {
    this.toast.setRootViewContainerRef(this.vcr);
  }

}
