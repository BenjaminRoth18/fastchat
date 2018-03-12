import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import * as MessageActions from '../messages/store/messages.actions';
import { Action } from '../../shared/model/action';
import { User } from '../../shared/model/user';
import * as moment from 'moment';
import * as fromUser from '../../chat/register/store/user.reducer';
import * as firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';
import UploadTaskSnapshot = firebase.storage.UploadTaskSnapshot;
import * as MessagesActions from '../messages/store/messages.actions';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {
  messageContent: string;
  user: User;
  progress: number;

  constructor(private store: Store<fromApp.AppState>, public db: AngularFireDatabase) {
    this.store.select('userData').subscribe((userData: fromUser.UserState) => {
      if (userData) {
        this.user = userData.user;
      }
    });
  }

  sendMessage(message: string) {
    this.messageContent = null;
    this.store.dispatch(new MessageActions.SendMessage(message));
  }

  uploadImage(event: any) {
    const file = event.target.files[0];
    this.store.dispatch(new MessageActions.UploadImage(file));
  }
}
