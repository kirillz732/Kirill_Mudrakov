import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import ageValidator from '../Validators/ageValidator';
import dateValidator from '../Validators/dateValidator';
import * as moment from 'moment';
import nameValidator from '../Validators/nameValidator';
import {UpdateService} from '../services/updateUser.service';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {UserLoginState} from '../redux/redusers/user.state';
import {UpdatingCurrentUser} from '../redux/action/user.action';
import {User} from '../user-list/user-servise.interface';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  selectedUser;

  constructor(
    private router: Router,
    private updateService: UpdateService,
    private store: Store<UserLoginState>) {
  }

  userForm: FormGroup;

  ngOnInit() {
    this.store.select('UserLogin').subscribe(({currentUser}) => {
      this.selectedUser = currentUser.data;
      return this.selectedUser;
    });
    this.userForm = new FormGroup({
      id: new FormControl(this.selectedUser.id),
      name: new FormControl(this.selectedUser.name, Validators.required, nameValidator),
      age: new FormControl(this.selectedUser.age, [Validators.required, ageValidator]),
      password: new FormControl(this.selectedUser.password),
      birthday: new FormControl(moment(this.selectedUser.birthday, 'YYYY-DD-MM').format('YYYY/MM/DD'),
        [Validators.required, dateValidator]),
      dateOfLogin: new FormControl(moment(this.selectedUser.dateOfLogin, 'YYYY-DD-MM').format('DD MMMM YYYY'),
        [Validators.required, dateValidator]),
      dateOfNotification: new FormControl(moment(this.selectedUser.dateOfNotification, 'YYYY-DD-MM').format('DD-MMM-YY'),
        [Validators.required, dateValidator]),
      information: new FormControl(this.selectedUser.information, Validators.required)
    });
  }

  submitHandler() {

    const updateUser: User = {
      id: this.userForm.value.id,
      name: this.userForm.value.name,
      age: this.userForm.value.age,
      password: this.userForm.value.password,
      birthday: moment(this.userForm.value.birthday, 'YYYY/MM/DD').format('YYYY-DD-MM'),
      dateOfLogin: moment(this.userForm.value.dateOfLogin, 'DD MMMM YYYY').format('YYYY-DD-MM'),
      dateOfNotification: moment(this.userForm.value.dateOfNotification, 'DD-MMM-YY').format('YYYY-DD-MM'),
      information: this.userForm.value.information
    };

    this.store.dispatch(new UpdatingCurrentUser(updateUser));

  }
}
