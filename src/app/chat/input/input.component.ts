import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../shared/message.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  messageContent: string;

  constructor(private ms: MessageService) {}

  ngOnInit() {}

  sendMessage(message: string) {
    this.messageContent = null;
    this.ms.setMessage(message);
  }
}
