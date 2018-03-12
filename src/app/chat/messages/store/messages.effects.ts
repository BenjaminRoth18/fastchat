import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import * as MessagesActions from './messages.actions';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/withLatestFrom';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { Store } from '@ngrx/store';
import * as fromApp from '../../../store/app.reducers';
import { UserState } from '../../register/store/user.reducer';
import { AngularFireDatabase } from 'angularfire2/database';
import { Action } from '../../../shared/model/action';
import * as moment from 'moment';
import UploadTaskSnapshot = firebase.storage.UploadTaskSnapshot;
import * as firebase from 'firebase';

@Injectable()
export class MessagesEffects {
  constructor(private actions$: Actions,
    private store: Store<fromApp.AppState>,
    public db: AngularFireDatabase) {}

  @Effect({ dispatch: false })
  sendMessage = this.actions$
    .ofType(MessagesActions.SEND_MESSAGE)
    .map((action: MessagesActions.SendMessage) => action.payload)
    .withLatestFrom(this.store.select('userData'))
    .switchMap(([text, state]) => {
      this.store.dispatch(new MessagesActions.SetMessage({
        id: state.user.id,
            avatar: state.user.avatar,
            date: moment().format(),
            from: state.user.name,
            message: text,
            image: '',
            action: Action.CURRENT
      }));
      return fromPromise(
        this.db.database.ref('messages').push(
          {
            id: state.user.id,
            avatar: state.user.avatar,
            date: moment().format(),
            from: state.user.name,
            message: text,
            image: '',
            action: Action.CURRENT
          }
        )
      );
    });

  @Effect({ dispatch: false })
  uploadImage = this.actions$
    .ofType(MessagesActions.UPLOAD_IMAGE)
    .map((action: MessagesActions.UploadImage) => {
      const file = action.payload;
      const uploadTask = firebase
        .storage()
        .ref('/photos' + Math.floor(Math.random() * 100))
        .put(file);
      uploadTask.on(
        'state_changed',
        (snapshot: UploadTaskSnapshot) => {
          const progress = snapshot.bytesTransferred / snapshot.totalBytes * 100;
          this.store.dispatch(new MessagesActions.ShowUploadImageProcess(progress));
        },
        error => {
          console.log('Error: ' + error);
        },
        () => {
          this.store.dispatch(new MessagesActions.SendImage(uploadTask.snapshot.downloadURL));
          this.store.dispatch(new MessagesActions.ShowUploadImageProcess(0));
        }
      );
    });

  @Effect({ dispatch: false })
  sendImage = this.actions$
    .ofType(MessagesActions.SEND_IMAGE)
    .map((action: MessagesActions.SendImage) => action.payload)
    .withLatestFrom(this.store.select('userData'))
    .switchMap(([image, state]) => {
      this.store.dispatch(new MessagesActions.SetMessage({
        id: state.user.id,
            avatar: state.user.avatar,
            date: moment().format(),
            from: state.user.name,
            message: '',
            image: image,
            action: Action.CURRENT
      }));
      return fromPromise(
        this.db.database.ref('messages').push(
          {
            id: state.user.id,
            avatar: state.user.avatar,
            date: moment().format(),
            from: state.user.name,
            message: '',
            image: image,
            action: Action.CURRENT
          }
        )
      );
    });

  @Effect({ dispatch: false })
  joinChat = this.actions$
    .ofType(MessagesActions.JOIN_CHAT)
    .map((action: MessagesActions.SendMessage) => {
      this.db.database.ref('messages').push(
        {
          date: action.payload['date'],
          message: action.payload['message'],
          action: action.payload['action']
        }
      );
    });
}
