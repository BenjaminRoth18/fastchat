import * as MessagesActions from './messages.actions';

export interface MessageState {
  message: string;
}

const initialState: MessageState = {
  message: ''
}

export function messagesReducer(state = initialState, action: MessagesActions.MessagesActions) {
  switch(action.type) {
    case MessagesActions.SET_MESSAGE:
      return { ...state, message: action.payload }
    default:
      return state;
  }
}
