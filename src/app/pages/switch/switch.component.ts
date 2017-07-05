import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-switch',
  templateUrl: './switch.component.html',
  styleUrls: ['./switch.component.scss']
})
export class SwitchComponent implements OnInit {
  currentUser;
  token;
  constructor(
    private auth: AuthenticationService,
    private userService: UserService,
    private toast: ToastsManager,
    private vcr: ViewContainerRef,
    private route: ActivatedRoute
  ) {

  }

  changeTurntStatus(user) {
    this.userService.updateUserTurntStatus(user).subscribe(data => {
    }, (err) => {
      this.toast.error(err.message);
    });
  }

  ngOnInit() {
    this.toast.setRootViewContainerRef(this.vcr);
    this.currentUser = this.route.snapshot.data['currentUser'];
  }

}
