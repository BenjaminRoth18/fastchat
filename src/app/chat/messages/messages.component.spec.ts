import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesComponent } from './messages.component';
import { MessageComponent } from './message/message.component';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { MatDialogModule } from '@angular/material/dialog';
import { MessageService } from '../../shared/message.service';
import { UserService } from '../../shared/user.service';
import { StoreModule } from '@ngrx/store';
import { Subject } from 'rxjs/Subject';
import { User} from '../../shared/model/user';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component } from '@angular/core';

export class MessageServiceStub {
  message = new Subject<any>();
}

export class UserServiceStub {}

const testState = {
  user: new User(null, '', '')
}

export function testReducer(state = testState, action) {
  return state;
}

@Component({
  selector: 'app-register',
  template: '<p>Stub Register</p>'
})
export class RegisterStubComponent {}

describe('MessagesComponent', () => {
  let component: MessagesComponent;
  let fixture: ComponentFixture<MessagesComponent>;

  const firebaseStub = {
      apiKey: 'AIzaSyCmVoguhExDRdUTq69VdMArvCkWudldYkw',
      authDomain: 'chat-96b27.firebaseapp.com',
      databaseURL: 'https://chat-96b27.firebaseio.com',
      projectId: 'chat-96b27',
      storageBucket: 'chat-96b27.appspot.com',
      messagingSenderId: '542749835675'
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MessagesComponent,
        MessageComponent,
        RegisterStubComponent
      ],
      imports: [
        AngularFireDatabaseModule,
        AngularFireModule.initializeApp(firebaseStub),
        MatDialogModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        StoreModule.forRoot({ user: testReducer })
      ],
      providers: [ {
          provide: MessageService,
          useClass: MessageServiceStub
        },
        {
          provide: UserService,
          useClass: UserServiceStub
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
