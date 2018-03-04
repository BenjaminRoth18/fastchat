import * as fromUser from '../chat/register/store/user.reducer';
import * as fromMessages from '../chat/messages/store/messages.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  userData: fromUser.UserState;
  messageData: fromMessages.MessageState;
}

export const reducers: ActionReducerMap<AppState> = {
  userData: fromUser.userReducer,
  messageData: fromMessages.messagesReducer
};
