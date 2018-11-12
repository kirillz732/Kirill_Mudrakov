import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import nameValidator from '../Validators/nameValidator';
import {Router} from '@angular/router';
import {UserLogin} from '../user-list/user-servise.interface';
import {LoginUser} from '../redux/action/user.action';
import { UserLoginState} from '../redux/redusers/user.state';
import {Store} from '@ngrx/store';

export enum STATUS {
  UNAUTHORIZED = 401,
}

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
    private store: Store<UserLoginState>) {
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      name: new FormControl('', Validators.required, nameValidator),
      password: new FormControl('', Validators.required)
    });
  }


  onSubmit() {
    const form = this.loginForm.value;
     this.isLoading = true;

    const userLogin: UserLogin = {
      name: form.name,
      password: form.password
    };
    this.store.dispatch(new LoginUser(userLogin));

    this.store.subscribe( user => {
      if (user != null) {
        this.isLoading = false;
        localStorage.setItem('user', JSON.stringify(user));
        this.router.navigateByUrl('/info');
      }
    });
  }

  passwordPage() {
    this.router.navigate(['/password']);
  }
}

