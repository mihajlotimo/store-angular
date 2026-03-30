import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { RegisterRequest } from '../services/auth-api';

export const authActions = createActionGroup({
  source: 'Auth',
  events: {
    login: props<{ username: string; password: string }>(),
    loginSucces: props<{ token: string; userId: number | null }>(),
    loginFailure: props<{ error: string }>(),

    register: props<RegisterRequest>(),
    registerSucces: emptyProps(),
    registerFailure: props<{ error: string }>(),
  },
});
