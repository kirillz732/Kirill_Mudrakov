import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../user-list/user-servise.interface';
import {Observable} from 'rxjs';


@Injectable()
export class AllUsersService {


  constructor(private http: HttpClient) {
  }

  allUsers() {
    return this.http.get('http://localhost:8000/users', {});
  }

  name(name: string){
    return this.http.post('http://localhost:8000/users/name', {
      name
    });
  }

}

