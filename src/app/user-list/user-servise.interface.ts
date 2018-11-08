import {AllUsersService} from '../services/allUsers.service';

export interface UserService {
  allUserService: AllUsersService;
  allUsers(): User[];
  name(name: string): User[];
}

export interface User {
  name: string;
  age: string;
  password: string;
  birthday: string;
  dateOfLogin: string;
  dateOfNotification: string;
  information: string;
}
