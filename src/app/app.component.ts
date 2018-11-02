import {Component} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Kirill_Mudrakov';

  users = JSON.parse(localStorage.getItem('user'));

  login = 0;

  logIn() {
    if (localStorage.getItem('user')) {
      return this.login = 1;
    } else {
      return this.login = 2;
    }
  }

  logOut() {
    localStorage.removeItem('user');
  }


  constructor(private translate: TranslateService) {
    translate.setDefaultLang('en');
  }

  switchLanguage(event) {
    this.translate.use(event.target.value);
  }
}

