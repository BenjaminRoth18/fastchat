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
    image: '',
    upload: 0,
    action: Action.JOINED
  }
};

export function messagesReducer(state = initialState, action: MessagesActions.MessagesActions) {
  switch (action.type) {
    case MessagesActions.SET_MESSAGE:
      return { ...state, message: action.payload };
    case MessagesActions.JOIN_CHAT:
      return { ...state, message: action.payload };
      case MessagesActions.SHOW_UPLOAD_IMAGE_PROCESS:
      return { ...state, message: { upload: action.payload }};
    default:
      return state;
  }
}
