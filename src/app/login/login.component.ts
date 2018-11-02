import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import nameValidator from '../Validators/nameValidator';
import {LoginService} from '../services/login.service';
import {User} from '../models/user.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLoading: boolean;

  loginForm: FormGroup;

  constructor(
    private router: Router,
    private loginService: LoginService) {
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      name: new FormControl('', Validators.required, nameValidator),
      password: new FormControl('', Validators.required)
    });
  }


  onSubmit() {
    const FORM_DATE = this.loginForm.value;
    this.isLoading = true;
    this.loginService.login(FORM_DATE.name, FORM_DATE.password)
      .subscribe((user: User) => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.router.navigate(['/info']);
          this.isLoading = false;
        } else {
          alert('Incorrect name or password');
          this.isLoading = false;
        }
      });
  }

  password() {
    this.router.navigate(['/password']);
  }
}

