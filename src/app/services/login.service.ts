import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserLogin} from '../user-list/user-servise.interface';
import {Observable} from 'rxjs';

@Injectable()
export class LoginService {


  constructor(private http: HttpClient) {
  }

  login(userLogin: UserLogin): Observable<{}> {
    const {name, password} = userLogin;
    return this.http.post<{}>('http://localhost:8000/users/login', {
      name,
      password
    });
  }

  password(name: string) {
    return this.http.post('http://localhost:8000/users/password', {
      name
    });
  }
}
