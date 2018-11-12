import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Kirill_Mudrakov';

  login = 0;

  logIn() {
    if (this.store.select('UserLogin').subscribe(({currentUser}) => {
      return currentUser;
    })) {
      return this.login = 1;
    } else {
      return this.login = 2;
    }
  }

  logOut() {
    localStorage.removeItem('user');
  }


  constructor(
    private store: Store<{}>,
    private translate: TranslateService) {
    translate.setDefaultLang('en');
  }

  switchLanguage(event) {
    this.translate.use(event.target.value);
  }
}

