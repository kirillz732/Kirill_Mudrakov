import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {ForgotPasswordComponent} from './forgotPassword/forgotPassword.component';
import {InfoComponent} from './info/info.component';
import {FormComponent} from './form/form.component';
import {LoginGuard} from './guards/login.guard';
import {UserListComponent} from './user-list/user-list.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'password', component: ForgotPasswordComponent},
  {path: 'change', component: FormComponent, canActivate: [LoginGuard]},
  {path: 'info', component: InfoComponent, canActivate: [LoginGuard]},
  {path: 'search', component: UserListComponent, canActivate: [LoginGuard]}
];

@NgModule ({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
