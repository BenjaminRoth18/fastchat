import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Message } from './model/message';
import { Action } from './model/action';
import { User } from './model/user';
import * as moment from 'moment';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducers';
import * as fromUser from '../chat/register/store/user.reducer';
import * as fromMessage from '../chat/messages/store/messages.reducer';

@Injectable()
export class MessageService {
  message = new Subject<Message>();
  userData: User;

  constructor(private store: Store<fromApp.AppState>) {
    this.store.select('userData').subscribe((userState: fromUser.UserState) => {
      this.userData = userState.user;
    });

    this.store.select('messageData').subscribe((messageState: fromMessage.MessageState) => {
      this.message.next({
        id: this.userData.id,
        avatar: this.userData.avatar,
        date: moment().format(),
        from: this.userData.name,
        message: messageState.message,
        action: Action.CURRENT
      });
    });
  }
}
