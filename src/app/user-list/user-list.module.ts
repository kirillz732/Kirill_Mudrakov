import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';

import {UserListComponent} from './user-list.component';
import {DropDownComponent} from './dropDown/dropDown.component';
import {ChosenComponent} from './chosen/chosen.component';
import {ButtonComponent} from './button/button.component';
import {AllUsersService} from '../services/allUsers.service';
import {BtnComponent} from './dropDown/btn/btn.component';
import {UsersComponent} from './dropDown/users/users.component';
import {UserComponent} from './dropDown/users/user/user.component';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

export function translateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    UserListComponent,
    DropDownComponent,
    ChosenComponent,
    ButtonComponent,
    BtnComponent,
    UsersComponent,
    UserComponent],
  imports: [
    CommonModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (translateLoader),
        deps: [HttpClient]
      }
    })
  ],
  exports: [
    UserListComponent
  ],
  providers: [AllUsersService]
})
export class UserListModule {
}
