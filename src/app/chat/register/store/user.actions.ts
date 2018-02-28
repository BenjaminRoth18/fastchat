import { Action } from '@ngrx/store';
import { User } from '../../../shared/model/user';

export const SET_USER = 'SET_USER';

export class SetUser implements Action {
  readonly type = SET_USER;
  constructor(public payload?: User) {}
}

export type UserActions = SetUser;
