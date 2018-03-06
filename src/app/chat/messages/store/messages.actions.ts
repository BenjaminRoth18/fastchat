import { Action } from '@ngrx/store';
import { Message } from '../../../shared/model/message';

export const JOIN_CHAT = 'JOIN_CHAT';
export const SET_MESSAGE = 'SET_MESSAGE';
export const SEND_MESSAGE = 'SEND_MESSAGE';

export class JoinChat implements Action {
  readonly type = JOIN_CHAT;
  constructor(public payload?: Message) {}
}

export class SetMessage implements Action {
  readonly type = SET_MESSAGE;
  constructor(public payload?: Message) {}
}

export class SendMessage implements Action {
  readonly type = SEND_MESSAGE;
  constructor(public payload?: string) {}
}

export type MessagesActions = SetMessage | SendMessage | JoinChat;
