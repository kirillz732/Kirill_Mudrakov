import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';


interface InterfaceFormValues {
  name: string;
  age: string;
  password: string;
  birthday: string;
  dateOfLogin: string;
  dateOfNotification: string;
  information: string;
}

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent implements OnInit {

  constructor() {
  }

  public formValues: InterfaceFormValues = {
    name: '',
    age: '',
    password: '',
    birthday: '',
    dateOfLogin: '',
    dateOfNotification: '',
    information: ''
  };

  ngOnInit() {

    const user = JSON.parse(localStorage.getItem('user'));

    this.formValues.name = user.name;
    this.formValues.age = user.age;
    this.formValues.password = user.password;
    this.formValues.birthday = moment(user.birthday, 'YYYY-DD-MM').format('YYYY/MM/DD');
    this.formValues.dateOfLogin = moment(user.dateOfLogin, 'YYYY-DD-MM').format('DD MMMM YYYY');
    this.formValues.dateOfNotification = moment(user.dateOfNotification, 'YYYY-DD-MM').format('DD-MMM-YY');
    this.formValues.information = user.information;
  }

}
