import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class UpdateService {


  constructor(private http: HttpClient) {
  }

  update(id: string, name: string, age: string, password: string, birthday: string,
         dateOfLogin: string, dateOfNotification: string, information: string) {
    return this.http.put(`http://localhost:8000/users/change/${id}`, {
      id,
      name,
      age,
      password,
      birthday,
      dateOfLogin,
      dateOfNotification,
      information
    });
  }
}
