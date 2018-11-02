import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class LoginService {


  constructor(private http: HttpClient) {
  }

  login(name: string, password: string) {
    return this.http.post('http://localhost:8000/users/login', {
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
