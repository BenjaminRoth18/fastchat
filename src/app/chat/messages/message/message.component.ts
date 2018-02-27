import { Component, Input } from '@angular/core';
import { Message } from '../../../shared/model/message';
import { Action } from '../../../shared/model/action';
import { User } from '../../../shared/model/user';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent {
  @Input('user') user: User;
  @Input('action') action = Action;
  @Input('message') message: Message;

  constructor() { }
}
