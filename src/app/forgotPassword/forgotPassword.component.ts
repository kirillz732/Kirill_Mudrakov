import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import nameValidator from '../Validators/nameValidator';
import {User} from '../models/user.model';
import {LoginService} from '../services/login.service';

@Component({
  selector: 'app-password',
  templateUrl: './forgotPassword.component.html',
  styleUrls: ['./forgotPassword.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  passwordForm: FormGroup;

  constructor(
    private passwordService: LoginService) {
  }

  ngOnInit() {
    this.passwordForm = new FormGroup({
      name: new FormControl('', Validators.required, nameValidator)
    });
  }



  onSubmit() {
    const FORM_DATE = this.passwordForm.value;
    this.passwordService.password(FORM_DATE.name)
      .subscribe((user: User) => {
        if (user) {
          alert(user.password);
        } else {
          alert('Name not found');
        }
      });
  }
}
