import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import * as MessageActions from '../messages/store/messages.actions';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  messageContent: string;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {}

  sendMessage(message: string) {
    this.messageContent = null;
    this.store.dispatch(new MessageActions.SetMessage(message));
  }
}
