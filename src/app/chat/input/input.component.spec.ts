import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputComponent } from './input.component';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { User } from '../../shared/model/user';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';

const testState = {
  user: new User(null, '', ''),
  userOnline: 1
};

export function testReducer(state = testState, action) {
  return state;
}

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  const firebaseStub = {
      apiKey: 'AIzaSyCmVoguhExDRdUTq69VdMArvCkWudldYkw',
      authDomain: 'chat-96b27.firebaseapp.com',
      databaseURL: 'https://chat-96b27.firebaseio.com',
      projectId: 'chat-96b27',
      storageBucket: 'chat-96b27.appspot.com',
      messagingSenderId: '542749835675'
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        InputComponent
      ],
      imports: [
        MatIconModule,
        MatInputModule,
        FormsModule,
        BrowserAnimationsModule,
        AngularFireDatabaseModule,
        AngularFireModule.initializeApp(firebaseStub),
        StoreModule.forRoot({ user: testReducer })
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
