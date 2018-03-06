import { Component, OnInit } from '@angular/core';
import { User } from '../shared/model/user';
import { Store } from '@ngrx/store';
import * as fromUser from '../chat/register/store/user.reducer';
import * as fromApp from '../store/app.reducers';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user: User;
  userOnline: number;

  constructor(private store: Store<fromApp.AppState>, public us: UserService) {}

  ngOnInit() {
    this.us.userOnline.subscribe(users => {
      this.userOnline = users;
    });

    this.store.select('userData').subscribe((userState: fromUser.UserState) => {
      this.user = userState.user;
    });
  }
}
