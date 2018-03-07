import { AfterViewChecked, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Message } from '../../shared/model/message';
import { MatDialog } from '@angular/material';
import { Action } from '../../shared/model/action';
import { User } from '../../shared/model/user';
import { RegisterComponent } from '../register/register.component';
import { Store } from '@ngrx/store';
import * as MessagesActions from './store/messages.actions';
import * as UserActions from '../register/store/user.actions';
import * as moment from 'moment';
import * as fromApp from '../../store/app.reducers';
import * as fromUser from '../../chat/register/store/user.reducer';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit, AfterViewChecked {
  messages: Message[] = [];
  action = Action;
  user: User;
  joinDate: string = moment().format();
  userOnline: number;
  @ViewChild('messageList') msgContainer: ElementRef;

  @HostListener('window:beforeunload')
  beforeUnload() {
    this.db.object('user/' + this.user.id).remove();
  }
  constructor(public db: AngularFireDatabase,
              public dialog: MatDialog,
              private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    setTimeout(() => {
      this.openDialog();
    }, 0);

    this.store.select('userData').subscribe((userData: fromUser.UserState) => {
      this.user = userData.user;
    });

    this.db.database.ref('messages').orderByChild('date')
      .startAt(this.joinDate).on('child_added', data => {
      this.messages.push(data.val());
    });

    this.db.database.ref('user').on('value', data => {
      if (data.val()) {
        this.userOnline = Object.values(data.val()).length;
        this.store.dispatch(new UserActions.SetOnlineUser(this.userOnline));
      }
    });
  }

  ngAfterViewChecked() {
    this.db.database.ref('messages').orderByChild('date')
      .startAt(this.joinDate).on('child_added', () => {
      this.scrollToBottom();
    });
  }

  private scrollToBottom() {
    this.msgContainer.nativeElement.scrollTop = this.msgContainer.nativeElement.scrollHeight;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(RegisterComponent, {
      height: '100%',
      maxHeight: '100vh',
      maxWidth: '100vw',
      width: '100vw',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(() => {
      this.db.database.ref('user/' + this.user.id).set({
        name: this.user.name
      });

      this.store.dispatch(new MessagesActions.JoinChat(
        {
          id: this.user.id,
          avatar: this.user.avatar,
          date: this.joinDate,
          from: this.user.name,
          message: this.user.name + ' joined the party!',
          action: Action.JOINED
        }
      ));
    });
  }
}
