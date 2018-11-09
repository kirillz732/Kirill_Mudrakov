import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {User} from '../../user-servise.interface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  @Input() users: User[];
  @Input() Dropdown = true;
  @Output() DropdownChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onSelectedUser: EventEmitter<User> = new EventEmitter<User>();

  constructor() {
  }

  ngOnInit() {
  }

  selectedUser(user: User) {
    this.DropdownChange.emit(!this.Dropdown);
    this.onSelectedUser.emit(user);
  }
}
