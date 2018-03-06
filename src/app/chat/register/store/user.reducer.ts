import * as UserActions from './user.actions';
import { User } from '../../../shared/model/user';

export interface UserState {
  user: User;
  userOnline: number;
}

const initialState: UserState = {
  user: new User(null, '', ''),
  userOnline: 0
};

export function userReducer(state = initialState, action: UserActions.UserActions) {
  switch (action.type) {
    case UserActions.SET_USER:
      return { ...state, user: action.payload };
    case UserActions.SET_ONLINE_USER:
      return { ...state, userOnline: action.payload };
    default:
      return state;
  }
}
