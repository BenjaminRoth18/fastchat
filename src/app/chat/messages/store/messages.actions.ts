import { Action } from '@ngrx/store';

export const SET_MESSAGE = 'GET_MESSAGE';

export class SetMessage implements Action {
  readonly type = SET_MESSAGE;
  constructor(public payload?: string) {}
}

export type MessagesActions = SetMessage;
