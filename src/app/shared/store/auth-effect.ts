import { inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { authActions } from './auth-actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { AuthApi } from '../services/auth-api';
import { MyStorage } from '../services/storage';
import { extractToken } from '../util/extractToken';

export const loginEffect = createEffect(
  (
    actions$ = inject(Actions),
    authApi = inject(AuthApi),
    router = inject(Router),
    storage = inject(MyStorage),
  ) => {
    return actions$.pipe(
      ofType(authActions.login),
      switchMap((loginRequest) => {
        return authApi.login(loginRequest).pipe(
          map((response) => {
            router.navigateByUrl('/products');
            storage.setItem('ngrxstore_token', response.token);
            const payload = extractToken(response.token);

            if (payload) {
              return authActions.loginSucces({ token: response.token, userId: payload.sub });
            }
            return authActions.loginSucces({ token: response.token, userId: null });
          }),
          catchError((error) => {
            return of(authActions.loginFailure({ error: error.message }));
          }),
        );
      }),
    );
  },
  {
    functional: true,
  },
);

export const registerEffect = createEffect(
  (actions$ = inject(Actions), authApi = inject(AuthApi), router = inject(Router)) => {
    return actions$.pipe(
      ofType(authActions.register),
      switchMap((registerRequest) => {
        return authApi.register(registerRequest).pipe(
          map(() => {
            router.navigateByUrl('/login');
            return authActions.registerSucces();
          }),
          catchError((error) => {
            return of(authActions.registerFailure({ error: error.message }));
          }),
        );
      }),
    );
  },
  { functional: true },
);
