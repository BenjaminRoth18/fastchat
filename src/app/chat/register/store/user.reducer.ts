import * as UserActions from './user.actions';
import { User } from '../../../shared/model/user';

export interface UserState {
  user: User;
};

const initialState: UserState = {
  user: new User(null, '', '')
};

export function userReducer(state = initialState, action: UserActions.UserActions) {
  switch(action.type) {
    case UserActions.SET_USER:
      return { ...state, user: action.payload }
    default:
      return state;
  }
}
