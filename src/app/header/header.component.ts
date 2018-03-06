import { Component, OnInit } from '@angular/core';
import { User } from '../shared/model/user';
import { Store } from '@ngrx/store';
import * as fromUser from '../chat/register/store/user.reducer';
import * as fromApp from '../store/app.reducers';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user: User;
  userOnline: number;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.store.select('userData').subscribe((userData: fromUser.UserState) => {
      if (userData) {
        this.userOnline = userData.userOnline;
      }
    });

    this.store.select('userData').subscribe((userState: fromUser.UserState) => {
      if (userState) {
        this.user = userState.user;
      }
    });
  }
}

