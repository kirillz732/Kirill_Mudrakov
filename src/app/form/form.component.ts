import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import ageValidator from '../Validators/ageValidator';
import dateValidator from '../Validators/dateValidator';
import * as moment from 'moment';
import nameValidator from '../Validators/nameValidator';

interface InterfaceFormValues {
  username: string;
  age: string;
  birthday: string;
  dateOfLogin: string;
  dateOfNotification: string;
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  public formValues: InterfaceFormValues = {
    username: '',
    age: '',
    birthday: '',
    dateOfLogin: '',
    dateOfNotification: ''
  };

  userForm: FormGroup;
  formValid: boolean = false;

  ngOnInit() {

    this.userForm = new FormGroup({
      name: new FormControl('', Validators.required, nameValidator),
      age: new FormControl('', [Validators.required, ageValidator]),
      birthday: new FormControl('', [Validators.required, dateValidator]),
      dateOfLogin: new FormControl('', [Validators.required, dateValidator]),
      dateOfNotification: new FormControl('', [Validators.required, dateValidator])
    });
  }

  submitHandler() {
    this.formValid = true;

    if (!this.formValid) {
      return;
    }
    this.formValues.username = this.userForm.value.username;
    this.formValues.age = this.userForm.value.age;
    this.formValues.birthday = moment(this.userForm.value.birthday, 'YYYY-DD-MM').format('YYYY/MM/DD');
    this.formValues.dateOfLogin = moment(this.userForm.value.dateOfLogin, 'YYYY-DD-MM').format('DD MMMM YYYY');
    this.formValues.dateOfNotification = moment(this.userForm.value.dateOfNotification, 'YYYY-DD-MM').format('DD-MMM-YY');
  }

  hiddenForm() {
    this.formValid = false;
  }
}
