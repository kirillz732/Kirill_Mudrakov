import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import ageValidator from '../Validators/ageValidator';
import dateValidator from '../Validators/dateValidator';
import * as moment from 'moment';
import nameValidator from '../Validators/nameValidator';
import {UpdateService} from '../services/updateUser.service';
import {User} from '../models/user.model';
import {Router} from '@angular/router';

interface InterfaceFormValues {
  id: string;
  name: string;
  age: string;
  password: string;
  birthday: string;
  dateOfLogin: string;
  dateOfNotification: string;
  information: string;
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  public formValues: InterfaceFormValues = {
    id: '',
    name: '',
    age: '',
    password: '',
    birthday: '',
    dateOfLogin: '',
    dateOfNotification: '',
    information: ''
  };

  constructor(
    private router: Router,
    private updateService: UpdateService) {
  }

  userForm: FormGroup;
  formValid: boolean = true;

  ngOnInit() {
    const user = JSON.parse(localStorage.getItem('user'));
    this.userForm = new FormGroup({
      id: new FormControl(user.id),
      name: new FormControl(user.name, Validators.required, nameValidator),
      age: new FormControl(user.age, [Validators.required, ageValidator]),
      password: new FormControl(user.password),
      birthday: new FormControl(moment(user.birthday, 'YYYY-DD-MM').format('YYYY/MM/DD'),
        [Validators.required, dateValidator]),
      dateOfLogin: new FormControl(moment(user.dateOfLogin, 'YYYY-DD-MM').format('DD MMMM YYYY'),
        [Validators.required, dateValidator]),
      dateOfNotification: new FormControl(moment(user.dateOfNotification, 'YYYY-DD-MM').format('DD-MMM-YY'),
        [Validators.required, dateValidator]),
      information: new FormControl(user.information, Validators.required)
    });
  }

  submitHandler() {
    this.formValid = false;

    if (!this.formValid) {
      this.formValues.id = this.userForm.value.id;
      this.formValues.name = this.userForm.value.name;
      this.formValues.age = this.userForm.value.age;
      this.formValues.password = this.userForm.value.password;
      this.formValues.birthday = moment(this.userForm.value.birthday, 'YYYY/MM/DD').format('YYYY-DD-MM');
      this.formValues.dateOfLogin = moment(this.userForm.value.dateOfLogin, 'DD MMMM YYYY').format('YYYY-DD-MM');
      this.formValues.dateOfNotification = moment(this.userForm.value.dateOfNotification, 'DD-MMM-YY').format('YYYY-DD-MM');
      this.formValues.information = this.userForm.value.information;

      this.updateService.update(this.formValues.id, this.formValues.name, this.formValues.age,
        this.formValues.password, this.formValues.birthday, this.formValues.dateOfLogin,
        this.formValues.dateOfNotification, this.formValues.information)
        .subscribe((user: User) => {
          if (user) {
            this.router.navigate(['/info']);
            localStorage.setItem('user', JSON.stringify(user));
          } else {
            alert('Error');
          }
        });

    }
  }
}
