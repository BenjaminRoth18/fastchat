import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild, ViewChildren, QueryList } from '@angular/core';
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
import * as fromMessages from './store/messages.reducer';
import { MatDialogRef, MatList, MatListItem } from '@angular/material';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit, AfterViewInit {
  messages: Message[] = [];
  action = Action;
  user: User;
  joinDate: string = moment().format();
  userOnline: number;
  uploadProgress = 0;
  @ViewChild(MatList, { read: ElementRef }) matList: ElementRef;
  @ViewChildren(MatListItem, { read: ElementRef }) matListItems: QueryList<MatListItem>;

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

    this.store.select('messageData').subscribe((messageData: fromMessages.MessageState) => {
      this.uploadProgress = messageData.message.upload;
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

  ngAfterViewInit(): void {
    this.matListItems.changes.subscribe(() => {
      this.scrollToBottom();
    });
  }

  private scrollToBottom() {
    this.matList.nativeElement.scrollTop = this.matList.nativeElement.scrollHeight;
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
