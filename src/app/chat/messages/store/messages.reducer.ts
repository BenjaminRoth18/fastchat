import * as MessagesActions from './messages.actions';
import { Message } from '../../../shared/model/message';
import { Action } from '../../../shared/model/action';

export interface MessageState {
  message: Message;
}

const initialState: MessageState = {
  message:  {
    id: 0,
    avatar: '',
    date: '',
    from: '',
    message: '',
    action: Action.JOINED
  }
};

export function messagesReducer(state = initialState, action: MessagesActions.MessagesActions) {
  switch (action.type) {
    case MessagesActions.SET_MESSAGE:
      return { ...state, message: action.payload };
    case MessagesActions.JOIN_CHAT:
      return { ...state, message: action.payload };
    default:
      return state;
  }
}
