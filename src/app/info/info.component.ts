import {Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';

import * as moment from 'moment';
import { UserLoginState} from '../redux/redusers/user.state';
import {User} from '../user-list/user-servise.interface';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  constructor(private store: Store<UserLoginState>) {
  }

  selectedUser;
  public formValues: User = {
    name: '',
    age: '',
    password: '',
    birthday: '',
    dateOfLogin: '',
    dateOfNotification: '',
    information: ''
  };

  ngOnInit() {
    this.store.select('UserLogin').subscribe(({currentUser}) => {
      this.selectedUser = currentUser.data;
      return this.selectedUser;
    });

    this.formValues.name = this.selectedUser.name;
    this.formValues.age = this.selectedUser.age;
    this.formValues.password = this.selectedUser.password;
    this.formValues.birthday = moment(this.selectedUser.birthday, 'YYYY-DD-MM').format('YYYY/MM/DD');
    this.formValues.dateOfLogin = moment(this.selectedUser.dateOfLogin, 'YYYY-DD-MM').format('DD MMMM YYYY');
    this.formValues.dateOfNotification = moment(this.selectedUser.dateOfNotification, 'YYYY-DD-MM').format('DD-MMM-YY');
    this.formValues.information = this.selectedUser.information;
  }
  click() {
    this.store.select('UserLogin').subscribe(({currentUser}) => {
      this.selectedUser = currentUser.data;
      return this.selectedUser;
    });
    const info = this.store.select('UserLogin');
    console.log(info);

    this.formValues.name = this.selectedUser.name;
    this.formValues.age = this.selectedUser.age;
    this.formValues.password = this.selectedUser.password;
    this.formValues.birthday = moment(this.selectedUser.birthday, 'YYYY-DD-MM').format('YYYY/MM/DD');
    this.formValues.dateOfLogin = moment(this.selectedUser.dateOfLogin, 'YYYY-DD-MM').format('DD MMMM YYYY');
    this.formValues.dateOfNotification = moment(this.selectedUser.dateOfNotification, 'YYYY-DD-MM').format('DD-MMM-YY');
    this.formValues.information = this.selectedUser.information;
  }
}
