import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {User, UserService} from './user-servise.interface';
import {AllUsersService} from '../services/allUsers.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  @Input() Dropdown = true;
  @Output() DropdownChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  public users: User[];
  public currentUser: User;

  constructor(
    private methodsInterface: AllUsersService
  ) {
  }

  ngOnInit() {
  }

  getUsers() {
    this.methodsInterface.allUsers().subscribe((users: User[]) => {
      this.users = users;
    });
  }

  closeDropdown() {
    this.DropdownChange.emit(this.Dropdown);
  }
}
