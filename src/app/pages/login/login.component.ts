import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { UserService } from '../../services/user/user.service';

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
    public toast: ToastsManager,
    private vcr: ViewContainerRef
  ){}

  ngOnInit() {
    console.log('Loaded RegisterComponent');
    this.toast.setRootViewContainerRef(this.vcr);
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

}
