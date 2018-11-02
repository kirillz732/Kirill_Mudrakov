import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {ForgotPasswordComponent} from './forgotPassword/forgotPassword.component';
import {InfoComponent} from './info/info.component';
import {FormComponent} from './form/form.component';
import {LoginGuard} from './guards/login.guard';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'password', component: ForgotPasswordComponent},
  {path: 'change', component: FormComponent, canActivate: [LoginGuard]},
  {path: 'info', component: InfoComponent, canActivate: [LoginGuard]}
];

@NgModule ({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {}
