import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../user-list/user-servise.interface';
import {Observable} from 'rxjs';

@Injectable()
export class UpdateService {


  constructor(private http: HttpClient) {
  }

  update(user: User): Observable<User> {
    return this.http.put<User>(`http://localhost:8000/users/change/${user.id}`, {
    });
  }
}
