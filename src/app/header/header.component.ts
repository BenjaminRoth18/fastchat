import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { MessageService } from '../shared/message.service';
import { User } from '../shared/model/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user: User;
  userOnline: number;

  constructor(public us: UserService, public ms: MessageService) {}

  ngOnInit() {
    this.us.userOnline.subscribe(users => {
      this.userOnline = users;
    });

    this.ms.user.subscribe(user => {
      this.user = user;
    });
  }
}
