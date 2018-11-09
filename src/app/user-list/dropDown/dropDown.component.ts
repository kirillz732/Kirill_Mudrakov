import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {User} from '../user-servise.interface';
import {AllUsersService} from '../../services/allUsers.service';

@Component({
  selector: 'app-drop-down',
  templateUrl: './dropDowncomponent.html',
  styleUrls: ['./dropDown.component.scss']
})
export class DropDownComponent implements OnInit {
  @Input() Dropdown = true;
  @Input() users: User[];
  @Input() selectedUser: User;
  @Output() DropdownChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() selectedUserChange: EventEmitter<User> = new EventEmitter<User>();

  constructor(
    private allUsersService: AllUsersService
  ) {
  }

  ngOnInit() {
  }

  searchInfo(info) {
    this.allUsersService.name(info).subscribe((users: User[]) => {
      this.users = users;
    });
  }

  onSelectUser(user: User) {
    this.DropdownChange.emit(this.Dropdown);
    this.selectedUserChange.emit(user);
  }
}
