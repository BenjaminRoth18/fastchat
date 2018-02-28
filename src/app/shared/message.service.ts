import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Message } from './model/message';
import { Action } from './model/action';
import { User } from './model/user';
import * as moment from 'moment';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducers';
import * as fromUser from '../chat/register/store/user.reducer';

@Injectable()
export class MessageService {
  message = new Subject<Message>();
  userData: User;

  constructor(private store: Store<fromApp.AppState>) {
    this.store.select('user').subscribe((userState: fromUser.UserState) => {
      this.userData = userState.user;
    });
  }

  setMessage(message) {
    this.message.next({
      id: this.userData.id,
      avatar: this.userData.avatar,
      date: moment().format(),
      from: this.userData.name,
      message: message,
      action: Action.CURRENT
    });
  }
}
