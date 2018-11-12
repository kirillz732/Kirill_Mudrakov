import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HttpClient} from '@angular/common/http';

import {AppComponent} from './app.component';
import {FormComponent} from './form/form.component';
import {AppRoutingModule} from './app-routing.module';
import {LoginComponent} from './login/login.component';
import {ForgotPasswordComponent} from './forgotPassword/forgotPassword.component';
import {LoginService} from './services/login.service';
import {InfoComponent} from './info/info.component';
import {LoaderComponent} from './loader/loader.component';
import {UpdateService} from './services/updateUser.service';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {UserListModule} from './user-list/user-list.module';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {StoreModule} from '@ngrx/store';
import {userInfoReducers, userLoginReducers} from './redux/redusers/user.state';
import {EffectsModule} from '@ngrx/effects';
import {UserEffects} from './redux/effects/user.effects';

export function translateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    LoginComponent,
    ForgotPasswordComponent,
    InfoComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (translateLoader),
        deps: [HttpClient]
      }
    }),
    UserListModule,
    StoreDevtoolsModule.instrument(),
    StoreModule.forRoot({}),
    StoreModule.forFeature('UserInfo', userInfoReducers),
    StoreModule.forFeature('UserLogin', userLoginReducers),
    EffectsModule.forRoot([UserEffects])
  ],
  exports: [
    LoaderComponent
  ],
  providers: [LoginService, UpdateService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
