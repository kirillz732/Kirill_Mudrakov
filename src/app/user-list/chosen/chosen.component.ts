import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {User} from '../user-servise.interface';

@Component({
  selector: 'app-chosen',
  templateUrl: './chosen.component.html',
  styleUrls: ['./chosen.component.scss']
})
export class ChosenComponent implements OnInit {
  @Input() currentUser: User;
  @Input() closeDropdown = true;
  @Output() closeDropdownChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {
  }

  ngOnInit() {
  }

  userSelected() {
    return this.currentUser;
  }

  Dropdown() {
    this.closeDropdownChange.emit(!this.closeDropdown);
  }
}
