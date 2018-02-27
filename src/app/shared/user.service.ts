import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class UserService {
  userOnline = new Subject<number>();

  getOnlineUser(users) {
    this.userOnline.next(users);
  }
}
