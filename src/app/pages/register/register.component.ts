import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { UserService } from '../../services/user/user.service';

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
    private vcr: ViewContainerRef
  ){}

  ngOnInit() {
    console.log('Loaded RegisterComponent');
    this.toast.setRootViewContainerRef(this.vcr);
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
    }, (err) => {
      this.toast.error(err.message);
    });
  }

  deleteUser(user) {
    this.userService.deleteUser(user).subscribe(data => {
      this.getUsers();
    }, (err) => {
      this.toast.error(err.message);
    });
  }

  registerUser(obj) {
    this.userService.createUser(obj.formData).subscribe((res: Response) => {
      this.getUsers();
      obj.form.reset();
    }, (err) => {
      this.toast.error(err.message);
    });
  }

}
