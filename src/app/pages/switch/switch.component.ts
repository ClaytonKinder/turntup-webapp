import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss']
})
export class SwitchComponent implements OnInit {
  user;
  token;
  constructor(
    private auth: AuthenticationService,
    private userService: UserService,
    private toast: ToastsManager,
    private vcr: ViewContainerRef,
  ) {

  }

  changeTurntStatus(user) {
    this.userService.updateUserTurntStatus(user).subscribe(data => {
    }, (err) => {
      this.toast.error(err.message);
    });
  }

  getUsers() {
    this.userService.getUsers();
  }

  ngOnInit() {
    this.toast.setRootViewContainerRef(this.vcr);
  }

}
