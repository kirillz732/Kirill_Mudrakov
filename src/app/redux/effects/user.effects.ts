import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import {UpdateService} from '../../services/updateUser.service';
import {LoginService} from '../../services/login.service';
import {AllUsersService} from '../../services/allUsers.service';
import {Router} from '@angular/router';
import { catchError, map, mapTo, mergeMap, switchMap, tap } from 'rxjs/operators';

import {
  LoginUser,
  LoginUserError,
  UsersActions,
  LoginUserSuccess, LOGIN_USER, UPDATE_CURRENT_USER, UpdateCurrentUser, UpdatingCurrentUser, LOADING_CURRENT_USER, LoadingCurrentUser
} from '../action/user.action';
import {User, UserLogin} from '../../user-list/user-servise.interface';
import {STATUS} from '../../login/login.component';
import {HttpErrorResponse} from '@angular/common/http';


@Injectable()
export class UserEffects {
  isLoading: boolean;
  constructor(
    private actions$: Actions,
    private updateService: UpdateService,
    private loginService: LoginService,
    private allUserservice: AllUsersService,
    private router: Router
  ) {
  }


  @Effect()
  updateCurrentUser$: Observable<UsersActions> = this.actions$.pipe(
    ofType(UPDATE_CURRENT_USER),
    mergeMap((action: UpdatingCurrentUser) => this.updateService.update(action.payload as User).pipe(
      map((user: User) => new UpdateCurrentUser(user))
    ))
  );

  @Effect()
  loginUser$: Observable<UsersActions> = this.actions$.pipe( ofType(LOGIN_USER),
    mergeMap((action: LoginUser) => this.loginService.login(action.payload as UserLogin).pipe(
      map((user: User) => new LoginUserSuccess(user)),
      catchError((error: HttpErrorResponse) => of (
        new LoginUserError(error.status === STATUS.UNAUTHORIZED ? STATUS.UNAUTHORIZED : error.message )
      ))
    ))
  );
}
