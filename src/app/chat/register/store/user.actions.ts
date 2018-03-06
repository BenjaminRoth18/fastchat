import { Action } from '@ngrx/store';
import { User } from '../../../shared/model/user';

export const SET_USER = 'SET_USER';
export const SET_ONLINE_USER = 'SET_ONLINE_USER';

export class SetUser implements Action {
  readonly type = SET_USER;
  constructor(public payload?: User) {}
}

export class SetOnlineUser implements Action {
  readonly type = SET_ONLINE_USER;
  constructor(public payload?: number) {}
}

export type UserActions = SetUser | SetOnlineUser;
