import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import * as moment from 'moment';

import {User} from '../../../user-servise.interface';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  @Input() Dropdown = true;
  @Input() user: User;
  @Output() DropdownChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onSelectedUser: EventEmitter<User> = new EventEmitter<User>();

  constructor() {
  }

  ngOnInit() {
    this.user.birthday = moment(this.user.birthday, 'YYYY-DD-MM').format('YYYY/MM/DD');
    this.user.dateOfLogin = moment(this.user.dateOfLogin, 'YYYY-DD-MM').format('DD MMMM YYYY');
    this.user.dateOfNotification = moment(this.user.dateOfNotification, 'YYYY-DD-MM').format('DD-MMM-YY');
  }

  selectUser() {
    this.onSelectedUser.emit(this.user);
  }
}
