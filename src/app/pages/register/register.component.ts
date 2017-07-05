import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  users;
  registerForm;
  constructor(
    private userService: UserService,
    private toast: ToastsManager,
    private vcr: ViewContainerRef,
    private authenticationService: AuthenticationService,
    private router: Router
  ){}

  ngOnInit() {
    console.log('Loaded RegisterComponent');
    this.toast.setRootViewContainerRef(this.vcr);
  }

  registerUser(obj) {
    this.userService.createUser(obj.formData).subscribe((res: Response) => {
      this.authenticationService.login(obj.formData).subscribe((res) => {
        if (res) {
          this.router.navigate(['/app/switch']);
        }
      }, (err) => {
        this.toast.error(err.message);
      });
      obj.form.reset();
    }, (err) => {
      this.toast.error(err.message);
    });
  }

}
