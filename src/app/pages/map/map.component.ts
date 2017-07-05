import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  currentUser;
  constructor(
    private auth: AuthenticationService,
    private userService: UserService,
    private toast: ToastsManager,
    private vcr: ViewContainerRef,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.toast.setRootViewContainerRef(this.vcr);
    this.currentUser = this.route.snapshot.data['currentUser'];
  }

}
