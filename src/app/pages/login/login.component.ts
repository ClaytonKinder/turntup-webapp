import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  users;
  loginForm;
  constructor(
    private userService: UserService,
    private authenticationService: AuthenticationService,
    public toast: ToastsManager,
    private vcr: ViewContainerRef,
    private router: Router
  ){}

  ngOnInit() {
    console.log('Loaded RegisterComponent');
    this.toast.setRootViewContainerRef(this.vcr);
    console.log(localStorage);
  }

  getUser(obj) {
    this.userService.getUser(obj.formData).subscribe((res) => {
      this.toast.success('Successfully logged in as ' + res.email);
      obj.form.reset();
    }, (err) => {
      console.log(err);
      this.toast.error(err.message);
    });
  }

  login(obj) {
    this.authenticationService.login(obj.formData).subscribe((res) => {
      console.log(res);
      if (res) {
        this.router.navigate(['/app/switch']);
      }
    }, (err) => {
      this.toast.error(err.message);
    });
  }

}
