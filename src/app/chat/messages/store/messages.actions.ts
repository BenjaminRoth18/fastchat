import { Action } from '@ngrx/store';
import { Message } from '../../../shared/model/message';

export const JOIN_CHAT = 'JOIN_CHAT';
export const SET_MESSAGE = 'SET_MESSAGE';
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const SEND_IMAGE = 'SEND_IMAGE';
export const UPLOAD_IMAGE = 'UPLOAD_IMAGE';
export const SHOW_UPLOAD_IMAGE_PROCESS = 'SHOW_UPLOAD_IMAGE_PROCESS';

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

export class UploadImage implements Action {
  readonly type = 'UPLOAD_IMAGE';
  constructor(public payload?: string) {}
}

export class SendImage implements Action {
  readonly type = SEND_IMAGE;
  constructor(public payload?: string) {}
}

export class ShowUploadImageProcess implements Action {
  readonly type = SHOW_UPLOAD_IMAGE_PROCESS;
  constructor(public payload?: number) {}
}


export type MessagesActions = SetMessage | SendMessage | UploadImage | SendImage | JoinChat | ShowUploadImageProcess;
