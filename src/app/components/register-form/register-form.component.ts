import { Component, OnInit, Inject, Input, Output, EventEmitter } from '@angular/core';
import { NgForm, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  firstName = '';
  lastName = '';
  email = '';
  password = '';
  form: FormGroup;
  @Output() formSubmitted = new EventEmitter<object>();

  constructor(
    @Inject(FormBuilder) fb: FormBuilder
  ) {
    this.form = fb.group({
      firstName: [this.firstName, Validators.compose([Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      lastName: [this.lastName, Validators.compose([Validators.maxLength(50), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
      email: [this.email, Validators.compose([Validators.maxLength(50), Validators.email, Validators.required])],
      password: [this.password, Validators.compose([Validators.maxLength(50), Validators.required])],
    });
  }

  ngOnInit() {

  }

  submitForm(form) {
    console.log(form);
    var obj = {
      formData: {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        password: this.password,
      },
      form: form
    }
    this.formSubmitted.emit(obj);
  }

}
