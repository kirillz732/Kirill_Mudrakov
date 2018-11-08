import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {User} from '../../user-servise.interface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  @Input() Dropdown = true;
  @Input() users: User[];
  @Output() onSelectedUser: EventEmitter<User> = new EventEmitter<User>();

  constructor() {
  }

  ngOnInit() {
  }

  selectedUser(user: User) {
    this.onSelectedUser.emit(user);
  }
}
