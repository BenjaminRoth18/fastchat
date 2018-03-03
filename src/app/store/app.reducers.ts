import * as fromUser from '../chat/register/store/user.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  userData: fromUser.UserState;
}

export const reducers: ActionReducerMap<AppState> = {
  userData: fromUser.userReducer
};
