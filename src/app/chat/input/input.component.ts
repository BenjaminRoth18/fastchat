import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import * as MessageActions from '../messages/store/messages.actions';
import { Action } from '../../shared/model/action';
import { User } from '../../shared/model/user';
import * as moment from 'moment';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  messageContent: string;
  user: User;

  constructor(private store: Store<fromApp.AppState>) {
    this.store.select('userData').subscribe(data => {
      this.user = data.user;
    });
  }

  ngOnInit() {}

  sendMessage(message: string) {
    this.messageContent = null;
    this.store.dispatch(new MessageActions.SendMessage(message));
  }
}
