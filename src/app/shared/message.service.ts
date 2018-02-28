import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Message } from './model/message';
import { Action } from './model/action';
import { User } from './model/user';
import * as moment from 'moment';

@Injectable()
export class MessageService {
  message = new Subject<Message>();
  user = new Subject<User>();
  userData: User;

  constructor() {}

  getMessage(message) {
    this.message.next({
      id: this.userData.id,
      avatar: this.userData.avatar,
      date: moment().format(),
      from: this.userData.name,
      message: message,
      action: Action.CURRENT
    });
  }

  setUser(user: User) {
    this.userData = user;
    this.user.next(user);
  }
}
