import { Component, HostListener, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Message } from '../../shared/model/message';
import { MatDialog } from '@angular/material';
import { RegisterComponent } from './../register/register.component';
import { MessageService } from '../../shared/message.service';
import * as moment from 'moment';
import { Action } from '../../shared/model/action';
import { User } from '../../shared/model/user';
import {UserService} from '../../shared/user.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  messages: Message[] = [];
  action = Action;
  user: User;
  joinDate: string = moment().format();
  userOnline: number;

  @HostListener('window:beforeunload')
  beforeUnload() {
    this.db.object('user/' + this.user.id).remove();
  }

  constructor(public db: AngularFireDatabase, public dialog: MatDialog, public ms: MessageService, public us: UserService) { }

  ngOnInit() {
    setTimeout(() => {
      this.openDialog();
    }, 0);

    this.ms.user.subscribe(user => {
      this.user = user;
    });

    this.ms.message.subscribe(message => {
      this.db.database.ref('messages').push(message);
    });

    this.db.database.ref('messages').orderByChild('date')
      .startAt(this.joinDate).on('child_added', data => {
      this.messages.push(data.val());
    })

    this.db.database.ref('user').on('value', data => {
      if (data.val()) {
        this.userOnline = Object.values(data.val()).length;
        this.us.userOnline.next(this.userOnline);
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(RegisterComponent, {
      height: '100%',
      maxHeight: '100vh',
      maxWidth: '100vw',
      width: '100vw',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(
      () => {

        this.db.database.ref('user/' + this.user.id).set({
          name: this.user.name
        });

        this.ms.message.next({
          date: this.joinDate,
          message: this.user.name + ' joined the party!',
          action: Action.JOINED
        });
      });
  }
}
