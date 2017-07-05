import { Component, OnInit, Inject, Input, Output, EventEmitter } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  email = '';
  password = '';
  form: FormGroup;
  @Output() formSubmitted = new EventEmitter<object>();

  constructor(
    @Inject(FormBuilder) fb: FormBuilder
  ) {
    this.form = fb.group({
      email: [this.email, Validators.compose([Validators.maxLength(50), Validators.email, Validators.required])],
      password: [this.password, Validators.compose([Validators.maxLength(50), Validators.required])],
    });
  }

  ngOnInit() {

  }

  submitForm(form) {
    var obj = {
      formData: {
        email: this.email,
        password: this.password,
      },
      form: form
    }
    this.formSubmitted.emit(obj);
  }
}
