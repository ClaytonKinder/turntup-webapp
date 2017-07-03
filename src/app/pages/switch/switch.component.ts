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
  user = {};
  token;
  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private toast: ToastsManager,
    private vcr: ViewContainerRef
  ) { }

  changeTurntStatus(user) {
    console.log(user.details.isTurnt);
    this.userService.updateUserTurntStatus(user).subscribe(data => {
      // this.getUsers();
      console.log(data);
      localStorage.setItem('currentUser', JSON.stringify({ details: data, token: this.token }));
      // localStorage.setItem('currentUser', JSON.stringify({ details: res.user, token: token }));
    }, (err) => {
      this.toast.error(err.message);
    });
  }

  ngOnInit() {
    this.authenticationService.getCurrentUser().then(function(result){
      console.log(result);
      this.user = result;
    });

    console.log(this.user);
    this.toast.setRootViewContainerRef(this.vcr);
  }

}
