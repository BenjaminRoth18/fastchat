import * as fromUser from '../chat/register/store/user.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  user: fromUser.UserState;
}

export const reducers: ActionReducerMap<AppState> = {
  user: fromUser.userReducer
};
